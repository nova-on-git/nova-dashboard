import { eventHandler, readBody } from "h3"
import { addDoc, collection } from "firebase/firestore"
export default eventHandler(async (event) => {
    const db = event.context.db
    const body = await readBody(event)

    const colRef = collection(db, "orders")

    try {
        await addDoc(colRef, body)
        console.log("Document successfully added!")
    } catch (error) {
        console.error("Error adding document: ", error)
    }
})
