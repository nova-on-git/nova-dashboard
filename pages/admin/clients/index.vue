<template>
    <main>
        <cflex>
            <h5>Projects</h5>

            <anchor v-for="project in projects" :to="`/admin/clients/${project.id}`">{{
                project.name
            }}</anchor>
        </cflex>

        <btn preset="dark" @click="openModal('createProject')">Create Project</btn>

        <modal id="createProject">
            <form @submit.prevent="$Projects.create(projectDetails)">
                <label for="Name">Project Name:</label>
                <input type="text" name="name" v-model="projectDetails.name" />

                <label for="Name">Emails:</label>
                <input type="text" name="emails" v-model="projectDetails.emails" />

                <!-- TODO: make this send an email to everyone in the email list. -->
                <btn type="submit">Create Project</btn>
            </form>
        </modal>

        <btn @click="$Projects.createDummy()">Create dummy project</btn>
        <btn to="/admin/clients/chatroom">Chatroom</btn>

        <pre>{{ projects }}</pre>
    </main>
</template>

<script setup lang="ts">
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

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped></style>
