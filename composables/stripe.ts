import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"

export const stripeOrderCheckout = async (total: number, itemName: string, order: Order) => {
    try {
        const sessionId = await createPaymentIntent(total, itemName, order)

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
}

async function createPaymentIntent(total: Number, itemName: String, order: Order) {
    const payload = { total, itemName, order }

    const response = await axios.post("/api/stripe", payload)

    const { sessionId } = response.data
    return sessionId
}
