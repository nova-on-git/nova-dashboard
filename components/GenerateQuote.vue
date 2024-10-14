<template>
    <div class="send-quote">
        <h5>Send quote</h5>

        <div class="add-item">
            <label for="item-select">Choose an item:</label>
            <select id="item-select" name="items" v-model="quoteItemInput.name">
                <option value="" disabled selected>Select an option</option>
                <option value="website">Website Development</option>
                <option value="domain">Domain</option>
                <option value="hosting">Hosting</option>
            </select>

            <label for="item-select">Payment Type:</label>
            <select id="item-select" name="items" v-model="quoteItemInput.paymentType">
                <option value="" disabled selected>Select an option</option>
                <option value="payment">Payment</option>
                <option value="subscription">Subscription</option>
            </select>

            <div>
                <label for="price">Price of the item</label>
                <input
                    v-model="quoteItemInput.amount"
                    type="text"
                    name="price"
                    placeholder="cost of item"
                />
            </div>

            <btn @click="addQuoteItem()">Add quote item</btn>
        </div>

        <div class="quote-items">
            <h6>Quote Items</h6>
            <div class="item" v-for="item in projectQuoteItems">
                <div>Name: {{ item.name }}</div>
                <div>Price: {{ item.amount }}</div>
                <div>Payment Type: {{ item.paymentType }}</div>
            </div>
        </div>

        <div v-if="project.phase === 'discovery'">
            <label for="quote-upload">Upload Quote (PDF):</label>
            <input
                id="quote-upload"
                type="file"
                accept="application/pdf"
                @change="handleQuoteUpload"
            />
        </div>

        <div v-if="project.phase === 'discovery'">
            <label for="proposal-upload">Upload Project Proposal (PDF):</label>
            <input
                id="proposal-upload"
                type="file"
                accept="application/pdf"
                @change="handleProposalUpload"
            />
        </div>

        <div class="pdf" v-if="quoteFile">
            {{ quoteFile.name }}
        </div>
        <div class="pdf" v-if="proposalFile">
            {{ proposalFile.name }}
        </div>
    </div>

    <btn preset="dark" @click="sendProposal">Send quote</btn>
</template>

<script setup lang="ts">
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"

const quoteFile = ref<File | null>(null)
const proposalFile = ref<File | null>(null)
const projectQuoteItems = ref<ProjectQuoteItem[]>([])
const quoteItemInput = ref<ProjectQuoteItem>({
    name: "website",
    amount: 0,
    amountPaid: 0,
    paymentType: "payment",
})

interface Props {
    project: Project
}

const props = defineProps<Props>()

function addQuoteItem() {
    projectQuoteItems.value.push(quoteItemInput.value)

    quoteItemInput.value = {
        name: "website",
        amount: 0,
        amountPaid: 0,
        paymentType: "payment",
    }
}
const handleQuoteUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        quoteFile.value = target.files[0]
    }
}

const handleProposalUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        proposalFile.value = target.files[0]
    }
}

async function sendProposal() {
    if (!quoteFile.value || !proposalFile.value) return

    let quoteUrl: string
    let proposalUrl: string

    const $storage = useStorage()

    const quoteStorageRef = storageRef(
        $storage,
        `projects/${props.project.id}/${quoteFile.value.name}`
    )
    await uploadBytes(quoteStorageRef, quoteFile.value)
    quoteUrl = await getDownloadURL(quoteStorageRef)

    const proposalStorageRef = storageRef(
        $storage,
        `projects/${props.project.id}/${proposalFile.value.name}`
    )
    await uploadBytes(proposalStorageRef, proposalFile.value)
    proposalUrl = await getDownloadURL(proposalStorageRef)

    if (!quoteUrl || !proposalUrl) return

    const quote: ProjectQuote = {
        items: projectQuoteItems.value,
        quoteUrl: quoteUrl,
        proposalUrl: proposalUrl,
    }

    $Projects.uploadQuote(props.project.id, quote)
}
</script>

<style lang="sass" scoped>
.send-quote
    display: flex
    flex-direction: column
    gap: 10px
    padding: 25px
    background: lightgrey

.quote-items

    .item
        background: #777
        margin: 10px 0
</style>
