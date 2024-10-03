import { getFirestore, doc, deleteDoc } from "firebase/firestore"
import { eventHandler } from "h3"
import { initializeApp } from "firebase/app"

export default eventHandler(async (event) => {
    const db = event.context.db
    const itemId = event.context.params.itemId

    if (!itemId) {
        console.log("Item id is missing")
    }

    console.log(itemId)
    const docRef = doc(db, "store/default/items", itemId)

    try {
        await deleteDoc(docRef)

        console.log("success")
    } catch (error) {
        console.error("Error deleting document:", error)
    }
})
