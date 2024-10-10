import { collection, getDocs } from "firebase/firestore";
import { eventHandler } from "h3";

export default eventHandler(async (event) => {
    const db = event.context.db;
    const params = event.context.params || {};
    const category = params.category as string;

    const itemsColRef = collection(db, `store/${category}/items`);
    const docSnap = await getDocs(itemsColRef);

    const items = docSnap.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        };
    });

    return items;
});
