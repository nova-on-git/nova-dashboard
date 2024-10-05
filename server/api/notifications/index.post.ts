import { addDoc, collection } from "firebase/firestore"
import { readBody } from "h3"

export default defineEventHandler(async (event) => {
    const db = event.context.db

    const { notification }: { notification: CreateNotification } = await readBody(event)

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

    const colRef = collection(db, "notifications")

    try {
        await addDoc(colRef, notification)
        console.log("Notification document added successfully")
    } catch (error) {
        throw createError({
            statusCode: 500,
        })
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
