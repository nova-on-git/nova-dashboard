<template>
    <div class="chart-box">
        <btn class="chart-tooltip">
            <Icon icon="mi:circle-information" color="grey" width="15" />
            <tooltip>
                <h4>Users by Page</h4>
                The <strong>Views per Page</strong> chart is a bar chart that
                visualizes the number of users visiting each specific page on
                your website. Each bar represents a single page, and the length
                of the bar corresponds to how many users have visited that page
                during the selected time period.
            </tooltip>
        </btn>
        <canvas ref="usersByDevice" width="100"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { horizontalBarChartOptions } from "~/stores/analytics";

// Register all necessary components
Chart.register(...registerables);
// Chart.register(ChartDataLabels)
let myChart: Chart | null = null;
const usersByDevice = ref<HTMLCanvasElement | null>(null);

watch(
    () => $Analytics.getReport("viewsByPage"),
    (newData) => {
        if (newData) {
            renderGraph();
        }
    },
);

onMounted(() => {
    renderGraph();
});

async function renderGraph() {
    const data = $Analytics.getReport("viewsByPage");

    if (!data || Object.keys(data).length === 0) return;

    const labels = data.rows.map((row) => row.dimensionValues[0].value);
    const userData = data.rows.map((row) => Number(row.metricValues[0].value));

    // Combine labels and user data into an array of objects
    const combinedData = labels.map((label, index) => ({
        label,
        users: userData[index],
    }));

    combinedData.sort((a, b) => a.label.localeCompare(b.label));
    const topData = combinedData.slice(0, 5);

    const sortedLabels = topData.map((item) => item.label);
    const sortedUserData = topData.map((item) => item.users);

    const ctx = usersByDevice.value?.getContext("2d");
    if (ctx) {
        // Destroy the previous chart if it exists
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: sortedLabels,
                datasets: [
                    {
                        label: data.metricHeaders[0].name,
                        data: sortedUserData,
                        backgroundColor: ["#1a73e8"],
                    },
                ],
            },
            options: {
                ...horizontalBarChartOptions,
                plugins: {
                    datalabels: {
                        offset: {
                            anchor: "end",
                            align: "end",
                            x: 10,
                            y: -5,
                        },
                    },
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Users by Page",
                    },
                },
            },
        });
    }
}
</script>

<style lang="sass" scoped>
.chart-box
    max-width: 500px


.chart-tooltip
    .tooltip
        right: calc( -100% + 100px  )
        top: 0
</style>
