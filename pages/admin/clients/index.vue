<template>
    <mpage class="admin-mpage">
        <ProjectList interface="staff" />

        <div class="action-buttons">
            <btn @click="$Projects.createDummy()" class="action-btn">Create Dummy Project</btn>
            <btn to="/admin/clients/chatroom" class="action-btn">Chatroom</btn>
            <btn
                preset="dark"
                @click="openModal('createProject')"
                class="action-btn create-project-btn"
                >Create Project</btn
            >
        </div>
    </mpage>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="scss" scoped></style>
