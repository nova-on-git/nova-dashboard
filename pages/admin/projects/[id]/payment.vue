<template>
    <main class="admin-page">
        <VelorisClientsNav />

        <mpage class="admin-mpage">
            <rflex v-if="project.paymentPlan === 'noneSelected'">
                <btn
                    class="payment-plan-button"
                    @click="selectedPaymentPlan = 'three'"
                    :class="{ active: selectedPaymentPlan === 'three' }"
                    >3 Installments</btn
                >
                <btn
                    class="payment-plan-button"
                    @click="selectedPaymentPlan = 'one'"
                    :class="{ active: selectedPaymentPlan === 'one' }"
                    >1 Installment</btn
                >
            </rflex>

            <StripePayment
                :options="stripeOptions"
                :metadata="StripeMetadata"
                :onPayment="onStripePayment"
            />
        </mpage>
    </main>
</template>

<script setup lang="ts">
const selectedPaymentPlan = ref<Project["paymentPlan"]>("one")

const route = useRoute()
const projectId = route.params.id as string

const project = computed(() => {
    return $Projects.getProjectById(projectId)
})

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})

function onStripePayment(paymentRecord: PaymentRecord) {
    $Projects.updateAmountPaid(project.value.id, paymentRecord.totalPaid)
    $Payment.createRecord(paymentRecord)

    if (project.value.phase === "discovery") {
        moveToDesign()
    } else if (project.value.phase === "design") {
        moveToDevelopment()
    } else if (project.value.phase === "launch") {
        moveToLaunch()
    }

    if (project.value.paymentPlan === "noneSelected") {
        $Projects.setPaymentPlan(project.value.id, selectedPaymentPlan.value)
    }
}

// Final payment callback
async function moveToLaunch() {
    // Notify staff
    $Notifications.create({
        title: "Quote Accepeted",
        message: `${project.value.name} has made final payment. Please move project to launch.`,
        mode: "success",
        to: velorisStaffEmails,
        type: "client",
    })

    //TODO: Notify user that we are working to go live.
}

/**This will be asked for when the design is complete. Moving the project forward to the development phase. */
function moveToDevelopment() {
    $Projects.updatePhase(project.value.id, $Projects.getNextProjectPhase(project.value.phase))
}

/**
 * This will be called once the client has signed contract and paid initial payment of at least 33%
 * This will move the project to the design phase and notify staff the project has been accepted.
 */
function moveToDesign() {
    $Projects.updatePhase(project.value.id, $Projects.getNextProjectPhase(project.value.phase))

    // Notify staff
    $Notifications.create({
        message: "Quote Accepeted",
        mode: "success",
        title: `${project.value.name} has accepted the quote and made initial payment.`,
        to: velorisStaffEmails,
        type: "client",
    })
}

const amountDue = computed(() => {
    if (!project.value.quote) return 0

    const paymentItems: ProjectQuoteItem[] = project.value.quote.items.filter((item) => {
        return item.paymentType === "payment"
    })

    let total = 0

    paymentItems.forEach((item) => {
        total += item.amount
    })

    if (selectedPaymentPlan.value === "three" || project.value.paymentPlan === "three") {
        total = Math.ceil(total / 3)
    }

    return total
})

const stripeOptions = computed((): StripePaymentOptions => {
    return {
        amount: amountDue.value,
        currency: "gbp",
    }
})

const StripeMetadata: StripeMetaData = {
    taxRate: 0,
    description: "Web development services.",
}
</script>

<style lang="sass" scoped></style>
