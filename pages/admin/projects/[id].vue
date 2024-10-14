<template>
    <main class="admin-page">
        <mpage class="admin-mpage" v-if="project">
            <rflex>
                <h4>{{ project.name }}</h4>
                <h5>Phase: {{ project.phase }}</h5>
            </rflex>

            <ProjectPhase :phase="project.phase" />

            <!-- <rflex>
                <cflex class="phase-description">
                    <h5>Phase Description</h5>
                    <pre v-if="project.phase === 'onboarding'">
                        Welcome to your project! We're excited to start this journey with you. In this phase, we'll gather all necessary information to kick off the project.

                        This is a place that makes it easy for you to interact with us, the development team. 

                        Here you can schedule calls with us, talk with use through the chatroom. Throughout this process we may ask you to schedule particular calls with us to discuss the next stage of the project.

                        You will see a "required action" that we ask kindly that you complete to keep the project on schedule.

                        We will cover this in detail during our discovery meeting.

                        Thanks for choosing Veloris Designs
                    </pre>

                    <pre v-if="project.phase === 'discovery'">
                        #Discovery

                        We're currently in the discovery phase, where we identify your requirements and goals. We work hard to understand your requirements from the start so we can offer the right solution. 

                        Please schedule the discovery meeting with the design team at your convenience. 
                        
                        After this meeting we will draw up a project proposal. This will outline the plan for the project, mapping out all the features that you will need. This document summarises the project. From this proposal we can draw up a quote. Once you are happy with the proposal and make the payment then we can jump straight into the design phase.
                    </pre>

                    <pre v-if="project.phase === 'design'">
                        #Design

                        We have a good idea where were headed now. During the design phase we will work closely with you while creating the design template. This ensures we bring YOUR vision to life in all of it's glory.

                        This stage will most likely consist of a few meetings. In each we will ask questions to understand the look and feel your going for. Each time we can iterate until your happy with the design.
                    </pre>

                    <pre v-if="project.phase === 'development'">
                        #Development

                        Now you can sit back while we work. During the development stage we build your website from the ground up exactly to the design we made in the last phase. Once were done with the first draft we will notify you.
                    </pre>

                    <pre v-if="project.phase === 'final approval'">
                        #Final Approval

                        Were now done building the draft. This gives you the chance to see the website on a demo link and point out any minor changes you wish to make before we finalise the website.

                        Once it's built to your spec we can move into the testing phase!
                    </pre>

                    <pre v-if="project.phase === 'testing'">
                        #Testing

                        During the testing phase we stress test every part of the website making sure that everything works as intended on any device. 

                        Once were finished with the testing phase we will notify you.
                    </pre>

                    <pre v-if="project.phase === 'launch'">
                        #Launch

                        Congratulations! We're ready to launch your project. This is an exciting time as your project goes live! We ask that you book one last call so we can show you the live website link and walk you around the website, ensuring you and your team know exactly whats where and how to use it.

                        
                    </pre>
                </cflex>
            </rflex> -->

            <div>Project Phase: {{ project.phase }}</div>

            <cflex v-if="project.action === 'meeting'">
                <p>Please book our next call at your convenience.</p>
                <button class="calendly-button">
                    <CalendlyPopupButton v-bind="options" :root-element="rootElement" />
                </button>
            </cflex>

            <cflex v-if="project.meeting?.meetingUrl">
                <h4>Booked meeting link</h4>
                <p>
                    Meeting Link:
                    <anchor target="_blank" :to="project.meeting?.meetingUrl" class="meeting-link">
                        Zoom Meeting Link</anchor
                    >
                </p>
            </cflex>
            <div v-if="project.quote && project.phase === 'discovery'">
                <cflex v-if="project.quote">
                    <h4>A project proposal has been submitted</h4>

                    <anchor :to="project.quote.proposalUrl" target="_blank">View Proposal</anchor>
                    <anchor :to="project.quote.quoteUrl" target="_blank">View Quote</anchor>

                    <rflex>
                        <btn modal="offerAccepted">Accept Offer</btn>
                        <btn>Schedule Meeting</btn>
                        <btn :to="`/admin/projects/chatrooms/${project.id}`">Send us a message</btn>
                        <btn>Decline Offer</btn>
                    </rflex>
                </cflex>

                <btn :to="`/admin/projects/chatrooms/${project.id}`">Project Chatroom</btn>

                <div ref="rootElement" />

                <modal id="offerAccepted">
                    <div class="offer-accepted-modal">
                        <!-- TODO: add doc signing -->
                        <h6>Payment plans</h6>
                        <rflex>
                            <btn
                                class="payment-plan-button"
                                @click="
                                    (selectedPaymentPlan = 'three'), (project.paymentPlan = 'three')
                                "
                                :class="{ active: selectedPaymentPlan === 'three' }"
                                >3 Installments</btn
                            >
                            <btn
                                class="payment-plan-button"
                                @click="
                                    (selectedPaymentPlan = 'one'), (project.paymentPlan = 'one')
                                "
                                :class="{ active: selectedPaymentPlan === 'one' }"
                                >1 Installment</btn
                            >
                            <!-- <btn>Monthly Subscription</btn> -->
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
            <pre>{{ project }}</pre>
        </mpage>
    </main>
</template>

<script setup lang="ts">
const route = useRoute()
const projectId = route.params.id as string
const project = $Projects.getProjectById(projectId)
const selectedPaymentPlan = ref<Project["paymentPlan"]>("one")

const amountDue = computed(() => {
    if (!project.quote) return 0

    const paymentItems: ProjectQuoteItem[] = project.quote.items.filter((item) => {
        return item.paymentType === "payment"
    })

    let total = 0

    paymentItems.forEach((item) => {
        total += item.amount
    })

    if (selectedPaymentPlan.value === "three") {
        total = Math.ceil(total / 3)
    }

    return total
})

const stripeOptions = computed(() => {
    return {
        amount: amountDue.value,
        currency: "gbp",
    }
})

function onDiscoveryPayment(paymentRecord: PaymentRecord) {
    $Payment.createRecord(paymentRecord)
    $Projects.updateAmountPaid(project.id, paymentRecord.totalPaid)
    $Projects.setPaymentPlan(project.id, selectedPaymentPlan.value)
    $Projects.updatePhase(project.id, $Projects.getNextProjectPhase(project.phase))
}

const StripeMetadata = {
    taxRate: 0,
    description: "Web development services.",
}

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
const rootElement = ref()
const options = {
    url: "https://calendly.com/codypwakeford/30min",
    text: "Book your next meeting",
}

useCalendlyEventListener({
    onEventScheduled: (event) => {
        const velorisMeetingUrl = event.data.payload.event.uri
        const clientMeetingUrl = event.data.payload.invitee.uri

        $Projects.meetingScheduled(project.id, velorisMeetingUrl, clientMeetingUrl)
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
