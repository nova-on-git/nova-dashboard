<template>
    <main class="admin-page">
        <VelorisClientsNav />

        <mpage class="admin-mpage">
            <Chatroom />
        </mpage>
    </main>
</template>

<script setup lang="ts">
const route = useRoute()
const projectId = route.params.id as string

const project = computed(() => {
    return $Projects.getProjectById(projectId)
})
definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped></style>
