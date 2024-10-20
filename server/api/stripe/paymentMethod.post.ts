import Stripe from "stripe"

const config = useRuntimeConfig()

const STRIPE_SECRET_KEY = config.STRIPE_SECRET_KEY as string
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" })

export default defineEventHandler(async (event) => {
    try {
        const { paymentMethodId, customerEmail } = await readBody(event)

        if (!paymentMethodId || !customerEmail) {
            throw createError({ statusCode: 400, statusMessage: "Missing required parameters." })
        }

        // Create or retrieve the customer (you can handle user authentication here as well)
        let customer

        // Option 1: If customer exists, retrieve them using email or ID
        const existingCustomers = await stripe.customers.list({
            email: customerEmail,
            limit: 1,
        })

        if (existingCustomers.data.length > 0) {
            customer = existingCustomers.data[0] // Assume first match is correct
        } else {
            // Option 2: If no customer exists, create a new customer
            customer = await stripe.customers.create({
                email: customerEmail,
            })
        }

        // Attach the Payment Method to the customer
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customer.id,
        })

        // Optionally set it as the default payment method
        await stripe.customers.update(customer.id, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        })

        return { success: true, message: "Payment method saved successfully!" }
    } catch (error) {
        console.error("Error saving payment method:", error)
        return {
            success: false,
            error: error.message || "An error occurred while saving the payment method.",
        }
    }
})
