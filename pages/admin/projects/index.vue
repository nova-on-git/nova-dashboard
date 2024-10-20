<template>
    <mpage class="admin-mpage">
        <ProjectList interface="client" />
    </mpage>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style scoped lang="scss"></style>
