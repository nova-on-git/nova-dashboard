<template>
    <ProjectList interface="client" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style scoped lang="scss"></style>
