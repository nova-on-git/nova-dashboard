<template>
    <div>
        <h2>Add Payment Method</h2>
        <form @submit.prevent="handleSubmit">
            <div id="card-element"></div>
            <button type="submit" :disabled="loading">Save Payment Method</button>
        </form>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { loadStripe, type Stripe } from "@stripe/stripe-js"

const stripe = ref<Stripe | null>(null)
const card = ref<any>(null)
const elements = ref<any>()
// Get your Stripe public key

const loading = ref(false)
const errorMessage = ref("")
const clientSecret = ref("")

onMounted(async () => {
    try {
        console.log("Loading Stripe...")
        stripe.value = await loadStripe(
            "pk_test_51Puv9RDO9pf6iPuQNqaYyLEHE7nJuLGrdxq2QImsTFPiVOIyFmdnrGOIMmUrIjnkYrFKMrXjZUzxTTlqJF3xuTfw00T3KzadgL"
        )

        if (!stripe.value) {
            throw new Error("Failed to initialize Stripe")
        }
        console.log("Stripe loaded:", stripe.value)

        elements.value = stripe.value.elements()
        if (!elements.value) {
            throw new Error("Failed to create Stripe elements")
        }
        console.log("Stripe elements created:", elements.value)

        card.value = elements.value.create("card")
        if (!card.value) {
            throw new Error("Failed to create Stripe card element")
        }
        card.value.mount("#card-element")
        console.log("Card element mounted")

        const response = await fetch("/api/stripe/setup-intent")
        if (!response.ok) {
            throw new Error("Failed to fetch setup intent")
        }

        const data = await response.json()
        clientSecret.value = data.clientSecret
        console.log("Client secret obtained:", clientSecret.value)
    } catch (error: any) {
        errorMessage.value = error.message || "An error occurred"
        console.error(error)
    }
})

const handleSubmit = async () => {
    loading.value = true
    errorMessage.value = ""

    console.log("Submitting form...")

    if (!stripe.value || !elements.value || !clientSecret.value || !card.value) {
        errorMessage.value = "Stripe elements not properly initialized"
        console.error({
            stripe: stripe.value,
            elements: elements.value,
            card: card.value,
            clientSecret: clientSecret.value,
        })
        loading.value = false
        return
    }

    const { error } = await stripe.value.confirmCardSetup(clientSecret.value, {
        payment_method: {
            card: card.value,
        },
    })

    if (error) {
        errorMessage.value = error.message
    } else {
        errorMessage.value = "Payment method saved successfully!"
    }

    loading.value = false
}
</script>

<style scoped>
#card-element {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 20px;
}
</style>
