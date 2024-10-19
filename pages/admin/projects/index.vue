<template></template>

<script setup lang="ts">
const projects = computed(() => {
    return $Projects.getByEmail($CurrentUser.email)
})
</script>

<style scoped lang="scss"></style>
