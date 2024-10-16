<template>
    <main class="container">
        <header class="header">
            <h1>Projects</h1>
        </header>

        <div class="project-grid">
            <div v-for="project in projects" :key="project.id" class="project-card">
                <h3>{{ project.name }}</h3>
                <p><strong>Phase:</strong> {{ project.phase }}</p>
                <p><strong>Action:</strong> {{ project.action }}</p>
                <p v-if="project.meeting">
                    <strong>Next Meeting:</strong> {{ formatDate(project.meeting.startTime) }}
                </p>
                <p v-if="project.quote">
                    <strong>Total Amount:</strong> ${{ (project.quote.totalAmount / 100).toFixed(2) }}
                </p>
                <btn :to="`/admin/clients/${project.id}`">View Details</btn>
            </div>
        </div>


        <div class="actions">
            <modal id="createProject">
                <form @submit.prevent="$Projects.create(projectDetails)">
                    <label for="name">Project Name:</label>
                    <input type="text" name="name" v-model="projectDetails.name" />

                    <label for="emails">Emails:</label>
                    <input type="text" name="emails" v-model="projectDetails.emails" />

                    <btn type="submit">Create Project</btn>
                </form>
            </modal>
        <div  class="buttons">
            <btn @click="$Projects.createDummy()">Create Dummy Project</btn>
            <btn to="/admin/clients/chatroom">Chatroom</btn>
            <btn preset="dark" @click="openModal('createProject')">Create Project</btn>
        </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { computed, ref, Ref } from 'vue'

const projects = computed(() => {
    return $Projects.get
})

const projectDetails: Ref<Omit<Project, "id">> = ref({
    name: "",
    emails: [""],
    phase: "onboarding",
    action: "none",
    paymentPlan: "noneSelected",
})

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
}

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped>
.container
    padding: 2rem
    overflow: auto
    width: 100%

.header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 2rem

.project-grid
    display: grid
    grid-template-columns: repeat(3, 1fr)  // Default to 3 columns
    gap: 2rem

    @media (max-width: 768px)  // Medium screens (md)
        grid-template-columns: repeat(2, 1fr)  // Change to 2 columns

    @media (max-width: 576px)  // Small screens (sm)
        grid-template-columns: 1fr  // Change to 1 column

.project-card
    background-color: #f5f5f5
    border-radius: 8px
    padding: 1.5rem
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)

    h3
        margin-top: 0
        margin-bottom: 1rem

    p
        margin-bottom: 0.5rem

    btn
        margin-top: 1rem

.actions
    margin-top: 2rem
    display: flex
    gap: 1rem

.buttons
    display: flex
    gap: 2rem

</style>
