import { collection, doc, deleteDoc } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.db
    const id = event.context.params?.id

    if (!id) return "404 Document ID not found"

    const colRef = collection(db, "blogs")
    const docRef = doc(colRef, id)

    try {
        await deleteDoc(docRef)
    } catch (error) {
        console.error(error)
        return 500
    }
})
