import { doc, getDoc } from "firebase/firestore"
import { eventHandler, getQuery } from "h3"

export default eventHandler(async (event) => {
    const db = event.context.velorisDb;

    const query = getQuery(event);
    const uid = query.uid as string;
    const domain = event.node.req.headers.host
    const hostname = domain?.split(":")[0]

    if (!uid) {
        console.error("Document ID not provided");
        throw createError({ statusCode: 400, statusMessage: "uid required" });
    }

    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        // Check if the document exists
        if (!docSnap.exists()) {
            throw createError({ statusCode: 404, statusMessage: "Document not found" })
        }

        const userObj = docSnap.data() as UserObj

        if (!userObj.siteAccess) return "user"
        const roleEntry = userObj.siteAccess.find((site: SiteAccess) => site.domain === hostname)

        if (!roleEntry) return "user"
        return roleEntry.role

    } catch (error) {
        console.error("Error fetching document: ", error);
        throw createError({ statusCode: 500, statusMessage: `${error}` });
    }
});