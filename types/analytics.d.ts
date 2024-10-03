export {}

declare global {
    type ReportTimeFrame =
        | "31daysAgo"
        | "7daysAgo"
        | "yesterday"
        | "today"
        | "last30Days"
        | "last7Days"
        | "lastYear"
        | "30daysAgo"
        | "30minutesAgo"
        | "now"

    type ReportDimension =
        | "date"
        | "deviceCategory"
        | "country"
        | "userType"
        | "browser"
        | "os"
        | "platform"
        | "channelGrouping"
        | "primaryChannelGroup"
        | "sessionDefaultChannelGrouping"
        | "pagePath"
        | "dateHourMinute"
        | "minutesAgo"

    type ReportMetric =
        | "activeUsers"
        | "sessions"
        | "pageViews"
        | "bounceRate"
        | "conversionRate"
        | "screenPageViews"
        | "averageSessionDuration"
        | "newUsers"
        | "minutesAgo"
        | "date"
        | "totalUsers"

    interface AnalyticsReportRequest {
        metadata: {
            /** A reference name */
            reportName: string
            /** Time in seconds */
            staleAfter: number

            /** If true the `/api/realtimeAnalytics` endpoint will be used */
            realtime?: boolean
        }
        reportRequest: {
            // Omit for real time report
            dateRanges?: [
                {
                    startDate: ReportTimeFrame
                    endDate: ReportTimeFrame
                },
            ]
            orderBys?: [
                {
                    metric?: {
                        metricName: ReportMetric
                    }
                    dimension?: {
                        dimensionName: ReportDimension
                    }
                    desc?: boolean
                },
            ]
            limit?: string
            dimensions: [
                {
                    name: ReportDimension
                },
            ]
            metrics: [
                {
                    name: ReportMetric
                },
            ]
        }
    }

    interface DimensionValue {
        value: string
        oneValue: string
    }

    interface MetricValue {
        value: string
        oneValue: string
    }

    interface Row {
        dimensionValues: DimensionValue[]
        metricValues: MetricValue[]
    }

    interface DimensionHeader {
        name: string
    }

    interface MetricHeader {
        name: string
        type: string
    }

    interface Metadata {
        samplingMetadata: any[]
        dataLossFromOtherRow: boolean
        currencyCode: string
        _currencyCode: string
        timeZone: string
        _timeZone: string
        reportName: string
        staleAfter: number
    }

    interface AnalyticsStore {
        [key: string]: AnalyticsReport
    }

    interface AnalyticsReport {
        dimensionHeaders: DimensionHeader[]
        metricHeaders: MetricHeader[]
        rows: Row[]
        totals: any[]
        maximums: any[]
        minimums: any[]
        rowCount: number
        metadata: Metadata
        propertyQuota: any | null
        kind: string
        timestamp: Date
        metadata: {
            reportName: string
        }
    }
}
