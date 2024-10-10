import { collection, doc, getDocs } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.velorisDb
    const { id } = await readBody(event)

    const projectsColRef = collection(db, "projects")
    const docRef = doc(projectsColRef, id)
    const messagesColRef = collection(docRef, "chatroom-messages")
    const snapshot = await getDocs(messagesColRef)

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))
})
