import { eventHandler } from "h3"
import { deleteDoc, doc } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.db

    if (!event.context.params || !event.context.params.orderId) {
        console.error("Missing or invalid params or orderId")
        return { error: "Missing or invalid params or orderId" }
    }

    const orderId = event.context.params.orderId

    const docRef = doc(db, "incomplete-orders", orderId)

    try {
        await deleteDoc(docRef)
        console.log("Order cancelled.")
    } catch (error) {
        console.error("Error adding document: ", error)
    }
})
