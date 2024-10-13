<template>
    <form @submit.prevent="pay" id="payment-form">
        <label for="name">Name</label>
        <input type="text" name="name" placeholder="Full name on card" />

        <label for="email">Email</label>
        <input type="text" name="email" placeholder="email" />

        <label for="email">Email</label>
        <input type="text" name="email" placeholder="email" />

        <label for="email">Email</label>
        <input type="text" name="email" placeholder="email" />

        <div id="card-element"></div>
        <btn @click="pay" preset="dark" :disabled="isProcessing" type="submit">Pay</btn>
        <div id="card-errors" role="alert"></div>
    </form>
</template>

<script setup lang="ts">
import { loadStripe, type Stripe } from "@stripe/stripe-js"

const stripe = ref<Stripe | null>(null)
const card = ref<any>(null)
const isProcessing = ref(false)

interface Props {
    options: StripePaymentOptions
}

const props = defineProps<Props>()

onMounted(async () => {
    stripe.value = await loadStripe(
        "pk_test_51Puv9RDO9pf6iPuQNqaYyLEHE7nJuLGrdxq2QImsTFPiVOIyFmdnrGOIMmUrIjnkYrFKMrXjZUzxTTlqJF3xuTfw00T3KzadgL"
    )

    if (stripe.value) {
        const elements = stripe.value.elements()
        card.value = elements.create("card")
        card.value.mount("#card-element")
    }
})

async function pay() {
    if (!stripe.value || !card.value) {
        console.error("Stripe not initialized or card element not created!")
        return
    }

    isProcessing.value = true

    try {
        const { paymentIntent, error } = await stripe.value.confirmCardPayment(
            await getClientSecret(testPaymentOptions),
            {
                payment_method: {
                    card: card.value,
                    billing_details: {
                        name: "Test User",
                    },
                },
            }
        )

        console.log("Payment Intent:", paymentIntent)
    } catch (error) {
        console.error("Error handling payment:", error)
    } finally {
        isProcessing.value = false
    }
}

async function getClientSecret(paymentOptions: StripePaymentOptions): Promise<string> {
    const { data } = await useFetch<{ clientSecret: string }>("/api/stripe/payment-intent", {
        method: "POST",
        body: {
            paymentOptions: paymentOptions,
        },
    })

    if (!data.value || !data.value.clientSecret) {
        throw createError({ statusCode: 500, statusMessage: "Failed to fetch client secret." })
    }

    return data.value.clientSecret
}
</script>

<style scoped lang="sass">
#card-element
    max-width: 500px
    padding: 12px
    border: 1px solid #ccc
    border-radius: 4px
    margin-bottom: 12px
</style>
