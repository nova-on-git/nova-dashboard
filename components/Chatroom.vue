<template>
    <section class="chatroom-container">
      <div class="messages-container" ref="messagesContainer">
        <div v-if="loading" class="loading-state">
          <p>Loading messages...</p>
        </div>
        <div v-else-if="messages.length > 0" class="messages">
          <div v-for="msg in messages" :key="msg.id" class="message" :class="{ 
            'own-message': msg.sender === $CurrentUser.displayName || msg.sender === $CurrentUser.email,
            'loading': msg.loading,
            'error': msg.error
          }">
            <div class="message-content">
              <strong>{{ msg.sender }}:</strong> 
              <span v-if="msg.message">{{ msg.message }}</span>
              <a v-if="msg.fileUrl" :href="msg.fileUrl" target="_blank" class="file-link">
                📎 {{ msg.fileName }}
              </a>
            </div>
            <div v-if="msg.loading" class="message-status">Sending...</div>
            <div v-else-if="msg.error" class="message-status error">Failed to send. Tap to retry.</div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>No messages yet. Start the conversation!</p>
        </div>
      </div>
  
      <div class="input-container">
        <form @submit.prevent="sendMessage" class="message-form">
          <div class="input-wrapper">
            <input 
              v-model="newMessage" 
              type="text" 
              placeholder="Type a message..."
              class="message-input"
              :disabled="sending"
            />
            <label class="file-input-label">
              <input
                type="file"
                @change="handleFileSelect"
                class="file-input"
                :disabled="sending"
              />
              <span class="file-button">📎</span>
            </label>
          </div>
          <button type="submit" class="send-button" :disabled="sending">
            {{ sending ? 'Sending...' : 'Send' }}
          </button>
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
  const messages = ref<any[]>([])
  const newMessage = ref("")
  const fileInput = ref<File | null>(null)
  const loading = ref(true)
  const sending = ref(false)
  
  // Watch for new messages and scroll to bottom
  watch(() => props.chatroomId, async () => {
    loading.value = true
    try {
      messages.value = await $Chatroom.getChatroomMessages(props.chatroomId)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      loading.value = false
      scrollToBottom()
    }
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
    }
  }
  
  async function sendMessage() {
    if ((!newMessage.value && !fileInput.value) || sending.value) return
  
    sending.value = true
  
    const messageData = {
      message: newMessage.value,
      sender: $CurrentUser.displayName || $CurrentUser.email,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(), // Temporary ID
      loading: true,
      error: false
    }
  
    // Optimistically add message to UI
    messages.value.push(messageData)
  
    try {
      if (fileInput.value) {
        await addDocument(messageData)
      } else {
        await $Chatroom.sendMessage(props.chatroomId, messageData)
      }
      // Update message status
      const index = messages.value.findIndex(msg => msg.id === messageData.id)
      if (index !== -1) {
        messages.value[index] = { ...messages.value[index], loading: false, error: false }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Update message status to error
      const index = messages.value.findIndex(msg => msg.id === messageData.id)
      if (index !== -1) {
        messages.value[index] = { ...messages.value[index], loading: false, error: true }
      }
    } finally {
      // Clear input
      newMessage.value = ""
      fileInput.value = null
      sending.value = false
    }
  }
  
  async function addDocument(messageData: any) {
    if (!fileInput.value) return
  
    const $storage = useVelorisStorage()
    const storageRef = ref($storage, `${props.chatroomId}/files/${fileInput.value.name}`)
    try {
      await uploadBytes(storageRef, fileInput.value)
      const url = await getDownloadURL(storageRef)
      
      // Update message with file info
      messageData.fileUrl = url
      messageData.fileName = fileInput.value.name
  
      // Send message with file
      await $Chatroom.sendMessage(props.chatroomId, messageData)
    } catch (error) {
      console.error('Error uploading document:', error)
      throw error
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .chatroom-container {
    display: flex;
    width: 70rem;
    flex-direction: column;
    height: 100%;
    min-height: 400px;
    max-height: calc(100vh - 200px);
    background: #ffffff;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
  
  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    scroll-behavior: smooth;
  }
  
  .messages {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .message {
    max-width: 80%;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    background: #f3f4f6;
    word-break: break-word;
  
    &.own-message {
      align-self: flex-end;
      background: #e0f2fe;
  
      strong {
        color: #0369a1;
      }
    }
  
    &.loading {
      opacity: 0.7;
    }
  
    &.error {
      border: 1px solid #ef4444;
    }
  
    strong {
      color: #4b5563;
      margin-right: 0.5rem;
    }
  }
  
  .message-status {
    font-size: 0.75rem;
    margin-top: 0.25rem;
    color: #6b7280;
  
    &.error {
      color: #ef4444;
    }
  }
  
  .input-container {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background: #ffffff;
  }
  
  .message-form {
    display: flex;
    gap: 0.5rem;
  }
  
  .input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    background: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    padding: 0.25rem 0.5rem;
  }
  
  .message-input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 0.875rem;
    padding: 0.5rem;
  
    &:focus {
      outline: none;
    }
  
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .file-input-label {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  .file-input {
    display: none;
  }
  
  .file-button {
    font-size: 1.25rem;
    padding: 0.25rem;
  }
  
  .send-button {
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s;
  
    &:hover:not(:disabled) {
      background-color: #2563eb;
    }
  
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
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
  
  .empty-state, .loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #9ca3af;
    font-style: italic;
  }
  </style>