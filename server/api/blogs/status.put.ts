import { doc, updateDoc } from "firebase/firestore";

export default eventHandler(async (event) => {
    const db = event.context.db;

    const { id, newStatus } = await readBody(event);

    const docRef = doc(db, "blogs", id);

    try {
        await updateDoc(docRef, { status: newStatus });
    } catch (error) {
        console.log(error);
    }
});
