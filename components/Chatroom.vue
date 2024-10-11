<template>
    <section>
        <pre>{{ $Chatroom.getChatroomMessages(chatroomId) }}</pre>

        <form @submit.prevent="$Chatroom.sendMessage(chatroomId, message)">
            <input v-model="message.message" type="text" />
            <btn>Send</btn>

            <btn @click="addDocument">Add Document</btn>
        </form>
    </section>
</template>

<script setup lang="ts">
import { getDownloadURL, uploadBytes } from "firebase/storage"
const fileInput = ref<File>({})

interface Props {
    chatroomId: string
}

const props = defineProps<Props>()
const message = ref({
    message: "",
    sender: $CurrentUser.displayName || $CurrentUser.email,
})

async function addDocument() {
    const $storage = useVelorisStorage()
    const storageRef = ref($storage, `${props.chatroomId}/files/${fileInput.value.name}`)
    try {
        await uploadBytes(storageRef, fileInput.value)
        const url = getDownloadURL(storageRef)
    } catch (error) {}
}
</script>

<style lang="sass" scoped></style>
