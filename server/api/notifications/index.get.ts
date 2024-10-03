import { collection, getDocs } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.db

    const colRef = collection(db, "notifications")

    const snapShot = await getDocs(colRef)

    const notifications = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    return notifications
})
