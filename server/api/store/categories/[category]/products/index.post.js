import { eventHandler, readBody } from "h3"
import { collection, addDoc, doc } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.db

    const category = event.context.params.category
    const body = await readBody(event)
    body["category"] = category

    const categoryDocRef = doc(db, `store`, category)

    const itemsColRef = collection(categoryDocRef, "items")

    try {
        await addDoc(itemsColRef, body)
        console.log("Document successfully added!")
    } catch (error) {
        console.error("Error adding document: ", error)
    }
})
