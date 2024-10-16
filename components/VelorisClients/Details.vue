<template>
    <rflex>
        <h4>{{ project.name }}</h4>
        <h5>Phase: {{ project.phase }}</h5>
    </rflex>

    <!-- Meeting button shown only when requested -->
    <cflex v-if="project.action === 'meeting'">
        <div ref="rootElement" />
        <p>Please book our next call at your convenience.</p>
        <button class="calendly-button">
            <CalendlyPopupButton v-bind="options" :root-element="rootElement" />
        </button>
    </cflex>

    <!-- Phase tracker bar -->
    <ProjectPhase :phase="project.phase" />

    <!-- Shows a message based on the phase. -->
    <ProjectPhaseMessage :phase="project.phase" />
    <!-- Meeting Link when generated -->
    <cflex v-if="project.meeting">
        <h4>Booked meeting link</h4>
        <p>
            Meeting Link:
            <anchor target="_blank" :to="project.meeting?.meetingUrl" class="meeting-link">
                Google Meet Link</anchor
            >
        </p>
    </cflex>

    <!-- Accept the design. TODO: show only after design meeting. -->
    <div v-if="project.phase === 'design'">
        <btn modal="finalDesign">Accept Final Design</btn>
        <modal id="finalDesign">
            Are you sure? This action is irriverable.
            <btn @click="closeModal('finalDesign')">Close</btn>
            <btn
                @click="
                    $Projects.updatePhase(project.id, $Projects.getNextProjectPhase(project.phase))
                "
                >Accept Design</btn
            >
        </modal>
    </div>

    <!-- Display quote shown when first quote is given. -->
    <div v-if="project.quote && project.phase === 'discovery'">
        <cflex v-if="project.quote">
            <h4>A project proposal has been submitted</h4>

            <anchor :to="project.quote.proposalUrl" target="_blank">View Proposal</anchor>
            <anchor :to="project.quote.quoteUrl" target="_blank">View Quote</anchor>

            <rflex>
                <btn modal="offerAccepted">Accept Offer</btn>
                <button class="calendly-button">
                    <CalendlyPopupButton v-bind="options" :root-element="rootElement" />
                </button>
                <btn :to="`/admin/projects/chatrooms/${project.id}`">Send us a message</btn>
                <btn>Decline Offer</btn>
            </rflex>
        </cflex>

        <btn :to="`/admin/projects/chatrooms/${project.id}`">Project Chatroom</btn>

        <modal id="offerAccepted">
            <div class="offer-accepted-modal">
                <!-- TODO: add doc signing -->
                <h6>Payment plans</h6>
                <rflex>
                    <btn
                        class="payment-plan-button"
                        @click="(selectedPaymentPlan = 'three'), (project.paymentPlan = 'three')"
                        :class="{ active: selectedPaymentPlan === 'three' }"
                        >3 Installments</btn
                    >
                    <btn
                        class="payment-plan-button"
                        @click="(selectedPaymentPlan = 'one'), (project.paymentPlan = 'one')"
                        :class="{ active: selectedPaymentPlan === 'one' }"
                        >1 Installment</btn
                    >
                </rflex>

                <StripePayment
                    :options="stripeOptions"
                    :metadata="StripeMetadata"
                    :project="project"
                    :paymentPlan="selectedPaymentPlan"
                    :onPayment="onDiscoveryPayment"
                />
            </div>
        </modal>
    </div>

    <!-- Payment for devlopment. Development starts after payment. -->
    <div v-if="project.paymentPlan === 'three' && project.phase === 'development'">
        <StripePayment
            :options="stripeOptions"
            :metadata="StripeMetadata"
            :project="project"
            :paymentPlan="selectedPaymentPlan"
            :onPayment="onDevelopmentPayment"
        />
    </div>

    <!-- Payment upon website completion. After this website will be launched. -->
    <div v-if="project.paymentPlan === 'three' && project.phase === 'launch'">
        <StripePayment
            :options="stripeOptions"
            :metadata="StripeMetadata"
            :project="project"
            :paymentPlan="selectedPaymentPlan"
            :onPayment="onLaunchPayment"
        />
    </div>

    <pre>{{ project }}</pre>
</template>

<script setup lang="ts">
import { velorisStaffEmails } from "~/stores/notifications"

const selectedPaymentPlan = ref<Project["paymentPlan"]>("one")

const route = useRoute()
const projectId = route.params.id as string

const project = computed(() => {
    return $Projects.getProjectById(projectId)
})

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

// Funtions passed to stripe as a callback.

// Final payment callback
function onLaunchPayment(paymentRecord: PaymentRecord) {
    $Payment.createRecord(paymentRecord)
    $Projects.updateAmountPaid(project.value.id, paymentRecord.totalPaid)
}

// 2nd payment callback (if required)
function onDevelopmentPayment(paymentRecord: PaymentRecord) {
    $Payment.createRecord(paymentRecord)
    $Projects.updateAmountPaid(project.value.id, paymentRecord.totalPaid)
}

// Fired when the client accepts the quote and makes intial payment. //
function onDiscoveryPayment(paymentRecord: PaymentRecord) {
    $Payment.createRecord(paymentRecord)
    $Projects.updateAmountPaid(project.value.id, paymentRecord.totalPaid)
    $Projects.setPaymentPlan(project.value.id, selectedPaymentPlan.value)
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

const rootElement = ref()
const options = {
    url: "https://calendly.com/codypwakeford/veloris-project-meeting",
    text: "Book your next meeting",
}

useCalendlyEventListener({
    onEventScheduled: (event) => {
        const velorisMeetingUrl = event.data.payload.event.uri
        const clientMeetingUrl = event.data.payload.invitee.uri

        $Projects.meetingScheduled(project.value.id, velorisMeetingUrl, clientMeetingUrl)

        if (project.value.phase === "onboarding") {
            $Projects.incrementPhase(project.value.id)
        }
    },
})
</script>

<style lang="sass" scoped>
.calendly-button
    background: red

.meeting-link
    color: blue

.offer-accepted-modal
    background: white
    padding: 50px

.payment-plan-button
    &.active
        border: 1px solid blue
</style>
