<template>
    <main>
        <pre>
            // Project details page

            <CalendlyEmbed v-if="project.action === 'meeting'"/>
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
