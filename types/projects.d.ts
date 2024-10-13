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
        | "general"

    /**These are the meetings that can be scheduled. Each one will come with its own description shown to the client. It will also outline the meeting agenda. */
    type MeetingRequestTypes = "discovery" | "design" | "final approval" | "launch"

    type Actions = "meeting" | "document" | "none"

    type PaymentPlan = "once" | "installments"

    interface Meeting {
        meetingUrl: string
        name: string
        startTime: string
        cancelUrl: string
        rescheduleUrl: string

        clients: {
            name: string
            email: string
        }[]
    }

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
        meeting?: Meeting
        paymentPlan?: PaymentPlan

        quote?: {
            status: "awaiting" | "rejected" | "paid"

            quoteUrl: string
            price: number
            proposalUrl: string
            domain?: number
        }
    }
}
