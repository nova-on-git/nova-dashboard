import { eventHandler } from "h3"
import { initializeApp } from "firebase/app"
import { doc, getFirestore, updateDoc } from "firebase/firestore"

// Edit file by id
export default eventHandler(async (event) => {
    const category = event.context.params.category
    const docId = event.context.params.id

    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        projectId: process.env.FIREBASE_PROJECT_ID,
    }

    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)

    if (!docId) console.log("No docId!")

    const docRef = doc(db, `store/${category}/items`, docId)

    try {
        await updateDoc(docRef, { visibility: "sold" })

        console.log("Updated item to ")
    } catch (error) {
        console.error("Error replacing document:", error)
    }
})
