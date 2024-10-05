import { eventHandler, readRawBody } from "h3"
import Stripe from "stripe"
import axios from "axios"

const config = useRuntimeConfig()
const STRIPE_WEBHOOK_SECRET = config.STRIPE_WEBHOOK_SECRET

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET as string, {
    apiVersion: "2024-06-20",
})

export default eventHandler(async (event) => {
    const sig = event.node.req.headers["stripe-signature"] as string | undefined
    const body = await readRawBody(event)
    const origin = event.node.req.headers["origin"]
    let stripeEvent

    if (!sig || !body) {
        console.error("Missing signature or body")
        return { error: "Missing signature or body" }
    }

    try {
        stripeEvent = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)
    } catch (err: any) {
        console.error(`Webhook signature verification failed.`, err.message)
        return { error: "Webhook signature verification failed." }
    }

    switch (stripeEvent.type) {
        case "checkout.session.completed": {
            const paymentIntent = stripeEvent.data.object as Stripe.Checkout.Session
            const metadata = paymentIntent.metadata
            const orderId = metadata?.orderId

            if (!orderId) {
                console.error("Missing or invalid orderId in metadata")
                return { error: "Missing or invalid orderId in metadata" }
            }

            try {
                // Resolve order
                await useFetch(`${origin}/api/orders/incomplete/resolve-order`, {
                    method: "PUT",
                    body: { orderId },
                })
            } catch (error) {
                console.error("Error resolving order", error)
            }

            console.log("Payment received, order is live.")
            break
        }

        default:
            console.log(`Unhandled event type ${stripeEvent.type}`)
            return 500
    }

    return { received: true }
})
