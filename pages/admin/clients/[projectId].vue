<template>
    <main>
        <pre>
            This is where the project control will take place.
        </pre>

        <pre>{{ project }}</pre>

        <btn
            @click="
                $Projects.updateStatus(project.id, $Projects.getNextProjectPhase(project.phase))
            "
            >Go to next stage</btn
        >

        <btn>Request {{ project.phase }} meeting.</btn>
        <btn @click="$Projects.requestMeeting(project.id)">Request General Meeting</btn>
        <btn @click="$Projects.delete(project.id)">Delete Project</btn>

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

        <btn preset="dark" @click="sendProposal">Send quote</btn>
    </main>
</template>

<script setup lang="ts">
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { getFirestore, doc, setDoc } from "firebase/firestore"

const route = useRoute()
const projectId = route.params.projectId as string
const project = $Projects.getProjectById(projectId)

const quoteFile = ref<File | null>(null)
const proposalFile = ref<File | null>(null)

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})

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

    const quoteStorageRef = storageRef($storage, `projects/${project.id}/${quoteFile.value.name}`)
    await uploadBytes(quoteStorageRef, quoteFile.value)
    quoteUrl = await getDownloadURL(quoteStorageRef)

    const proposalStorageRef = storageRef(
        $storage,
        `projects/${project.id}/${proposalFile.value.name}`
    )
    await uploadBytes(proposalStorageRef, proposalFile.value)
    proposalUrl = await getDownloadURL(proposalStorageRef)

    if (!quoteUrl || !proposalUrl) return

    $Projects.uploadQuote(project.id, quoteUrl, proposalUrl, 10000)
}
</script>

<style lang="sass" scoped></style>
