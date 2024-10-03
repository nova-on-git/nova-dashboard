<template>
    <section>
        <rflex class="chart-container">
            <AnalyticsUsersByDate class="box" />
            <AnalyticsAverageSessionDuration class="box" />
        </rflex>
    </section>
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>
section
    margin-top: 15px
.chart-container
    align-items: start
    gap: 15px
    flex-wrap: wrap

    .box
        max-height: 350px
        flex-basis: 400px
        flex-grow: 1
</style>
