import { eventHandler, readBody } from "h3"
import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore"
import axios from "axios"

export default eventHandler(async (event) => {
    const origin = event.node.req.headers["origin"]
    const db = event.context.db
    const { orderId } = await readBody(event)

    if (!orderId || typeof orderId !== "string") {
        throw createError({ statusCode: 500, statusMessage: "orderId is not found or is not typeof string." })
    }

    const docRef = doc(db, "incomplete-orders", orderId)

    let orderData

    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        orderData = docSnap.data()
    } else {
        throw createError({ statusCode: 500, statusMessage: "Incomplete order document not found." })
    }

    const colRef = collection(db, "orders")

    try {
        await addDoc(colRef, orderData)
        await deleteDoc(docRef)

        const notification: CreateNotification = {
            type: "order",
            mode: "success",
            title: "You have received an order!",
            message: "",
            action: {
                type: "link",
                url: `${origin}/admin/store/orders/${orderId}`,
            },
        }

        await axios.post(`${origin}/api/notifications`, { notification })
    } catch (error) {
        console.log(error)
        throw createError({ statusCode: 500, statusMessage: "Error adding order document:" })
    }
})
