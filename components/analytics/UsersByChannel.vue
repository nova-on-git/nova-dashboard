<template>
    <div class="chart-box">
        <btn class="chart-tooltip">
            <Icon icon="mi:circle-information" color="grey" width="15" />
            <tooltip>
                <h4>Users by Channel</h4>
                Shows you where the site traffic is coming from.

                <ul>
                    <li>
                        <strong>Direct:</strong> Direct traffic refers to users
                        who visit your website by typing the URL directly into
                        their browser, using a bookmark, or when Google
                        Analytics can't identify a specific referral source.
                        This can also happen if there is no tracking information
                        (e.g., from non-tagged emails or links).
                    </li>
                    <li>
                        <strong>Display:</strong> Display traffic refers to
                        users who come to your website through display ads
                        (visual banner ads, video ads, or rich media ads) shown
                        on other websites or platforms. This includes Google
                        Display Network or other ad networks.
                    </li>
                    <li>
                        <strong>Organic Search: </strong>Organic Search traffic
                        refers to users who find your website through unpaid
                        (organic) search results on search engines like Google,
                        Bing, or Yahoo. These are users clicking on links that
                        are not part of paid advertising.
                    </li>
                    <li>
                        <strong>Referal:</strong> Referral traffic comes from
                        users who land on your website by clicking on a link
                        from another website (other than a search engine or
                        social media platform). It tracks visits coming from
                        external sites.
                    </li>
                    <li>
                        <strong>Paid Search: </strong>Paid Search traffic refers
                        to users who visit your website by clicking on ads
                        you’ve paid for, typically via pay-per-click (PPC)
                        advertising on search engines like Google Ads or Bing
                        Ads. These are the sponsored links or ads that appear in
                        search engine results.
                    </li>
                    <li>
                        <strong>Organic Social:</strong> Organic Social traffic
                        refers to users who come to your website from unpaid,
                        organic posts or content on social media platforms such
                        as Facebook, Twitter, LinkedIn, Instagram, or others.
                    </li>
                </ul>
            </tooltip>
        </btn>
        <canvas ref="usersByDevice"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Chart, registerables } from "chart.js";
import { horizontalBarChartOptions } from "~/stores/analytics";
// Register all necessary components
Chart.register(...registerables);

let myChart: Chart | null = null;
const usersByDevice = ref<HTMLCanvasElement | null>(null);

watch(
    () => $Analytics.getReport("usersByChannel"),
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
    const data = $Analytics.getReport("usersByChannel");
    if (!data || Object.keys(data).length === 0) return;

    const labels = data.rows.map((row) => row.dimensionValues[0].value);
    const userData = data.rows.map((row) => Number(row.metricValues[0].value));

    // Combine labels and user data into an array of objects
    const combinedData = labels.map((label, index) => ({
        label,
        users: userData[index],
    }));

    combinedData.sort((a, b) => a.label.localeCompare(b.label));

    const sortedLabels = combinedData.map((item) => item.label);
    const sortedUserData = combinedData.map((item) => item.users);

    const ctx = usersByDevice.value?.getContext("2d");
    if (ctx) {
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
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                ...horizontalBarChartOptions,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "Users By Channel",
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
