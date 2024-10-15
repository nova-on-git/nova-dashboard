import { collection, doc, getDocs } from "firebase/firestore"

export default eventHandler(async (event): Promise<AppNotification[]> => {
    const db = event.context.velorisDb
    const { id }: { id: string } = await readBody(event)

    const usersColRef = collection(db, "users")
    const userDocRef = doc(usersColRef, id)
    const userNotificationColRef = collection(userDocRef, "notifications")

    const snapShot = await getDocs(userNotificationColRef)

    const notifications = snapShot.docs.map(
        (doc) =>
            ({
                id: doc.id,
                ...doc.data(),
            }) as AppNotification
    )

    return notifications
})
