import { eventHandler, readBody } from "h3";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

// Edit file by id
export default eventHandler(async (event) => {
    const body = await readBody(event);
    const docId = body.id;
    const category = event.context.params.category;

    const { id, ...newDocData } = body;

    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        projectId: process.env.FIREBASE_PROJECT_ID,
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    if (!docId) console.log("No docId!");

    const docRef = doc(db, `store/${category}/items`, docId);

    console.log("Updating", docId);
    try {
        // Use the new data without the id field
        await setDoc(docRef, newDocData);

        console.log("Updated");
    } catch (error) {
        console.error("Error replacing document:", error);
    }
});
