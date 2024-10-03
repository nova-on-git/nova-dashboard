<template>
    <div class="chart-box">
        <btn class="chart-tooltip">
            <Icon icon="mi:circle-information" color="grey" width="15" />
            <tooltip>
                <h4>Active Users (Last 30 Minutes)</h4>
                The <strong>Real-Time Active Users</strong> chart shows the number of users currently active on your website in the last 30
                minutes. This chart provides a snapshot of user engagement in real-time, allowing you to monitor live traffic and see how
                users interact with your site at any given moment.
            </tooltip>
        </btn>

        <canvas ref="usersByDevice" width="180" height="125"></canvas>
        <div class="total-label">{{ number }}</div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { Chart, registerables } from "chart.js"
import { barChartOptions } from "~/stores/analytics"

// Register all necessary components
Chart.register(...registerables)

let myChart: Chart | null = null
const usersByDevice = ref<HTMLCanvasElement | null>(null)

const number = computed(() => {
    return minifyNumber($Analytics.getSum("activeUsersLast30Min")) || 0
})
function formattedRows() {
    const rows = $Analytics.getReport("activeUsersLast30Min").rows

    let newRowsData = []

    for (let i = 0; i < 31; i++) {
        const newRow = {
            dimensionValues: [
                {
                    value: String(i),
                    oneValue: "value",
                },
            ],
            metricValues: [
                {
                    value: "0",
                    oneValue: "value",
                },
            ],
        }

        let existingRow = null
        if (rows && rows.length > 0) {
            // Check if rows is not null and has length
            existingRow = rows.find((row) => row.dimensionValues[0].value.trim() === String(i).trim())
        }

        if (existingRow) {
            newRowsData.push(existingRow)
        } else {
            // Create dummy row for missing minutes
            newRowsData.push(newRow)
        }
    }

    // Sort rows by minute value in descending order (to get the most recent minutes first)
    newRowsData.sort((a, b) => {
        return Number(b.dimensionValues[0].value) - Number(a.dimensionValues[0].value)
    })
    return newRowsData
}

watch(
    () => $Analytics.getReport("activeUsersLast30Min"),
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
    console.log("rendering graph")
    const rows = formattedRows($Analytics.getReport("activeUsersLast30Min"))
    if (!rows || rows.length === 0) return

    // Filter out invalid rows where either dimensionValues or metricValues are missing
    const validRows = rows.filter((row) => row?.dimensionValues[0]?.value && row?.metricValues[0]?.value)

    // Map the filtered rows to labels and userData
    const labels = validRows.map((row) => row.dimensionValues[0].value)
    const userData = validRows.map((row) => Number(row.metricValues[0].value))

    const combinedData = labels.map((label, index) => ({
        label,
        users: userData[index],
    }))

    const sortedLabels = combinedData.map((item) => item.label)
    const sortedUserData = combinedData.map((item) => item.users)

    const ctx = usersByDevice.value?.getContext("2d")
    if (ctx) {
        if (myChart) {
            myChart.destroy()
        }

        myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: sortedLabels,
                datasets: [
                    {
                        label: "User Count",
                        data: sortedUserData,
                        backgroundColor: ["#1a73e8"],
                        borderWidth: 1,
                        barThickness: 15,
                    },
                ],
            },
            options: {
                ...barChartOptions,

                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Active Users (Last 30 Minutes)",
                    },
                },
                animation: {
                    duration: 0,
                },
            },
        })
    }
}
</script>

<style lang="sass" scoped>
canvas
    height: 100%

.chart-box
    min-height: 500px
    padding-inline: 15px

.total-label
    font-size: 1.5rem
    position: absolute
    font-weight: bold
    top: 15px
    right: 25px
    text-align: right

.chart-tooltip
    left: 15px
    top: 15px
    width: min-content
</style>
