<template>
    <div class="chart-box">
        <btn class="chart-tooltip">
            <Icon icon="mi:circle-information" color="grey" width="15" />
            <tooltip>
                <h4>Bounce Rate</h4>

                <strong> Bounce Rate </strong>in Google Analytics refers to the
                percentage of single-page sessions, where users visit a page on
                your website and leave without interacting with any other pages
                or taking any further actions (such as clicking on a link,
                filling out a form, or making a purchase).
            </tooltip>
        </btn>
        <canvas ref="recentUsers" height="500"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Chart, registerables } from "chart.js";
import { lineChartOptions } from "~/stores/analytics";
Chart.register(...registerables);

const recentUsers = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    renderGraph();
});

watch(
    () => $Analytics.getReport("bounceRateByDate"),
    (newData) => {
        if (newData) {
            renderGraph();
        }
    },
);

async function renderGraph() {
    const data = $Analytics.getReport("bounceRateByDate");

    if (!data || Object.keys(data).length === 0) return;

    const xLabels = data.rows.map((row) =>
        $Analytics.getFormattedDate(row.dimensionValues[0].value),
    );
    const xValues = data.rows.map((row) =>
        Number(row.metricValues[0].value * 100),
    ); // convert decimal (0-1) to percentage

    const combinedData = xLabels.map((xLabel, index) => ({
        xLabel,
        xValue: xValues[index],
    }));

    const newData = combinedData.slice(-14);

    const sortedXLabels = newData.map((item) => item.xLabel);
    const sortedXValues = newData.map((item) => item.xValue);

    const ctx = recentUsers.value?.getContext("2d");
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
                        text: "Bounce Rate by Date (%)",
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
                            maxTicksLimit: 5,
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
        });
    }
}
</script>

<style lang="sass" scoped>
.chart-box
    padding: 10px 25px 20px 10px
    flex-grow: 1
</style>
