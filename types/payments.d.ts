export {}

declare global {
    /**Data sent to stripe for the payment processing. */
    interface StripePaymentOptions {
        /**Amount in pence */
        amount: number
        currency: "gbp" | "usd" | "eur"
    }

    /**Data for our personal records. */
    interface StripeMetaData {
        /**Description of whats being bought. */
        description: string
        /**Percentage of the whole amount */
        taxRate: number
    }

    interface PaymentRecord {
        transactionId: string
        email: string
        timestamp: string
        currency: "gbp" | "usd" | "eur"

        refundStatus: boolean

        /**Percentage of the whole amount */
        taxRate: string
        billingAddress: Address
        description: string

        /**Amount Paid in pence */
        totalPaid: number
    }
}
