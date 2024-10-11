<template>
    <main class="admin-page">
        <pre>
            // Project details page

            <!-- <CalendlyEmbed v-if="project.action === 'meeting'"/> -->
             <btn :to="`/admin/projects/chatrooms/${project.id}`">Project Chatroom</btn>
        </pre>

        <pre>
            {{ project }}
        </pre>
    </main>
</template>

<script setup lang="ts">
const route = useRoute()
const projectId = route.params.id as string
const project = $Projects.getProjectById(projectId)

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped></style>
