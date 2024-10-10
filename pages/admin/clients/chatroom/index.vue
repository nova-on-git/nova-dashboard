<template>
    <main>
        <pre>
            TODO

            Add multiple client chat rooms
            add instant messaging
            add document support
            add notifacations

        </pre>
        <!-- <btn @click="activeChatroomId = project.id" v-for="project in $Projects.get"
            >{{ project.name }} Chatroom</btn
        > -->

        <!-- <pre>{{ $Chatroom.get }}</pre> -->
    </main>
</template>

<script setup lang="ts">
import { $Chatroom } from "~/composables/pinia"

const activeChatroomId = ref("")
definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped></style>
