<template>
    <main class="admin-page">
        <mpage>
            <header class="dashboard-header">
                <h1>Galleries</h1>
            </header>
        </mpage>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped></style>
