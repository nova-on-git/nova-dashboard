import axios from "axios"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { defineStore } from "pinia"

interface Notification {
    id?: string
    type: "store" | "order" | "blog"
    mode: "success" | "info" | "warning" | "danger"
    title: string
    message: string
    read: boolean
    style: {
        icon: string
        backgroundColor: string
    }
    action: {
        type: "link" | "button" | "none"
        url: string
    }
    timestamp: Date
}

export const useNotificationStore = defineStore("notifications", {
    state: () => ({
        notifications: [] as Notification[],
        storeIsInitialized: false,
        popUpActive: false,
    }),

    getters: {
        get(state) {
            return state.notifications
        },

        getUnread(state) {
            if (state.notifications.length != 0) {
                return state.notifications.filter((notification) => !notification.read)
            }
            return []
        },

        getRead(state) {
            if (state.notifications.length) {
                return state.notifications.filter((notification) => notification.read)
            }
            return []
        },

        unreadLength(state) {
            const unread = state.notifications.filter((notification) => !notification.read)
            return unread.length
        },

        isPopUpActive(state) {
            return state.popUpActive
        },
    },

    actions: {
        async init() {
            const nuxtApp = useNuxtApp()
            const $db = nuxtApp.$db

            await this.read()
            // Set up real-time listener
            const notificationsQuery = query(collection($db, "notifications"), orderBy("timestamp", "desc"))

            onSnapshot(
                notificationsQuery,
                (snapshot) => {
                    const notifications: Notification[] = []
                    snapshot.forEach((doc) => {
                        notifications.push({ id: doc.id, ...doc.data() } as Notification)
                    })
                    this.notifications = notifications
                },
                (error) => {
                    console.error("Error getting notifications: ", error)
                }
            )
            this.storeIsInitialized = true
        },

        async create(notification: Notification): Promise<void> {
            const style = this.getStyle(notification)

            const notificationWithStyle = { ...notification, style }
            try {
                await axios.post("/api/notifications", { notification: notificationWithStyle })
                this.notifications.push(notification)
            } catch (error) {
                console.error("Error creating notification", error)
            }
        },

        async read() {
            const response = await axios.get("http://localhost:3000/api/notifications")
            this.notifications = response.data
        },

        async createTest() {
            this.create(exampleNotification)
        },

        getStyle(notification: Notification) {
            let style = {
                icon: "",
                backgroundColor: "",
            }

            switch (notification.type) {
                case "store":
                    style["icon"] = "ic:baseline-store"
                    break
                case "order":
                    style["icon"] = "material-symbols:quick-reorder-outline"
                    break
                case "blog":
                    style["icon"] = "material-symbols:edit-outline"
                    break
            }

            switch (notification.mode) {
                case "danger":
                    style["backgroundColor"] = "#F7A1A1"
                    break
                case "success":
                    style["backgroundColor"] = "#A7C7E7"
                    break
                case "info":
                    style["backgroundColor"] = "#F7A1A1"
                    break
                case "warning":
                    style["backgroundColor"] = "#FEE4A1"
                    break
            }

            return style
        },

        togglePopUp() {
            this.popUpActive = !this.popUpActive
        },

        closePopUp() {
            this.popUpActive = false
        },
        openPopUp() {
            this.popUpActive = true
        },
    },
})

export const exampleNotification: Notification = {
    type: "store",
    mode: "success",
    title: "hello",
    style: {
        icon: "ic:baseline-store",
        backgroundColor: "#F7A1A1",
    },
    message: "you have a notification",
    read: false,
    action: {
        type: "button",
        url: "https://example.com/action",
    },
    timestamp: new Date(),
}
