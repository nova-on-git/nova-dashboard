export {}
declare global {
    type OrderStatus = "pending" | "accepted" | "shipped" | "delivered" | "cancelled"
    type OrderStatusFilter = OrderStatus | "all"
    type OrderWithoutId = Omit<Order, "id">

    interface OrderObj {
        id: string
        category: "default" | string

        items: Product[] | []

        currency: "gbp" | "usd"
        status: OrderStatus
        paymentMethod: "card"

        deliveryDate?: Date
        timestamp: Date

        /** For store owner to add once an item is shipped */
        trackingId?: string

        /** Items, tax, and delivery total in pence */
        totalAmount: number

        /** Items cost without other fees in pence*/
        subTotal: number

        /** Tax cost in pence */
        taxAmount?: number

        /** Amount for deliver in pence */
        shippingCost: number

        notes?: string
        contactNumber: string

        billingAddress?: Address
        shippingAddress: Address
    }
}
