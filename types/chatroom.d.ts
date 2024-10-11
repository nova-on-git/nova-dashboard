export {}

declare global {
    interface Chatroom {
        projectId: string
        // documents: Documents[]
        messages: Message[] | []
    }

    interface Message {
        id: string
        message: string
        sender: string
        timestamp: Date
    }
}
