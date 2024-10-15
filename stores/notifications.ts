import { collection, doc, Firestore, onSnapshot, orderBy, query } from "firebase/firestore"
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
            await this.read()
            const nuxtApp = useNuxtApp()
            const $db = nuxtApp.$velorisDb as Firestore

            const usersColRef = collection($db, "users")
            const userDocRef = doc(usersColRef, $CurrentUser.uid)

            const notificationsQuery = query(
                collection(userDocRef, "notifications"),
                orderBy("timestamp", "desc")
            )

            // Set up real-time listener
            onSnapshot(
                notificationsQuery,
                (snapshot) => {
                    const notifications: AppNotification[] = []
                    snapshot.forEach((doc) => {
                        notifications.push({
                            id: doc.id,
                            ...doc.data(),
                        } as AppNotification)
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
            await useFetch("/api/notifications", {
                method: "POST",
                body: { notification, userIds: [$CurrentUser.uid] },
            })
        },

        async read() {
            const { data } = await useFetch<AppNotification[]>(
                `/api/notifications/${$CurrentUser.uid}`
            )

            if (data.value) {
                this.notifications = data.value
            }
        },

        async markAsRead(notificationId: AppNotification["id"], read: boolean) {
            await useFetch("/api/notifications/read", {
                method: "PUT",
                body: { notificationId, read, userId: $CurrentUser.uid },
            })
        },

        /** Dev Only - Create a random notification */
        async createDummy() {
            const randomIndex = Math.floor(Math.random() * exampleNotifications.length)
            this.create(exampleNotifications[randomIndex])
        },
    },
})

export const exampleNotifications: CreateNotification[] = [
    {
        type: "store",
        mode: "success",
        title: "hello",
        message: "you have a notification",
    },
    {
        type: "store",
        mode: "danger",
        title: "hello",
        message: "you have a notification",
    },
    {
        type: "store",
        mode: "info",
        title: "hello",
        message: "you have a notification",
    },
    {
        type: "store",
        mode: "warning",
        title: "hello",
        message: "you have a notification",
    },
    {
        type: "order",
        mode: "success",
        title: "hello",
        message: "you have a notification",
    },
    {
        type: "order",
        mode: "danger",
        title: "hello",
        message: "you have a notification",
    },
    {
        type: "order",
        mode: "info",
        title: "hello",
        message: "you have a notification",
    },
    {
        type: "order",
        mode: "warning",
        title: "hello",
        message: "you have a notification",
    },
    {
        type: "blog",
        mode: "success",
        title: "hello",
        message: "you have a notification",
    },
    {
        type: "blog",
        mode: "danger",
        title: "hello",
        message: "you have a notification",
    },
    {
        type: "blog",
        mode: "info",
        title: "hello",
        message: "you have a notification",
    },
    {
        type: "blog",
        mode: "warning",
        title: "hello",
        message: "you have a notification",
    },
]
