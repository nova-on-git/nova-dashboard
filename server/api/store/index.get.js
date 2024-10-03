import { getDocs, collectionGroup } from "firebase/firestore"
import { eventHandler } from "h3"

export default eventHandler(async (event) => {
    const db = event.context.db

    const itemsColGroupRef = collectionGroup(db, "items")
    const querySnapshot = await getDocs(itemsColGroupRef)

    const categories = {}

    querySnapshot.docs.forEach((doc) => {
        const category = doc.ref.parent.parent.id
        const item = {
            id: doc.id,
            ...doc.data(),
        }

        if (!categories[category]) {
            categories[category] = []
        }

        categories[category].push(item)
    })

    return categories
})
