import axios from "axios"
import type { ChartOptions } from "chart.js"
import { defineStore } from "pinia"

export const useAnalyticsStore = defineStore("analytics", {
    state: () => ({
        analytics: {} as AnalyticsStore,
    }),

    getters: {
        get(state) {
            return state.analytics
        },

        /** Get google analytics report from cache analytics cache. */
        getReport: (state) => (reportName: ReportName) => {
            return state.analytics[reportName] || {}
        },

        getSum:
            (state) =>
            (reportName: ReportName, timeframe: number = 30) => {
                const report = state.analytics[reportName]
                if (!report || !report.rows) return 0

                const currentDate = new Date()
                const pastDate = new Date(currentDate.getTime() - timeframe * 24 * 60 * 60 * 1000)

                return report.rows.reduce((sum, row) => {
                    const rowDate = new Date(
                        parseInt(row.dimensionValues[0].value.substring(0, 4)),
                        parseInt(row.dimensionValues[0].value.substring(4, 6)) - 1,
                        parseInt(row.dimensionValues[0].value.substring(6, 8))
                    )

                    if (rowDate >= pastDate && rowDate <= currentDate) {
                        return sum + parseInt(row.metricValues[0].value)
                    }
                    return sum
                }, 0)
            },
    },

    actions: {
        async init() {
            if (!import.meta.client) return
            // localStorage.removeItem("analytics")
            const analyticsCache = localStorage.getItem("analytics")

            let analytics: AnalyticsStore

            if (analyticsCache) {
                analytics = JSON.parse(analyticsCache)

                let report: AnalyticsReport

                for (report of Object.values(analytics)) {
                    const reportIsStale = this.hasSecondsPassed(report.timestamp, report.metadata.staleAfter)

                    if (!reportIsStale && report) {
                        this.analytics[report.metadata.reportName] = report
                    }
                }
            }

            for (let report of reports) {
                if (report.metadata.reportName in this.analytics) continue

                let analyticsEndpoint = "/api/analytics"

                if (report.metadata.realtime) {
                    analyticsEndpoint = "/api/realtimeAnalytics"
                }

                try {
                    const response = await axios.post(analyticsEndpoint, report.reportRequest)
                    const reportKey: string = report.metadata.reportName

                    this.analytics[reportKey] = {
                        ...response.data,
                        metadata: {
                            reportName: report.metadata.reportName,
                            staleAfter: report.metadata.staleAfter,
                        },
                    }
                } catch (error) {
                    console.error(error)
                }
            }
            $Dashboard.loadingState(false)

            localStorage.setItem("analytics", JSON.stringify(this.analytics))

            this.checkForStaleData()
            setInterval(() => {
                // Check data once a minute
                this.checkForStaleData()
            }, 60000) // 1 min
        },

        async refresh() {
            localStorage.removeItem("analytics")
            this.init()
        },

        async checkForStaleData() {
            if (!import.meta.client) return
            const analyticsCache = localStorage.getItem("analytics")

            let analytics: AnalyticsStore = {}

            if (analyticsCache) analytics = JSON.parse(analyticsCache)

            let staleReportsToRun: AnalyticsReportRequest[] = []
            let report: AnalyticsReport

            for (report of Object.values(analytics)) {
                if (!report) continue
                const reportIsStale = this.hasSecondsPassed(report.timestamp, report.metadata.staleAfter)

                if (reportIsStale) {
                    const reportRequest = this.getReportRequestByName(report.metadata.reportName)
                    if (reportRequest) staleReportsToRun.push(reportRequest)
                }
            }

            for (let report of staleReportsToRun) {
                if (!report) continue

                let analyticsEndpoint = "/api/analytics"

                if (report.metadata.realtime) analyticsEndpoint = "/api/realtimeAnalytics"

                try {
                    const response = await axios.post(analyticsEndpoint, report.reportRequest)
                    const reportKey: string = report.metadata.reportName

                    this.analytics[reportKey] = {
                        ...response.data,
                        metadata: {
                            reportName: report.metadata.reportName,
                            staleAfter: report.metadata.staleAfter,
                        },
                    }
                } catch (error) {
                    console.error(error)
                }
            }

            localStorage.setItem("analytics", JSON.stringify(this.analytics))
        },

        hasSecondsPassed(timestamp: Date, seconds: number) {
            const pastDate = new Date(timestamp)
            const currentDate = new Date()

            const differenceInSeconds = (currentDate.getTime() - pastDate.getTime()) / 1000

            return differenceInSeconds >= seconds
        },

        getReportRequestByName(reportName: string) {
            return reports.find((report) => report.metadata.reportName === reportName)
        },
        getFormattedDate(dateString: string) {
            const year = dateString.slice(0, 4)
            const month = dateString.slice(4, 6)
            const date = dateString.slice(6, 8)

            return `${date}th`
        },
        getFormattedSum(reportName: ReportName, timeframe: number = 30) {
            const sum = this.getSum(reportName, timeframe)
            const formattedSum = minifyNumber(sum)
            return formattedSum
        },
    },
})

// All report requests //
const activeUsersLast30Min: AnalyticsReportRequest = {
    metadata: {
        reportName: "activeUsersLast30Min",
        staleAfter: 60, // 1 min
        realtime: true,
    },
    reportRequest: {
        dateRanges: [
            {
                startDate: "30minutesAgo",
                endDate: "now",
            },
        ],

        dimensions: [
            {
                name: "minutesAgo",
            },
        ],

        metrics: [
            {
                name: "activeUsers",
            },
        ],

        limit: "30",
    },
}
const bounceRateByDate: AnalyticsReportRequest = {
    metadata: {
        reportName: "bounceRateByDate",
        staleAfter: 86400, // 1 day in seconds
    },
    reportRequest: {
        dateRanges: [
            {
                startDate: "31daysAgo",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "date",
            },
        ],
        metrics: [
            {
                name: "bounceRate",
            },
        ],
        orderBys: [
            {
                dimension: {
                    dimensionName: "date", // Specify the dimension you want to order by
                },
                desc: false, // Set to true for descending order (newest first) or false for ascending
            },
        ],
        limit: "31",
    },
}
const usersByChannel: AnalyticsReportRequest = {
    metadata: {
        reportName: "usersByChannel",
        staleAfter: 86400, // 1 day in seconds
    },
    reportRequest: {
        dateRanges: [
            {
                startDate: "31daysAgo",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "sessionDefaultChannelGrouping",
            },
        ],
        metrics: [
            {
                name: "sessions",
            },
        ],
        orderBys: [
            {
                metric: {
                    metricName: "sessions",
                },
                desc: true,
            },
        ],
        limit: "100",
    },
}
const viewsByPage: AnalyticsReportRequest = {
    metadata: {
        reportName: "viewsByPage",
        staleAfter: 86400, // 1 day in seconds
    },
    reportRequest: {
        dateRanges: [
            {
                startDate: "31daysAgo",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "pagePath",
            },
        ],
        metrics: [
            {
                name: "screenPageViews",
            },
        ],
        orderBys: [
            {
                metric: {
                    metricName: "screenPageViews",
                },
                desc: true,
            },
        ],
        limit: "100",
    },
}
const usersByDate: AnalyticsReportRequest = {
    metadata: {
        reportName: "usersByDate",
        staleAfter: 86400, // 1 day in seconds
    },
    reportRequest: {
        dateRanges: [
            {
                startDate: "30daysAgo",
                endDate: "today",
            },
        ],

        dimensions: [
            {
                name: "date",
            },
        ],

        metrics: [
            {
                name: "activeUsers",
            },
        ],
        orderBys: [
            {
                dimension: {
                    dimensionName: "date", // Specify the dimension you want to order by
                },
                desc: false, // Set to true for descending order (newest first) or false for ascending
            },
        ],
    },
}
const usersByDevice: AnalyticsReportRequest = {
    metadata: {
        reportName: "usersByDevice",
        staleAfter: 86400, // 1 day in seconds
    },
    reportRequest: {
        dateRanges: [
            {
                startDate: "31daysAgo",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "deviceCategory",
            },
        ],
        metrics: [
            {
                name: "activeUsers",
            },
        ],
    },
}
const averageSessionDuration: AnalyticsReportRequest = {
    metadata: {
        reportName: "averageSessionDuration",
        staleAfter: 86400, // 1 day in seconds
    },
    reportRequest: {
        dateRanges: [
            {
                startDate: "31daysAgo",
                endDate: "today",
            },
        ],
        dimensions: [
            {
                name: "date", // You can use other dimensions if needed
            },
        ],
        metrics: [
            {
                name: "averageSessionDuration", // Metric for average session duration
            },
        ],
        orderBys: [
            {
                dimension: {
                    dimensionName: "date", // Specify the dimension you want to order by
                },
                desc: false, // Set to true for descending order (newest first) or false for ascending
            },
        ],
        limit: "30",
    },
}

const totalUsers: AnalyticsReportRequest = {
    metadata: {
        reportName: "totalUsers",
        staleAfter: 86400, // 1 day in seconds
    },
    reportRequest: {
        dateRanges: [
            {
                startDate: "30daysAgo",
                endDate: "today",
            },
        ],
        metrics: [
            {
                name: "activeUsers",
            },
        ],
        dimensions: [
            {
                name: "date",
            },
        ],
        limit: "31",
    },
}

const totalNewUsers: AnalyticsReportRequest = {
    metadata: {
        reportName: "totalNewUsers",
        staleAfter: 86400, // 1 day in seconds
    },
    reportRequest: {
        dateRanges: [
            {
                startDate: "30daysAgo",
                endDate: "today",
            },
        ],
        metrics: [
            {
                name: "newUsers",
            },
        ],
        dimensions: [
            {
                name: "date",
            },
        ],
        limit: "31",
    },
}

// graph.js options

export const lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    // maintainAspectRatio: false,

    interaction: {
        mode: "index",
        intersect: false,
    },
    elements: {
        line: {
            tension: 0.2,
            backgroundColor: "rgba(0,0,0,1)",
        },

        point: {
            radius: 0,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Users",
            },
        },

        x: {
            ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
            },
            title: {
                display: true,
                text: "Date",
            },
            grid: {
                display: false,
            },
        },
    },
}

export const horizontalBarChartOptions: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
        },
        tooltip: {
            backgroundColor: "rgba(255, 255, 255, 1)",
            titleColor: "black",
            bodyColor: "black",
            borderWidth: 1,
            intersect: false,
            enabled: true,
            mode: "y",
            position: "nearest",
        },
    },
    layout: {
        padding: 15,
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: false,
            },
            grid: {
                display: false,
            },
        },

        x: {
            title: {
                display: false,
            },
            grid: {
                display: false,
            },
        },
    },
}

export const barChartOptions: ChartOptions<"bar"> = {
    indexAxis: "x",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
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
    layout: {
        padding: 10,
    },
    scales: {
        y: {
            display: false,
            ticks: {
                stepSize: 1,
            },
            beginAtZero: true,
            title: {
                display: false,
            },
            grid: {
                display: false,
            },
        },

        x: {
            title: {
                display: false,
            },
            grid: {
                display: false,
            },
        },
    },
}

export const doughnutChartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: "Users by Device Type",
        },
        legend: {
            position: "bottom",
            display: true,
        },
    },
    layout: {
        padding: 15,
    },
}

type ReportName =
    | "usersByDate"
    | "usersByDate"
    | "usersByDevice"
    | "usersByChannel"
    | "viewsByPage"
    | "averageSessionDuration"
    | "totalNewUsers"
    | "activeUsersLast30Min"
    | "totalUsers"
    | "bounceRateByDate"

// List of report to run on store init //
const reports: AnalyticsReportRequest[] = [
    usersByDate,
    usersByDevice,
    usersByChannel,
    viewsByPage,
    averageSessionDuration,
    totalNewUsers,
    activeUsersLast30Min,
    bounceRateByDate,
    totalUsers,
]
