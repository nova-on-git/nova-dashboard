export {}

declare global {
    interface AppNotification {
        id: string
        title: string
        type: "store" | "order" | "blog"
        mode: "success" | "info" | "warning" | "danger"
        message: string
        read: boolean
        style: {
            icon: string
            backgroundColor: string
        }
        action: {
            type: "link" | "none"
            url?: string
        }
        timestamp: Date
    }

    interface CreateNotification extends Omit<AppNotification, "read" | "id" | "style" | "action" | "timestamp"> {
        read?: boolean
        action?: {
            type?: "link" | "none"
            url?: string
        }
        style?: {
            icon: string
            backgroundColor: string
        }
        timestamp?: Date
    }
}
