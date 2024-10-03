<template>
    <div class="chart-box">
        <btn class="chart-tooltip">
            <Icon icon="mi:circle-information" color="grey" width="15" />
            <tooltip>
                <h4>Users By Date</h4>
                The <strong>Users by Date</strong> chart is a line graph that tracks the number of users who visited your website over a
                specified period. This chart helps you visualize traffic trends over time, enabling you to identify patterns in user
                behavior and assess the overall performance of your website.
            </tooltip>
        </btn>

        <canvas ref="recentUsers" height="200"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { Chart, registerables } from "chart.js"
import { lineChartOptions } from "~/stores/analytics"

Chart.register(...registerables)

const recentUsers = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
    renderGraph()
})

watch(
    () => $Analytics.getReport("usersByDate"),
    (newData) => {
        if (newData) {
            renderGraph()
        }
    }
)

async function renderGraph() {
    const data = $Analytics.getReport("usersByDate")

    if (!data || Object.keys(data).length === 0) return

    const xLabels = data.rows.map((row) => $Analytics.getFormattedDate(row.dimensionValues[0].value))
    const xValues = data.rows.map((row) => Number(row.metricValues[0].value))

    const combinedData = xLabels.map((xLabel, index) => ({
        xLabel,
        xValue: xValues[index],
    }))

    const sortedXLabels = combinedData.map((item) => item.xLabel)
    const sortedXValues = combinedData.map((item) => item.xValue)

    const ctx = recentUsers.value?.getContext("2d")
    if (ctx) {
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: sortedXLabels,
                datasets: [
                    {
                        label: data.metricHeaders[0].name,
                        data: sortedXValues,
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                ...lineChartOptions,
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Users by Date",
                    },
                    tooltip: {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        titleColor: "black",
                        bodyColor: "black",
                        borderWidth: 1,
                        intersect: false,
                        enabled: true,
                        mode: "index",
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: false,
                        },

                        grid: {
                            display: false,
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 7,
                        },
                    },
                    y: {
                        title: {
                            display: false,
                            text: "Bounce Rate %",
                        },
                    },
                },
            },
        })
    }
}
</script>

<style lang="sass" scoped>
.chart-box
    padding: 10px 25px 25px 15px
</style>
