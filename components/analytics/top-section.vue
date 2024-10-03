<template>
    <section>
        <cflex class="left">
            <rflex>
                <AnalyticsTotalUsers class="box" />
                <AnalyticsActiveUsersLast30Minutes class="box activeUsers" />
            </rflex>

            <rflex>
                <AnalyticsUsersByDeviceChart class="box pie-chart-container" />
                <AnalyticsBounceRateByDate class="box" />
            </rflex>
        </cflex>

        <cflex class="right">
            <AnalyticsUsersByChannel class="box" />
            <AnalyticsViewsByPage class="box userByDate" />
        </cflex>
    </section>
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>

section
    display: flex
    width: 100%
    gap: 15px
    flex-wrap: wrap

    .left
        flex-basis: 420px
        gap: 15px
        flex-grow: 1


        .rflex
            gap: 15px

            div
                max-height: 300px
                flex-grow: 1
                min-height: 200px

    .right
        flex-basis: 450px
        display: flex
        flex-wrap: wrap
        gap: 15px
        max-width: 500px
        flex-grow: 1

        div
            flex-basis: 230px
            flex-grow: 1
            height: 100%
            min-height: 150px

.pie-chart-container
    position: relative
    max-width: 330px
    max-height: 300px
    display: flex
    align-items: center
    justify-content: center

.activeUsers
    max-width: 500px
</style>
