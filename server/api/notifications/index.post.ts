import { addDoc, collection } from "firebase/firestore"
import { readBody } from "h3"

export default defineEventHandler(async (event) => {
    const db = event.context.db

    const { notification } = await readBody(event)

    if (!notification) {
        console.error("No notification found!")
    }

    const colRef = collection(db, "notifications")

    try {
        await addDoc(colRef, notification)
        console.log("Notification document added successfully")
    } catch (error) {
        console.error("Error adding notification document", error)
    }
})
