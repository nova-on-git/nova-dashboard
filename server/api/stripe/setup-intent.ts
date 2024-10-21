import Stripe from "stripe"

const config = useRuntimeConfig()

const STRIPE_SECRET_KEY = config.STRIPE_SECRET_KEY as string
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" })

export default defineEventHandler(async (event) => {
    try {
        const setupIntent = await stripe.setupIntents.create({
            payment_method_types: ["card"],
        })

        return { clientSecret: setupIntent.client_secret }
    } catch (error) {
        console.error("Error creating Setup Intent:", error)
        return {
            status: 500,
            message: "Failed to create Setup Intent",
        }
    }
})
