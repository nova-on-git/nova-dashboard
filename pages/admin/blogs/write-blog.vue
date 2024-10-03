<template>
    <main class="admin-page">
        <BlogsEditorPage v-model="blog" :editing="false" />
    </main>
</template>

<script setup lang="ts">
const blog = ref({})

definePageMeta({
    layout: "dashboard",
    auth: "admin-auth",
})
</script>
