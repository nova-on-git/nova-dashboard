import { defineStore } from "pinia"
import { loadStripe, type Stripe } from "@stripe/stripe-js"
import axios from "axios"

export const usePaymentStore = defineStore("payment", {
    state: () => ({
        payment: {},
    }),

    getters: {
        get(state) {
            return state.payment
        },
    },

    actions: {
        /** Starts the checkout process and adds the order to the DB only if payment completes. */
        async createPayment(
            provider: PaymentProvider,
            total: number,
            itemName: string,
            order: OrderWithoutId
        ) {
            if (provider === "stripe") this.stripeOrderCheckout(total, itemName, order)
            // adding more providers in the future
        },

        /**Start the stripe checkout process using webhooks. */
        async createStripeCheckout(stripe: Stripe, total: number, itemName: string) {
            try {
                const sessionId = await this.getSessionId(total, itemName)

                if (!stripe) {
                    console.error("Stripe not init!!")
                    return
                }

                const res = await stripe.redirectToCheckout({ sessionId })
            } catch (error) {
                console.error("Error handling payment:", error)
            }
        },
        // async stripeOrderCheckout(total: number, itemName: string, order: OrderWithoutId) {
        //     try {
        //         const sessionId = await this.createPaymentIntent(total, itemName, order)

        //         console.log("sesionId", sessionId)

        //         const stripe = await loadStripe(
        //             "pk_test_51Puv9RDO9pf6iPuQNqaYyLEHE7nJuLGrdxq2QImsTFPiVOIyFmdnrGOIMmUrIjnkYrFKMrXjZUzxTTlqJF3xuTfw00T3KzadgL"
        //         )

        //         if (!stripe) {
        //             console.error("Stripe not init!!")
        //             return
        //         }

        //         const res = await stripe.redirectToCheckout({ sessionId })
        //     } catch (error) {
        //         console.error("Error handling payment:", error)
        //     }
        // },

        async getSessionId(total: Number, itemName: String) {
            const payload = { total, itemName }

            const response = await axios.post("/api/stripe", payload)

            const { sessionId } = response.data
            return sessionId
        },

        // async createPaymentIntent(total: Number, itemName: String, order: OrderWithoutId) {
        //     const payload = { total, itemName, order }

        //     const response = await axios.post("/api/stripe", payload)

        //     const { sessionId } = response.data
        //     return sessionId
        // },
    },
})
type PaymentProvider = "stripe"

interface StripePaymentSettings {
    mode: "subscription"
}
