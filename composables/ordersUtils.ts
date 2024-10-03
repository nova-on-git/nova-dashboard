export function formatDate(timestamp: Date) {
    const date = new Date(timestamp)

    if (isNaN(date.getTime())) {
        console.error("Invalid date object")
        return ""
    }

    // Customize the options as needed
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit", // Use 'long' for full month name
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Set to true for 12-hour format
    }

    return date.toLocaleString(undefined, options)
}

export function getStatusIcon(orderStatus: OrderStatus) {
    switch (orderStatus) {
        case "pending":
            return "material-symbols:av-timer"

        case "accepted":
            return "hugeicons:tick-01"

        case "shipped":
            return "material-symbols:local-shipping-outline"

        case "delivered":
            return "material-symbols:home-work-outline"

        case "cancelled":
            return "material-symbols:cancel-outline"

        default:
            return ""
    }
}
