import axios from "axios"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { defineStore } from "pinia"

export const useNotificationStore = defineStore("notifications", {
    state: () => ({
        notifications: [] as AppNotification[],
        storeIsInitialized: false,
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
    },

    actions: {
        async init() {
            const $db = useDb()

            await this.read()
            const notificationsQuery = query(collection($db, "notifications"), orderBy("timestamp", "desc"))

            // Set up real-time listener
            onSnapshot(
                notificationsQuery,
                (snapshot) => {
                    const notifications: AppNotification[] = []
                    snapshot.forEach((doc) => {
                        notifications.push({ id: doc.id, ...doc.data() } as AppNotification)
                    })
                    this.notifications = notifications
                },
                (error) => {
                    console.error("Error getting notifications: ", error)
                }
            )
            this.storeIsInitialized = true
        },

        async create(notification: CreateNotification) {
            const style = this.getStyle(notification)

            notification.timestamp = new Date()
            notification.read = false

            if (!notification.action) {
                notification.action = {
                    type: "none",
                }
            }

            const notificationWithStyle = { ...notification, style }

            try {
                await axios.post("/api/notifications", { notification: notificationWithStyle })
                // this.notifications.push(notification)
            } catch (error) {
                console.error("Error creating notification", error)
            }
        },

        async read() {
            const { data, error } = await useFetch("/api/notifications")

            if (error.value) {
                console.error("Failed to fetch notifications:", error.value)
                return
            }

            if (data.value) {
                this.notifications = data.value
            }
        },

        async markAsRead(id: AppNotification["id"], read: boolean) {
            const { data, error } = await useFetch("/api/notifications/read", {
                method: "PUT",
                body: { id, read },
            })

            if (error.value) {
                console.error("Failed to change notification read state:", error.value)
            }
        },

        /** Dev Only - Create a random notification */
        async createDummy() {
            const randomIndex = Math.floor(Math.random() * exampleNotifications.length)
            this.create(exampleNotifications[randomIndex])
        },

        getStyle(notification: CreateNotification) {
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
    },
})

export const exampleNotifications: CreateNotification[] = [
    {
        type: "store",
        mode: "success",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
    {
        type: "store",
        mode: "danger",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
    {
        type: "store",
        mode: "info",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
    {
        type: "store",
        mode: "warning",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
    {
        type: "order",
        mode: "success",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
    {
        type: "order",
        mode: "danger",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
    {
        type: "order",
        mode: "info",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
    {
        type: "order",
        mode: "warning",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
    {
        type: "blog",
        mode: "success",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
    {
        type: "blog",
        mode: "danger",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
    {
        type: "blog",
        mode: "info",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
    {
        type: "blog",
        mode: "warning",
        title: "hello",
        message: "you have a notification",
        timestamp: new Date(),
    },
]
