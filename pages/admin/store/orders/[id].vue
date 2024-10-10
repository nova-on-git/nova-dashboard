<template>
    <main class="admin-page">
        <mpage class="admin-mpage" v-if="order">
            <rflex class="admin-header">
                <header class="dashboard-header">
                    <breadcrumbs :links="links" />
                    <h1>Order Details</h1>
                </header>
                <cflex class="update-status-box">
                    <h4>Update Status</h4>
                    <rflex class="update-status-row">
                        <btn
                            :class="{ active: order.status === 'accepted' }"
                            @click="$Orders.updateStatus(order.id, 'accepted')"
                            class="update-status-button"
                            >Accept
                        </btn>
                        <btn
                            :class="{ active: order.status === 'shipped' }"
                            class="update-status-button"
                            @click="$Orders.updateStatus(order.id, 'shipped')"
                            >Shipped
                        </btn>
                        <btn
                            :class="{ active: order.status === 'delivered' }"
                            class="update-status-button"
                            @click="$Orders.updateStatus(order.id, 'delivered')"
                            >Delivered
                        </btn>
                        <btn
                            :class="{ active: order.status === 'cancelled' }"
                            class="update-status-button"
                            @click="$Orders.updateStatus(order.id, 'cancelled')"
                            >Cancel
                        </btn>
                    </rflex>
                </cflex>
            </rflex>

            <rflex class="details-row admin-box">
                <div class="">ID: #{{ order.id }}</div>
                <div class="">Contact: {{ order.contactNumber }}</div>
                <div class="">Customer: {{ order.shippingAddress.name }}</div>
                <div class="">Time: {{ order.timestamp }}</div>
                <div class="">Items: {{ order.items.length }}</div>
                <div class="">Total: £{{ order.subTotal / 100 }}</div>
                <rflex class="status-chip" :class="order.status">
                    <Icon :icon="getStatusIcon(order.status)" width="17" />
                    {{ order.status }}
                </rflex>
            </rflex>

            <rflex class="content-container">
                <cflex class="left-column">
                    <cflex class="admin-box items-container">
                        <h5><strong>Items</strong></h5>

                        <div class="item" v-for="item in order.items">
                            <rflex class="left-container">
                                <div class="image-container">
                                    <img :src="item.images[0].preview" />
                                </div>
                            </rflex>
                            <cflex class="item-details">
                                <div>
                                    <h4>{{ item.name }}</h4>
                                    <p>{{ item.description }}</p>
                                </div>
                            </cflex>
                        </div>

                        <rflex class="total-row">
                            <div><strong>Total</strong></div>
                            <rflex class="total-right">
                                <div>
                                    Items: {{ order.items.length }}, £{{
                                        order.subTotal / 100
                                    }}
                                </div>
                                <div>
                                    Shipping Paid: £{{
                                        order.shippingCost / 100
                                    }}
                                </div>
                                <div>£{{ order.subTotal / 100 }}</div>
                            </rflex>
                        </rflex>
                    </cflex>

                    <cflex class="admin-box notes-container">
                        <h5><strong>Notes</strong></h5>
                        <p v-if="order.notes">{{ order.notes }}</p>
                        <p v-else>Notes from the customer will show up here</p>
                    </cflex>
                </cflex>

                <cflex class="address-box right-column">
                    <div class="address-container admin-box">
                        <h5><strong>Shipping</strong></h5>
                        <div class="address-row">
                            <div class="label">Name:</div>
                            <div class="value">
                                {{ order.shippingAddress.name }}
                            </div>
                        </div>
                        <div class="address-row">
                            <div class="label">Address:</div>
                            <div class="value">
                                <div>{{ order.shippingAddress.street }}</div>
                                <div>{{ order.shippingAddress.city }}</div>
                                <div>{{ order.shippingAddress.postcode }}</div>
                                <div>{{ order.shippingAddress.county }}</div>
                                <div>{{ order.shippingAddress.country }}</div>
                            </div>
                        </div>
                        <div class="address-row">
                            <div class="label">Contact:</div>
                            <div class="value">{{ order.contactNumber }}</div>
                        </div>
                    </div>
                </cflex>
            </rflex>
        </mpage>
    </main>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
const route = useRoute();
const links = [
    { name: "admin", url: "/admin" },
    { name: "orders", url: "/admin/store/orders" },
    { name: `#${route.params.id}`, url: "" },
];
const order = computed<OrderObj | null>(() => {
    return $Orders.getOrderById(route.params.id as string);
});

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
});
</script>

<style lang="sass" scoped>

.admin-header
    align-items: end !important

.content-container
    gap: 25px
    width: 100%

    .left-column
        width: 100%

.items-container
    gap: 25px

    .item-details
        gap: 10px

.rflex
    align-items: start

.details-row
    margin-bottom: 20px
    background: white
    gap: 20px

    padding-block: 10px
    padding-inline: 25px
    border-radius: 5px

    div
        text-transform: capitalize
        border-right: 1px solid rgba( 0, 0, 0, 0.5)
        padding-right: 20px

        &:last-child
            border-right: none

.status
    margin-top: 5px
    text-transform: capitalize



.address-box
    width: 450px

.address-container
    text-transform: capitalize
    width: 100%
    display: flex
    flex-direction: column
    gap: 20px

.address-row
    display: flex
    align-items: flex-start
    gap: 10px

    .label
        font-weight: bold
        flex: 0 0 70px

    .value
        flex: 1

.total-row
    justify-content: space-between

    .rflex
        gap: 50px

.item
    display: flex
    align-items: start
    white-space: normal
    gap: 20px
    padding-bottom: 25px
    border-bottom: 1px solid rgba( 0, 0, 0, 0.1)
    justify-content: start

    h4
        font-size: 2rem
    .image-container
        max-width: 175px
        min-width: 175px

    .item-details
        flex-grow: 1
        align-items: space-between
        justify-content: space-between
        gap: 10px

        .rflex
            flex-grow: 1
            justify-content: space-between
            align-items: end
            gap: 50px

    .product-details
        text-align: right
        gap: 5px


.notes-container
    p
        opacity: 0.6
        font-size: 0.9rem
        margin-top: 10px


// Update status buttons
.update-status-box
    align-items: end

    h4
        font-size: 1.5rem
        margin-bottom: 5px
        font-weight: bold

.update-status-row
    flex-wrap: wrap
    gap: 10px
    justify-content: space-between
    margin-bottom: 40px
    .left
        flex-wrap: wrap
        gap: 10px
    .update-status-button
        border: none
        background: white
        padding: 5px 15px
        border-radius: 7px

        &.active
            background: #1a73e8
            color: white


// Status Icon

.status-chip
    gap: 3px
    padding: 3px 13px 3px 10px !important
    border-radius: 5px
    font-size: 0.75rem
    text-transform: capitalize

    &.pending
        background: lightblue

    &.accepted
        background: orange

    &.shipped
        background: lightcyan

    &.delivered
        background: lightgreen

    &.cancelled
        background: red, 20
</style>
