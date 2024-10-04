import { collection, doc, updateDoc } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.db
    const { id, read } = await readBody(event)

    const colRef = collection(db, "notifications")
    const docRef = doc(colRef, id)

    try {
        await updateDoc(docRef, { read: read })
    } catch (error) {
        console.error(error)
    }
})
