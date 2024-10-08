import { doc, getDoc } from "firebase/firestore"
import { eventHandler, getQuery } from "h3"

export default eventHandler(async (event): Promise<UserProfile["siteAccess"]> => {
    const db = event.context.velorisDb

    const query = getQuery(event)
    const uid = query.uid as UserProfile["uid"]

    if (!uid) {
        console.error("Document ID not provided")
        throw createError({ statusCode: 400, statusMessage: "uid required" })
    }

    try {
        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            throw createError({ statusCode: 404, statusMessage: "Document not found" })
        }

        const userObj = docSnap.data() as UserProfile
        return userObj.siteAccess || []

    } catch (error) {
        console.error("Error fetching document: ", error)
        throw createError({ statusCode: 500, statusMessage: `${error}` })
    }
});