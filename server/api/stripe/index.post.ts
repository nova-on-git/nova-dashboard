import { eventHandler, readBody } from "h3";
import Stripe from "stripe";
import axios from "axios";

// TODO change to env
const config = useRuntimeConfig();

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export default eventHandler(async (event) => {
    const body = await readBody(event);
    const { total, itemName, order } = body;

    const origin = event.node.req.headers["origin"];

    const response = await axios.post(`${origin}/api/orders/incomplete`, order);
    const orderID = response.data;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: itemName,
                        },
                        unit_amount: total,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${origin}/admin/dev?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}`,
            metadata: { orderId: orderID },

            // Veloris 2.5% service fee //
            // payment_intent_data: {
            //     application_fee_amount: Math.round(total * 0.025),
            //     transfer_data: {
            //         // TODO: Change to company account, this is Cody's test account //
            //         destination: "acct_1Puv9RDO9pf6iPuQ",
            //     },
            // },
        });

        return { sessionId: session.id };
    } catch (error: any) {
        console.log(error);
        return { error: error.message };
    }
});
