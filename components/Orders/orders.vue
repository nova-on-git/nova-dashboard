<template>
    <div class="orders-page">
        <div class="filter-orders-row">
            <div class="filter-buttons">
                <button
                    v-for="status in ['All', 'Pending', 'Accepted', 'Shipped', 'Delivered', 'Cancelled']"
                    :key="status"
                    @click="selectedFilter = status.toLowerCase()"
                    :class="{ active: selectedFilter === status.toLowerCase() }"
                    class="filter-orders-button"
                >
                    {{ status }}
                </button>
            </div>
            <div class="search-container">
                <search v-model="searchQuery" class="search-input" placeholder="Search orders" />
            </div>
        </div>

        <div class="orders-grid">
            <div class="order-card" v-for="order in orders" :key="order.id">
                <div class="order-header">
                    <div class="order-initials" :style="{ backgroundColor: getRandomColor(order.id) }">
                        {{ order.shippingAddress.postcode.slice(0, 3) }}
                    </div>
                    <div class="order-info">
                        <div class="order-name">{{ order.shippingAddress.name }}</div>
                        <div class="order-id">#{{ order.id }}</div>
                    </div>
                    <div class="order-status" :class="order.status.toLowerCase()">
                        <Icon :icon="getStatusIcon(order.status)" width="16" />
                        {{ order.status }}
                    </div>
                </div>
                <div class="order-timestamp">
                    <Icon icon="mdi:clock-outline" width="16" />
                    {{ formatDate(order.timestamp) }}
                </div>
                <table class="order-items">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in order.items.slice(0, 4)" :key="index">
                            <td>{{ item.name }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>£{{ (item.price / 100).toFixed(2) }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="more-items" v-if="order.items.length > 4">+ {{ order.items.length - 4 }} more item(s)</div>
                <div class="order-total">
                    <span>Total:</span>
                    <span class="total-amount">£{{ (order.subTotal / 100).toFixed(2) }}</span>
                </div>
                <div class="order-actions">
                    <button class="update-status" @click="openUpdateStatusModal(order)">
                        <Icon icon="mdi:pencil" width="16" />
                        Update Status
                    </button>
                    <button class="view-details" @click="viewOrderDetails(order.id)">
                        <Icon icon="mdi:eye" width="16" />
                        View Details
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { Icon } from "@iconify/vue"

const searchQuery = ref("")
const selectedFilter = ref<OrderStatusFilter>("all")

const orders = computed(() => {
    if (searchQuery.value === "") return $Orders.filterByStatus(selectedFilter.value)
    return $Orders.search(searchQuery.value)
})

const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

const getStatusIcon = (status: string) => {
    const icons = {
        pending: "mdi:clock-outline",
        accepted: "mdi:check-circle-outline",
        shipped: "mdi:truck-delivery-outline",
        delivered: "mdi:package-variant-closed-check",
        cancelled: "mdi:close-circle-outline",
    }
    return icons[status.toLowerCase()] || "mdi:help-circle-outline"
}

const getRandomColor = (id: string) => {
    const colors = ["#4285F4", "#34A853", "#FBBC05", "#EA4335", "#46BDC6", "#9334E6", "#0F9D58"]
    const index = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
    return colors[index]
}

const openUpdateStatusModal = (order: any) => {
    // Implement status update modal logic
    console.log("Open update status modal for order:", order.id)
}

const viewOrderDetails = (orderId: string) => {
    // Implement navigation to order details page
    console.log("Navigate to order details:", orderId)
    navigateTo(`/admin/store/orders/${orderId}`)
}
</script>

<style lang="scss" scoped>
.page-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #202124;
}

.filter-orders-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
}

.filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.filter-orders-button {
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    color: #5f6368;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #f1f3f4;
    }

    &.active {
        background: #c4d8f3;
        color: #2c5ad7;
        font-weight: 600;
    }
}

.search-input {
    border: 1px solid #dadce0;
    border-radius: 20px;
    font-size: 14px;
    width: 250px;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: #1a73e8;
        box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
    }
}

.orders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
}

.order-card {
    background: white;
    border-radius: 8px;
    box-shadow:
        0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
    padding: 16px;
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow:
            0 1px 3px 0 rgba(60, 64, 67, 0.3),
            0 4px 8px 3px rgba(60, 64, 67, 0.15);
    }
}

.order-header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.order-initials {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    font-size: 18px;
    margin-right: 12px;
}

.order-info {
    flex-grow: 1;
}

.order-name {
    font-weight: 500;
    font-size: 16px;
    color: #202124;
}

.order-id {
    font-size: 14px;
    color: #5f6368;
}

.order-status {
    font-size: 12px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 4px;

    &.pending {
        background: #e8f0fe;
        color: #1a73e8;
    }

    &.accepted {
        background: #fef7e0;
        color: #f9ab00;
    }

    &.shipped {
        background: #e6f4ea;
        color: #1e8e3e;
    }

    &.delivered {
        background: #e6f4ea;
        color: #1e8e3e;
    }

    &.cancelled {
        background: #fce8e6;
        color: #d93025;
    }
}

.order-timestamp {
    font-size: 14px;
    color: #5f6368;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 16px;
}

.order-items {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;

    th,
    td {
        text-align: left;
        padding: 8px 0;
        font-size: 14px;
    }

    th {
        color: #5f6368;
        font-weight: normal;
    }

    td {
        color: #202124;
    }
}

.more-items {
    font-size: 14px;
    color: #5f6368;
    margin-top: 8px;
}

.order-total {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 500;
    color: #202124;
    margin-top: 16px;
    margin-bottom: 16px;
}

.total-amount {
    color: #1a73e8;
}

.order-actions {
    display: flex;
    justify-content: space-between;
    gap: 8px;

    button {
        flex: 1;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .update-status {
        background: #f1f3f4;
        color: #5f6368;
        border: none;

        &:hover {
            background: #e8eaed;
        }
    }

    .view-details {
        background: #1a73e8;
        color: white;
        border: none;

        &:hover {
            background: #1765cc;
        }
    }
}

@media (max-width: 600px) {
    .filter-orders-row {
        flex-direction: column;
        align-items: stretch;
    }

    .search-input {
        width: 100%;
    }

    .order-actions {
        flex-direction: column;
    }
}
</style>
