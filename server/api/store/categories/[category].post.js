import { eventHandler } from "h3"
import { collection, setDoc, doc, addDoc } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.db
    const category = event.context.params.category

    try {
        const colRef = collection(db, "store")
        const docRef = doc(colRef, category)
        await setDoc(docRef, {})

        const itemsCollectionRef = collection(docRef, "items")

        await addDoc(itemsCollectionRef, {})

        console.log("Category successfully added!")
    } catch (error) {
        console.error("Error adding document: ", error)
    }
})
