<template>
    <main>
        <pre>
            This is where we will manage client projects.

            1. Create and manage projects
            2. Invite link for client (or email invite)
            3. Invite link will allow them to create a veloris account linked to the new project.
            4. Ask them a few questions 
                Domain?
                Web Hosting?
                Custom Email?

            5. Allow us to schedule meetings

            // Settings

            We will need to add settings for our rates, payment plans and so on.


            #Requirements

            1. CRUD client projects.
            2. Use chatroom with client.
            3. Make project quote and send contract.
            4. Ask for client to book meeting (through embeded calender).
            5. Automatic notifications.
        </pre>

        <cflex>
            <h5>Projects</h5>

            <anchor v-for="project in $Projects.get" :to="`/admin/clients/${project.id}`">{{
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
    </main>
</template>

<script setup lang="ts">
const projectDetails: Ref<Omit<Project, "id" | "action">> = ref({
    name: "",
    emails: [""],
    phase: "onboarding",
})

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped></style>
