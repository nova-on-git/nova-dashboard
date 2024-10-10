import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { defineStore } from "pinia"

export const useChatroomStore = defineStore("chatrooms", {
    state: () => ({
        chatrooms: [] as Chatroom[],
    }),

    getters: {
        get(state) {
            return state.chatrooms
        },

        getChatroomMessages: (state) => (chatroomId: string) => {
            const chatroom = state.chatrooms
        },

        getChatroomNames(state) {
            return state.chatrooms.map((chatroom) => {
                return chatroom.projectId
            })
        },
    },

    actions: {
        async init() {
            // this.readChatrooms()
        },

        async readChatrooms() {
            const { data: idsData } = useFetch("/api/projects/ids")
            const chatroomIds = idsData.value

            console.log(chatroomIds)
            console.log("here")
            let chatrooms = [] as Chatroom[]

            for (let id in chatroomIds) {
                let chatroom = {
                    projectId: id,
                    messages: [],
                } as Chatroom

                const { data } = useFetch("/api/chatrooms/messages")
                chatroom.messages = data.value || []

                chatrooms.push(chatroom)
            }

            this.chatrooms = chatrooms
        },

        async readChatroomMessages(projectId: string) {
            const { data } = await useFetch("/api/chatrooms/messages")

            return data.value
        },

        async sendMessage(projectId: string, message: Omit<Message, "id" | "timestamp">) {
            await useFetch("/api/chatrooms/message", {
                method: "POST",
                body: {
                    id: projectId,
                    message: message,
                },
            })
        },

        async sendDocument(projectId: string, document: string) {
            await useFetch("/api/chatrooms/document", {
                method: "POST",
                body: {
                    id: projectId,
                    message: document,
                },
            })
        },
    },
})
