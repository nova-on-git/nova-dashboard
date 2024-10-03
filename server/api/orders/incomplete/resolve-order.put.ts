import { eventHandler, readBody } from "h3"
import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.db
    const body = await readBody(event)
    const { orderId } = body

    if (!orderId || typeof orderId !== "string") {
        console.error("Invalid orderId:", orderId)
        return { error: "Invalid orderId" }
    }

    const docRef = doc(db, "incomplete-orders", orderId)

    let orderData

    try {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            orderData = docSnap.data()
        } else {
            console.log("No such document!")
            return null
        }
    } catch (error) {
        console.error("Error getting document:", error)
    }

    const colRef = collection(db, "orders")

    try {
        await addDoc(colRef, orderData)
        await deleteDoc(docRef)
    } catch (error) {
        console.error("Error adding document: ", error)
    }
})
