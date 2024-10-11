import { collection, doc, getDocs } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.velorisDb
    const id = event.context.params?.id

    console.log("HERERERERER")
    const projectsColRef = collection(db, "projects")
    const projectDocRef = doc(projectsColRef, id)
    const messagesColRef = collection(projectDocRef, "messages")

    try {
        const snapshot = await getDocs(messagesColRef)
        const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))

        console.log(messages)
        return messages
    } catch (error) {
        throw createError({ statusCode: 500, statusMessage: `Error getting messages: ${error}` })
    }
})
