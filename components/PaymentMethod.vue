<template>
    <div>
        <h2>Saved Payment Methods</h2>
        <div v-if="loading">Loading...</div>
        <ul v-else>
            <li v-for="method in paymentMethods" :key="method.id">
                <p>Card Ending in: **** {{ method.card.last4 }}</p>
                <p>Expiry: {{ method.card.exp_month }}/{{ method.card.exp_year }}</p>
            </li>
        </ul>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const paymentMethods = ref([])
const loading = ref(false)
const errorMessage = ref("")

onMounted(async () => {
    const customerId = "your_customer_id" // Retrieve this from your user session or database
    loading.value = true

    try {
        const response = await fetch(`/api/stripe/payment-methods?customerId=${customerId}`)
        const data = await response.json()

        if (response.ok) {
            paymentMethods.value = data
        } else {
            throw new Error(data.message || "Failed to fetch payment methods")
        }
    } catch (error: any) {
        errorMessage.value = error.message
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
/* Add any styling here */
</style>
