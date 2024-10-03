import { eventHandler, readBody } from "h3"

import { doc, updateDoc } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.db
    const body = await readBody(event)

    const { id, newStatus } = body
    if (!id || !newStatus) {
        return {
            status: 400,
            body: "Missing docId or newStatus in the request body",
        }
    }

    const docRef = doc(db, "orders", id)

    try {
        await updateDoc(docRef, { status: newStatus })

        return {
            status: 200,
            body: "Document updated successfully",
        }
    } catch (error) {
        console.error("Error updating document:", error)
        return {
            status: 500,
            body: "Failed to update document",
        }
    }
})
