export {}

declare global {
    type ProjectPhase =
        | "onboarding"
        | "discovery"
        | "design"
        | "development"
        | "final approval"
        | "testing"
        | "launch"
        | "completed"

    /**These are the meetings that can be scheduled. Each one will come with its own description shown to the client. It will also outline the meeting agenda. */
    type MeetingRequestTypes = "discovery" | "design" | "final approval" | "launch"

    type Actions = "meeting" | "document" | "none"

    type PaymentPlan = "once" | "installments"

    interface Project {
        /**Db reference id */
        id: string
        /**Name of the project e.g. client/ company name */
        name: string

        /**List of all clients that have access to the project details */
        emails: string[]

        /**What phase the project is in. */
        phase: ProjectPhase
        action: Actions
        paymentPlan?: PaymentPlan

        price?: {
            siteCost: number
            domain?: number
            vat: number
        }
    }
}