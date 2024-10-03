import { defineStore } from "pinia"
import { loadStripe } from "@stripe/stripe-js"
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
        async createPayment(provider: PaymentProvider, total: number, itemName: string, order: OrderWithoutId) {
            if (provider === "stripe") this.stripeCheckout(total, itemName, order)
            // adding more providers in the future
        },

        async stripeCheckout(total: number, itemName: string, order: OrderWithoutId) {
            try {
                const sessionId = await this.createPaymentIntent(total, itemName, order)

                console.log("sesionId", sessionId)

                const stripePromise = loadStripe(
                    "pk_test_51Puv9RDO9pf6iPuQNqaYyLEHE7nJuLGrdxq2QImsTFPiVOIyFmdnrGOIMmUrIjnkYrFKMrXjZUzxTTlqJF3xuTfw00T3KzadgL"
                )

                const stripe = await stripePromise

                if (!stripe) {
                    console.error("Stripe not init!!")
                    return
                }

                const res = await stripe.redirectToCheckout({ sessionId })
            } catch (error) {
                console.error("Error handling payment:", error)
            }
        },

        async createPaymentIntent(total: Number, itemName: String, order: OrderWithoutId) {
            const payload = { total, itemName, order }

            const response = await axios.post("/api/stripe", payload)

            const { sessionId } = response.data
            return sessionId
        },
    },
})
type PaymentProvider = "stripe"
