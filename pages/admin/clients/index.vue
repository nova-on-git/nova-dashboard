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

        </pre>
        <btn @click="$Projects.createDummy()">Create dummy project</btn>
    </main>
</template>

<script setup lang="ts">

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth"
})

</script>

<style lang='sass' scoped>

</style>