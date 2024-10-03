import { eventHandler, readBody } from "h3"
import { doc, getDoc, setDoc } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.db
    const { uid, email } = await readBody<{ uid: string; email: string }>(event)

    if (!uid) {
        console.error("User id not found")
    }

    const docRef = doc(db, "users", uid)
    try {
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            await setDoc(docRef, { role: "user", email: email })
            console.log("User successfully added!")
        }
    } catch (error) {
        console.error("Error adding document: ", error)
    }
})
