import { addDoc, collection } from "firebase/firestore"

export default eventHandler(async (event) => {
    const db = event.context.db
    const { paymentRecord }: { paymentRecord: PaymentRecord } = await readBody(event)

    if (!paymentRecord) {
        throw createError({ statusCode: 400, statusMessage: "Payment record not recieved." })
    }

    const colRef = collection(db, "payments")

    try {
        await addDoc(colRef, paymentRecord)
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: `Error saving payment record ${error}`,
        })
    }
})
