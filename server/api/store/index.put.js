import { eventHandler, readBody } from "h3"
import { doc, setDoc } from "firebase/firestore"

// Edit file by id
export default eventHandler(async (event) => {
    const db = event.context.db
    const body = await readBody(event)
    const docId = body.id

    // Clone the object and remove the id field
    const { id, ...newDocData } = body

    if (!docId) console.log("No docId!")

    const docRef = doc(db, "orders", docId)

    console.log("Updating", docId)
    try {
        // Use the new data without the id field
        await setDoc(docRef, newDocData)

        console.log("Updated")
    } catch (error) {
        console.error("Error replacing document:", error)
    }
})
