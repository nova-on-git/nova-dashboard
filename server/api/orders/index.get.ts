import { eventHandler } from "h3"
import { collection, getDocs, query, orderBy } from "firebase/firestore"

export default eventHandler(async (event) => {
    try {
        const db = event.context.db

        const ordersCol = collection(db, "orders")
        const ordersQuery = query(ordersCol, orderBy("timestamp", "desc"))
        const ordersSnap = await getDocs(ordersQuery)
    
        const orders = ordersSnap.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        })
        return orders
    
    } catch (error) {
        throw createError({ statusCode: 500, statusMessage: `Error: ${error}` })      
    }
    
})
