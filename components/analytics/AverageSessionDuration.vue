<template>
    <div class="chart-box">
        <btn class="chart-tooltip">
            <Icon icon="mi:circle-information" color="grey" width="15" />
            <tooltip>
                <h4>Average Session Duration</h4>

                The <strong>Average Session Duration</strong> chart measures the average amount of time users spend on your website during a
                single session. A session is defined as a period of user interaction with your site, which can include multiple page views,
                events, or interactions until the user leaves or becomes inactive.
            </tooltip>
        </btn>
        <canvas ref="chart" height="200"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { Chart, registerables } from "chart.js"
import { lineChartOptions } from "~/stores/analytics"

// Register all necessary components
Chart.register(...registerables)

let myChart: Chart | null = null
const chart = ref<HTMLCanvasElement | null>(null)

watch(
    () => $Analytics.getReport("averageSessionDuration"),
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
    const data = $Analytics.getReport("averageSessionDuration")
    if (!data || Object.keys(data).length === 0) return

    const xLabels = data.rows.map((row) => $Analytics.getFormattedDate(row.dimensionValues[0].value))
    const xValues = data.rows.map((row) => Number(row.metricValues[0].value) / 60)

    // Combine labels and user data into an array of objects
    const combinedData = xLabels.map((xLabel, index) => ({
        xLabel,
        xValue: xValues[index],
    }))

    // combinedData.sort((a, b) => a.xLabel.localeCompare(b.xLabel))

    const sortedXLabels = combinedData.map((item) => item.xLabel)
    const sortedXValues = combinedData.map((item) => item.xValue)

    const ctx = chart.value?.getContext("2d")
    if (ctx) {
        if (myChart) {
            myChart.destroy()
        }

        myChart = new Chart(ctx, {
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
                responsive: true,
                maintainAspectRatio: false,
                ...lineChartOptions,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Average Session Duration (Last 30 Days)",
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
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10,
                        },
                    },
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
    padding: 10px 25px 25px 15px

.chart-tooltip
    .tooltip
        right: calc( -100% + 100px  )
        top: 0
</style>
