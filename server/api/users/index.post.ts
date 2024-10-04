import { eventHandler, readBody } from "h3"
import { doc, getDoc, setDoc } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.velorisDb
    const { uid, email, siteAccess } = await readBody<UserProfile>(event)

    if (!uid) {
        console.error("User id not found")
    }

    const docRef = doc(db, "users", uid)

    const userProfile = {
        email: email,
        siteAccess: siteAccess,
    }

    try {
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            await setDoc(docRef, userProfile)
            console.log("User successfully added!")
        }
    } catch (error) {
        console.error("Error adding document: ", error)
    }
})
