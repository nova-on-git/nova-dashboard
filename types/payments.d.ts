export {}

declare global {
    interface StripePaymentOptions {
        /**Amount in pence */
        amount: number
        currency: "gbp" | "usd" | "eur"
    }

    interface PaymentOptions {
        payment_method_types: ["card"]
        line_items: {
            price_data: {
                currency: "gbp" | "usd"
                product_data: {
                    name: string
                }
                /**Price of the item in pence*/
                unit_amount: number
            }
            quantity: 1
        }[]
        mode: "payment" | "subscription"
    }
}
