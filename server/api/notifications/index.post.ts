import { addDoc, collection, doc } from "firebase/firestore"
import { readBody } from "h3"

export default defineEventHandler(async (event) => {
    const db = event.context.db

    const { notification, userIds }: { notification: CreateNotification; userIds: string[] } =
        await readBody(event)

    if (!notification) throw createError({ statusCode: 400 })

    const style = getStyle(notification)
    notification.timestamp = new Date().toISOString()
    notification.read = false
    notification.style = style

    if (!notification.action) {
        notification.action = {
            type: "none",
        }
    }

    const usersColRef = collection(db, "users")

    for (const userId of userIds) {
        const userDocRef = doc(usersColRef, userId)
        const userNotificationColRef = collection(userDocRef, "notifications")

        try {
            await addDoc(userNotificationColRef, notification)
        } catch (error: any) {
            throw createError({
                statusCode: 500,
                statusMessage: `Error adding notification for user ${userId}: ${error.message}`,
            })
        }
    }
})

function getStyle(notification: CreateNotification) {
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
}
