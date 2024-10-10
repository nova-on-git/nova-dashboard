<template>
    <main class="admin-page">
        <mpage>
            <rflex class="header-row">
                <header class="dashboard-header">
                    <h1>Dashboard</h1>
                    <DashboardWelcome />
                </header>

                <ClientOnly>
                    <div class="url">{{ url }}</div>
                </ClientOnly>
            </rflex>

            <AnalyticsTopSection />
            <AnalyticsSectionTwo />
        </mpage>
        <DashboardFooter />
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
});
const url = computed(() => {
    const domain = window.location.hostname;
    return domain;
});
</script>

<style lang="sass" scoped>


.mpage
    margin-top: 25px

.header-row
    justify-content: space-between
    align-items: end
    margin-block: 50px 20px

    .url
        font-weight: 600
        font-size: 1.1rem

    .dashboard-header
        margin: 0


        h4
            font-weight: bold

.welcome-back
    gap: 5px
</style>
