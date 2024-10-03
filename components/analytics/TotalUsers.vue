<template>
    <cflex class="container">
        <btn class="chart-tooltip">
            <Icon icon="mi:circle-information" color="grey" width="15" />
            <tooltip>
                <h4>New and Total Users</h4>

                The chart that displays <strong> New Users</strong> and <strong></strong> counts is
                a key component in Veloris' Analytics, providing insights into user acquisition and
                overall traffic over selected timeframes. Here’s a breakdown of its components and
                how to interpret the data:

                <ul>
                    <li>
                        <strong>New Users:</strong> This metric represents the number of users who
                        visited your website for the first time during the selected timeframe. New
                        users are valuable for assessing your site's ability to attract fresh
                        visitors.
                    </li>
                    <li>
                        <strong>Total Users:</strong> This includes both new users and returning
                        users. Total users give you a broader picture of your website's traffic and
                        how many unique individuals are engaging with your content overall.
                    </li>
                    <li>
                        <strong>Timeframe Selection Buttons:</strong> These buttons allow you to
                        filter the data by different periods (e.g., last 7 days, last 30 days, last
                        month). This feature enables you to analyze trends over various lengths of
                        time.
                    </li>
                </ul>
            </tooltip>
        </btn>
        <rflex class="top">
            <ClientOnly>
                <div class="metric">
                    <h1>
                        {{ $Analytics.getFormattedSum(selectedUserType, selectedTimeframe) }}
                    </h1>
                    <label>{{ metricTag }}</label>
                </div>
            </ClientOnly>

            <cflex class="timeframe-button-container">
                <btn
                    @click="selectedTimeframe = 1"
                    class="timeframe-btn"
                    :class="{ active: selectedTimeframe === 1 }"
                    >Day</btn
                >
                <btn
                    @click="selectedTimeframe = 7"
                    class="timeframe-btn"
                    :class="{ active: selectedTimeframe === 7 }"
                    >Week</btn
                >
                <btn
                    @click="selectedTimeframe = 14"
                    class="timeframe-btn"
                    :class="{ active: selectedTimeframe === 14 }"
                    >2 Week</btn
                >
                <btn
                    @click="selectedTimeframe = 31"
                    class="timeframe-btn"
                    :class="{ active: selectedTimeframe === 31 }"
                    >Month</btn
                >
            </cflex>
        </rflex>

        <rflex class="action-button-container">
            <btn
                class="action-btn"
                @click="selectedUserType = 'totalNewUsers'"
                :class="{ active: selectedUserType === 'totalNewUsers' }"
            >
                New Users</btn
            >
            <btn
                class="action-btn"
                @click="selectedUserType = 'totalUsers'"
                :class="{ active: selectedUserType === 'totalUsers' }"
                >Total Users</btn
            >
        </rflex>
    </cflex>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
const selectedUserType = ref<"totalNewUsers" | "totalUsers">("totalNewUsers")
const metricTag = computed(() => {
    if (selectedUserType.value === "totalNewUsers") return "New Users"
    if (selectedUserType.value === "totalUsers") return "Total Users"
})
const selectedTimeframe = ref(31)
</script>

<style lang="sass" scoped>
.container
    position: relative
    max-width: 400px

    .top
        justify-content: space-between

        .metric
            margin-top: 25px
            margin-left: 25px
            display: flex
            align-items: end
            gap: 5px

            h1
                font-size: 4rem
                line-height: 1
                font-weight: bold

            label
                opacity: 0.8

        .timeframe-button-container
            text-align: right
            justify-content: end
            gap: 5px
            margin-top: 20px



.action-button-container
    margin-top: auto


.timeframe-btn

    flex-grow: 1
    justify-content: end
    border: none
    border-radius: 0
    padding-right: 10px
    border-top-left-radius: 3px
    border-bottom-left-radius: 3px


    &.active
        border-right: 3px solid #1a73e8
.action-btn
    flex-grow: 1
    justify-content: center
    border: none
    border-radius: 0
    padding-bottom: 0px
    margin: 0


    &.active
        border-bottom: 3px solid #1a73e8

.btn
    &:hover
        background: $hover-background

.chart-tooltip
    left: 15px
    top: 15px
    width: min-content

    &:hover
        background: none

    .tooltip
        top: 0
</style>
