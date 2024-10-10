<template>
    <main>

        <pre>
            This is the client log in to the veloris site
            Here they will manage projects, make payments etc.

            Requirements
            1. Need to see the phases of development
                Discovery (finding out the client requirements)
                Design
                Developement
                Final Changes
                Testing
                Launch

            2. Accept meetings and schedule new ones.
            3. Select a payment plan.
            4. View invoices and charges. (Domain, custom email etc.)
            5. Message and share files.
            6. See finished projects with links to their live site.
        </pre>

        <anchor
            v-for="project in $Projects.getByEmail('codypwakeford@gmail.com')"
            :to="`/admin/projects/${project.id}`"
        >
            {{ project.name }}
        </anchor>

        <pre>
            {{ $Projects.getByEmail("codypwakeford@gmail.com") }}
        </pre>

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