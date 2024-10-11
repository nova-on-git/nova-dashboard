<template>
    <section class="chatroom-container">
        <div class="messages-container" ref="messagesContainer">
            <div v-if="messages" class="messages">
                <div v-for="msg in messages" :key="msg.id" class="message">
                    <strong>{{ msg.sender }}:</strong> 
                    <span v-if="msg.message">{{ msg.message }}</span>
                    <a v-if="msg.fileUrl" :href="msg.fileUrl" target="_blank" class="file-link">
                        📎 {{ msg.fileName }}
                    </a>
                </div>
            </div>
        </div>

        <div class="input-container">
            <form @submit.prevent="$Chatroom.sendMessage(chatroomId, message)" class="message-form">
                <input 
                    v-model="message.message" 
                    type="text" 
                    placeholder="Type a message..."
                    class="message-input"
                />
                <div class="buttons">
                    <btn type="submit">Send</btn>
                    
                    <label class="file-input-label">
                        <input
                            type="file"
                            @change="handleFileSelect"
                            class="file-input"
                        />
                        <btn type="button">Add Document</btn>
                    </label>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getDownloadURL, uploadBytes } from "firebase/storage"

interface Props {
    chatroomId: string
}

const props = defineProps<Props>()
const messagesContainer = ref<HTMLElement | null>(null)
const messages = ref(null)

const message = ref({
    message: "",
    sender: $CurrentUser.displayName || $CurrentUser.email,
})

// Watch for new messages and scroll to bottom
watch(() => props.chatroomId, async () => {
    messages.value = await $Chatroom.getChatroomMessages(props.chatroomId)
    scrollToBottom()
}, { immediate: true })

// Watch messages for changes
watch(() => messages.value, () => {
    scrollToBottom()
}, { deep: true })

function scrollToBottom() {
    setTimeout(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
    }, 100)
}

function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
        fileInput.value = input.files[0]
        addDocument()
    }
}

async function addDocument() {
    if (!fileInput.value) return

    const $storage = useVelorisStorage()
    const storageRef = ref($storage, `${props.chatroomId}/files/${fileInput.value.name}`)
    try {
        await uploadBytes(storageRef, fileInput.value)
        const url = await getDownloadURL(storageRef)
        
        // Send message with file
        await $Chatroom.sendMessage(props.chatroomId, {
            ...message.value,
            fileUrl: url,
            fileName: fileInput.value.name
        })

        // Reset file input
        fileInput.value = {}
    } catch (error) {
        console.error('Error uploading document:', error)
    }
}
</script>

<style lang="scss" scoped>
.chatroom-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 400px;
    max-height: calc(100vh - 200px);
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
}

.messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    margin-bottom: 1rem;
}

.messages {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.message {
    padding: 0.5rem;
    border-radius: 0.25rem;
    background: #f8fafc;
    word-break: break-word;

    strong {
        color: #3b82f6;
        margin-right: 0.5rem;
    }
}

.input-container {
    padding: 1rem;
    border-top: 1px solid #e2e8f0;
    background: white;
}

.message-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.message-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
}

.buttons {
    display: flex;
    gap: 0.5rem;
}

.file-input-label {
    cursor: pointer;
}

.file-input {
    display: none;
}

.file-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: #3b82f6;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}
</style>