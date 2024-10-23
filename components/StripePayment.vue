<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { loadStripe, type Stripe } from "@stripe/stripe-js"

const stripe = ref<Stripe | null>(null)
const card = ref<any>(null)
const isProcessing = ref(false)
const errorMessage = ref("")
const successMessage = ref("")

const receipt_email = ref("codypwakeford@gmail.com")
const billingAddress = ref({
    name: "Cody Wakeford",
    street: "Smith Street",
    city: "London",
    county: "London",
    country: "England",
    postcode: "SU22 4RD",
})

interface Props {
    options: StripePaymentOptions
    metadata: StripeMetaData

    /**Fired when payment is complete and returns a payment record for storage. */
    onPayment: (paymentRecord: PaymentRecord) => void
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

    const paymentOptions = {
        ...props.options,
        receipt_email: receipt_email.value,
    }

    try {
        const { paymentIntent, error } = await stripe.value.confirmCardPayment(
            await getClientSecret(paymentOptions),
            {
                payment_method: {
                    card: card.value,
                    billing_details: {
                        name: billingAddress.value.name,
                        email: receipt_email.value,
                    },
                },
            }
        )

        if (error && error.message) {
            errorMessage.value = error.message
            return
        }

        if (!paymentIntent) {
            throw createError({ statusCode: 500 })
        }

        errorMessage.value = ""
        successMessage.value = "Payment Successful. Thank you for your business."

        const paymentRecord: PaymentRecord = {
            totalPaid: paymentIntent.amount,
            transactionId: paymentIntent.id,
            email: receipt_email.value,
            billingAddress: billingAddress.value,
            timestamp: String(Date.now()),
            currency: props.options.currency,
            refundStatus: false,
            taxRate: props.metadata.taxRate,
            description: props.metadata.description,
        }

        props.onPayment(paymentRecord)
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

<template>
    <form @submit.prevent="pay" id="payment-form">
        <rflex class="form-items">
            <cflex class="left">
                <header>
                    <Icon icon="material-symbols:counter-1-outline" width="25" />
                    <h2>Billing Address</h2>
                </header>
                <cflex class="form-item-group">
                    <label for="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full name on card"
                        v-model="billingAddress.name"
                    />
                </cflex>

                <cflex class="form-item-group">
                    <label for="email">Street</label>
                    <input
                        type="text"
                        name="street"
                        placeholder="street"
                        v-model="billingAddress.street"
                    />
                </cflex>

                <cflex class="form-item-group">
                    <label for="email">City</label>
                    <input
                        type="text"
                        name="city"
                        placeholder="city"
                        v-model="billingAddress.city"
                    />
                </cflex>

                <cflex class="form-item-group">
                    <label for="email">Country</label>
                    <input
                        type="text"
                        name="country"
                        placeholder="country"
                        v-model="billingAddress.country"
                    />
                </cflex>

                <cflex class="form-item-group">
                    <label for="email">Postcode</label>

                    <input
                        type="text"
                        name="postcode"
                        placeholder="postcode"
                        v-model="billingAddress.postcode"
                    />
                </cflex>
            </cflex>

            <cflex class="right">
                <header>
                    <Icon icon="material-symbols:counter-2-outline" width="25" />
                    <h2>Card Info</h2>
                </header>

                <cflex class="form-item-group">
                    <label for="email">Email for recipt</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Full name on card"
                        v-model="receipt_email"
                    />
                </cflex>

                <cflex class="form-item-group">
                    <label>Card Information</label>
                    <div id="card-element"></div>
                </cflex>
            </cflex>
        </rflex>

        <h5>Amount Due: £{{ options.amount / 100 }}</h5>
        <btn
            :loading="isProcessing"
            @click="pay"
            preset="dark"
            :disabled="isProcessing"
            type="submit"
            >Pay
        </btn>

        <div id="card-errors" role="alert">{{ errorMessage }}</div>
        <div id="card-success">{{ successMessage }}</div>
    </form>
</template>

<style scoped lang="sass">
#card-element, input
    max-width: 500px
    min-width: 350px
    padding: 12px
    border: 1px solid #ccc
    border-radius: 4px
    background: white

label
    font-size: 0.9rem
    margin-bottom: 5px
    padding-left: 2px

form
    display: flex
    flex-direction: column
    gap: 10px

    .form-items
        align-items: start
        gap: 50px

        .left, .right
            gap: 20px


header
    display: flex
    gap: 5px
    align-items: center
    margin-bottom: 15px
    margin-top: 25px

    h2
        font-size: 1.25rem
</style>
