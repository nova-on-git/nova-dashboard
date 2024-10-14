<template>
    <main class="admin-page">
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
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped>
.anchor
    color: blue
</style>
