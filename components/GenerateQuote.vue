<template>
    <div class="generate-quote" v-if="project.phase === 'discovery'">
      <h2 class="section-title">Generate Quote</h2>
  
      <div class="quote-form">
        <div class="form-group">
          <label for="item-select">Choose an item:</label>
          <select id="item-select" v-model="quoteItemInput.name">
            <option value="" disabled selected>Select an option</option>
            <option value="website">Website Development</option>
            <option value="domain">Domain</option>
            <option value="hosting">Hosting</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="payment-type">Payment Type:</label>
          <select id="payment-type" v-model="quoteItemInput.paymentType">
            <option value="" disabled selected>Select an option</option>
            <option value="payment">One-time Payment</option>
            <option value="subscription">Subscription</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="price">Price of the item</label>
          <input
            v-model="quoteItemInput.amount"
            type="number"
            id="price"
            placeholder="Cost of item"
            step="0.01"
          />
        </div>
  
        <button class="btn-add" @click="addQuoteItem">Add quote item</button>
      </div>
  
      <div class="quote-items" v-if="projectQuoteItems.length > 0">
        <h3>Quote Items</h3>
        <div class="item" v-for="(item, index) in projectQuoteItems" :key="index">
          <div class="item-details">
            <strong>{{ item.name }}</strong>
            <span>£{{ item.amount.toFixed(2) }}</span>
            <span>{{ item.paymentType === 'payment' ? 'One-time' : 'Subscription' }}</span>
          </div>
          <button class="btn-remove" @click="removeQuoteItem(index)">Remove</button>
        </div>
        <div class="total">
          <strong>Total:</strong> £{{ totalAmount.toFixed(2) }}
        </div>
      </div>
  
      <div class="file-upload">
        <div class="form-group">
          <label for="quote-upload">Upload Quote (PDF):</label>
          <input
            id="quote-upload"
            type="file"
            accept="application/pdf"
            @change="handleQuoteUpload"
          />
        </div>
  
        <div class="form-group">
          <label for="proposal-upload">Upload Project Proposal (PDF):</label>
          <input
            id="proposal-upload"
            type="file"
            accept="application/pdf"
            @change="handleProposalUpload"
          />
        </div>
      </div>
  
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      
      <div class="uploaded-files">
        <div class="file" v-if="quoteFile">
          <span>Quote: {{ quoteFile.name }}</span>
          <button class="btn-remove" @click="removeQuoteFile">Remove</button>
        </div>
        <div class="file" v-if="proposalFile">
          <span>Proposal: {{ proposalFile.name }}</span>
          <button class="btn-remove" @click="removeProposalFile">Remove</button>
        </div>
      </div>
  
      <button class="btn-send" @click="sendProposal" :disabled="!canSendProposal">
        Send quote
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
  
  const quoteFile = ref<File | null>(null)
  const proposalFile = ref<File | null>(null)
  const errorMessage = ref("")
  const projectQuoteItems = ref<ProjectQuoteItem[]>([])
  const quoteItemInput = ref<ProjectQuoteItem>({
    name: "",
    amount: 0,
    paymentType: "payment",
  })
  
  interface Props {
    project: Project
  }
  
  const props = defineProps<Props>()
  
  const totalAmount = computed(() => {
    return projectQuoteItems.value.reduce((total, item) => total + item.amount, 0)
  })
  
  const canSendProposal = computed(() => {
    return projectQuoteItems.value.length > 0 && quoteFile.value && proposalFile.value
  })
  
  function addQuoteItem() {
    if (!quoteItemInput.value.name || quoteItemInput.value.amount <= 0) {
      errorMessage.value = "Please fill in all fields with valid values."
      return
    }
  
    projectQuoteItems.value.push({ ...quoteItemInput.value })
    quoteItemInput.value = {
      name: "",
      amount: 0,
      paymentType: "payment",
    }
    errorMessage.value = ""
  }
  
  function removeQuoteItem(index: number) {
    projectQuoteItems.value.splice(index, 1)
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
  
  function removeQuoteFile() {
    quoteFile.value = null
  }
  
  function removeProposalFile() {
    proposalFile.value = null
  }
  
  async function sendProposal() {
    if (!canSendProposal.value) {
      errorMessage.value = "Please add at least one quote item and upload both quote and proposal PDFs."
      return
    }
  
    let quoteUrl: string
    let proposalUrl: string
  
    const $storage = useStorage()
  
    try {
      const quoteStorageRef = storageRef(
        $storage,
        `projects/${props.project.id}/${quoteFile.value!.name}`
      )
      await uploadBytes(quoteStorageRef, quoteFile.value!)
      quoteUrl = await getDownloadURL(quoteStorageRef)
  
      const proposalStorageRef = storageRef(
        $storage,
        `projects/${props.project.id}/${proposalFile.value!.name}`
      )
      await uploadBytes(proposalStorageRef, proposalFile.value!)
      proposalUrl = await getDownloadURL(proposalStorageRef)
  
      const quote: ProjectQuote = {
        items: projectQuoteItems.value,
        totalAmount: totalAmount.value,
        amountPaid: 0,
        quoteUrl: quoteUrl,
        proposalUrl: proposalUrl,
      }
  
      await $Projects.uploadQuote(props.project.id, quote)
      errorMessage.value = ""
      // Reset form after successful upload
      projectQuoteItems.value = []
      quoteFile.value = null
      proposalFile.value = null
    } catch (error) {
      console.error("Error uploading quote:", error)
      errorMessage.value = "An error occurred while sending the quote. Please try again."
    }
  }
  </script>
  
  <style lang="sass" scoped>
.generate-quote
    max-width: 90%
    margin: 0 auto
    padding: 2rem
    background-color: #f8f9fa
    border-radius: 8px
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
  
.section-title
    font-size: 1.5rem
    font-weight: 600
    margin-bottom: 1.5rem
    color: #333
  
.quote-form, .quote-items, .file-upload
    margin-bottom: 2rem
  
.form-group
    margin-bottom: 1rem
  
    label
      display: block
      margin-bottom: 0.5rem
      font-weight: 500
      color: #495057
  
    input, select
      width: 100%
      padding: 0.5rem
      border: 1px solid #ced4da
      border-radius: 4px
      font-size: 1rem
  
      &:focus
        outline: none
        border-color: #80bdff
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25)
  
.btn-add, .btn-send, .btn-remove
    padding: 0.5rem 1rem
    border: none
    border-radius: 4px
    font-size: 1rem
    font-weight: 500
    cursor: pointer
    transition: background-color 0.15s ease-in-out
  
.btn-add, .btn-send
    background-color: #007bff
    color: white
  
    &:hover
      background-color: #0056b3
  
    &:disabled
      background-color: #6c757d
      cursor: not-allowed
  
.btn-remove
    background-color: #dc3545
    color: white
  
    &:hover
      background-color: #c82333
  
.quote-items
    .item
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0.5rem
      background-color: #fff
      border: 1px solid #dee2e6
      border-radius: 4px
      margin-bottom: 0.5rem
  
    .item-details
      display: flex
      gap: 1rem
  
    .total
      margin-top: 1rem
      font-size: 1.1rem
      font-weight: 600
</style>