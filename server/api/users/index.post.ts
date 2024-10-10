import { eventHandler, readBody } from "h3";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default eventHandler(async (event) => {
    const db = event.context.velorisDb;
    const { uid, email, domain } = await readBody<{
        uid: UserProfile["uid"];
        email: UserProfile["email"];
        domain: string;
    }>(event);

    if (!uid || !email || !domain) throw createError({ statusCode: 400 });

    const docRef = doc(db, "users", uid);

    const data = {
        email: email,
        siteAccess: [{ domain: domain, role: "user" }],
    };

    try {
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            await setDoc(docRef, data);
        }
    } catch (error) {
        console.error("Error adding document: ", error);
        throw createError({
            statusCode: 500,
            statusMessage: `POST: /api/users: ${error}`,
        });
    }
});
