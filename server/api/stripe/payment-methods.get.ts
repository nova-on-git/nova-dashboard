import Stripe from "stripe"

const config = useRuntimeConfig()

const STRIPE_SECRET_KEY = config.STRIPE_SECRET_KEY as string
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" })

export default defineEventHandler(async (event) => {
    // Get the customerId from the query or from a request body depending on your setup
    const query = getQuery(event)
    const customerId = query.customerId as string

    if (!customerId) {
        return {
            status: 400,
            message: "Customer ID is required",
        }
    }

    try {
        // Fetch saved payment methods for the customer
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: "card", // Specify the payment method type (e.g., 'card')
        })

        return paymentMethods.data // Return the payment methods
    } catch (error) {
        console.error("Error fetching payment methods:", error)
        return {
            status: 500,
            message: "Failed to fetch payment methods",
        }
    }
})
