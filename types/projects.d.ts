export {}

declare global {
    type ProjectStatus = "discovery" | "design" | "development" | "final approval" | "testing" | "launch" | "completed"

    type PaymentPlan = "once" | "installments"

    interface Project {
        /**Db reference id */
        id: string
        /**Name of the project e.g. client/ company name */
        name: string

        /**List of all clients that have access to the project details */
        emails: string[]

        /**What stage the project is in. */
        status: ProjectStatus

        paymentPlan?: PaymentPlan

        price?: {
            siteCost: number
            domain?: number
            vat: number

        }
        

    }
}