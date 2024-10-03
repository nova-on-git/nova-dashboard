import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { eventHandler, getQuery } from "h3"

export default eventHandler(async (event) => {
    const db = event.context.db

    const query = getQuery(event)
    const uid = query.uid as string

    if (!uid) {
        console.error("Document ID not provided")
        return { error: "Document ID is required" }
    }

    try {
        const docRef = doc(db, "users", uid)

        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            }
        } else {
            return { error: "Document not found" }
        }
    } catch (error) {
        console.error("Error fetching document: ", error)
        return { error: "Error fetching document" }
    }
})
