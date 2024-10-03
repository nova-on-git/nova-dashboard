import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import { eventHandler, readBody } from "h3"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default eventHandler(async (event) => {
    // const credentialsPath = resolve(__dirname, "../../analytics_key.json")
    const credentialsPath = resolve(__dirname, "../../portfolio-2-64def1e0517b.json")
    process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath
    const analyticsDataClient = new BetaAnalyticsDataClient()
    // const propertyId = process.env.GA4_PROPERTY_ID // veloris-cms
    const propertyId = "452874094"

    // const reportRequest: AnalyticsReportRequest = await getQuery(event)
    const reportRequest: AnalyticsReportRequest = await readBody(event)

    const reportObject = {
        property: `properties/${propertyId}`,
        ...reportRequest,
    }

    const [response] = await analyticsDataClient.runReport(reportObject)
    return { ...response, timestamp: new Date() }
})
