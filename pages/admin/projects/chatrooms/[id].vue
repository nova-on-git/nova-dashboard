<template>
    <main>
        A live chat where documents can be shared
        <Chatroom :chatroomId="projectId" />
    </main>
</template>

<script setup lang="ts">
const route = useRoute()
const projectId = route.params.id as string

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped></style>
