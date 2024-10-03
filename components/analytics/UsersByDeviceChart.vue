<template>
    <div class="chart-box">
        <btn class="chart-tooltip">
            <Icon icon="mi:circle-information" color="grey" width="15" />
            <tooltip>
                <h4>Users By Device</h4>

                The <strong> Users By Device </strong> chart provides insights into how users access
                your website based on the device they are using. This chart breaks down the data
                into categories like desktop, mobile, and tablet, allowing you to understand how
                different devices contribute to user traffic.
            </tooltip>
        </btn>
        <canvas ref="usersByDevice"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { Chart, registerables } from "chart.js"

// Register all necessary components
Chart.register(...registerables)

let myChart: Chart | null = null
const usersByDevice = ref<HTMLCanvasElement | null>(null)

watch(
    () => $Analytics.getReport("usersByDevice"),
    (newData) => {
        if (newData) {
            renderGraph()
        }
    }
)

onMounted(() => {
    renderGraph()
})

async function renderGraph() {
    const data = $Analytics.getReport("usersByDevice")

    if (!data || Object.keys(data).length === 0) return

    const labels = data.rows.map((row) => row.dimensionValues[0].value) // Update this line as needed
    const userData = data.rows.map((row) => Number(row.metricValues[0].value))

    // Combine labels and user data into an array of objects
    const combinedData = labels.map((label, index) => ({
        label,
        users: userData[index],
    }))

    // Sort combined data by label
    combinedData.sort((a, b) => a.label.localeCompare(b.label))

    // Extract sorted labels and user data
    const sortedLabels = combinedData.map((item) => item.label)
    const sortedUserData = combinedData.map((item) => item.users)

    const ctx = usersByDevice.value?.getContext("2d")
    if (ctx) {
        // Destroy the previous chart if it exists
        if (myChart) {
            myChart.destroy()
        }

        myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: sortedLabels,
                datasets: [
                    {
                        label: data.metricHeaders[0].name,
                        data: sortedUserData,
                        backgroundColor: ["#1a73e8", "#5396ee", "#7eb0f2"],
                    },
                ],
            },
            options: {
                responsive: true,
                animation: {
                    duration: 0,
                },
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "Users by Device Type",
                    },

                    legend: {
                        position: "bottom",
                        display: true,
                    },

                    tooltip: {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        titleColor: "black",
                        bodyColor: "black",
                        borderWidth: 1,
                        enabled: true,
                        position: "nearest",
                    },
                },
                layout: {
                    padding: 15,
                },
            },
        })
    }
}
</script>

<style lang="sass" scoped>
.chart-tooltip
    border: none
    position: absolute
    top: 10px
    right: 10px
    cursor: auto
    background: transparent

    .tooltip
        text-align: left
        font-size: 0.8rem
        border-radius: 5px
        background: white
        padding: 10px 20px
        box-shadow: $shadow-dark
        width: max-content
        z-index: 500
        max-width: 400px
        transform: translateX(25px)
        transition: all 0.2s

        h4
            font-size: 1rem
            margin-bottom: 5px
            font-weight: bold
        ul
            margin-top: 10px
            li
                margin-bottom: 10px
</style>
