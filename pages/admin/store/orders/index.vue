<template>
    <main class="admin-page">
        <mpage class="admin-mpage">
            <rflex class="admin-header">
                <header class="dashboard-header">
                    <breadcrumbs :links="links" />
                    <h1>Orders</h1>
                </header>

                <div class="right"></div>
            </rflex>

            <Orders />
            <div class="no-orders" v-if="!$Orders.get.length">
                You currently have no active orders
            </div>
        </mpage>
        <DashboardFooter />
    </main>
</template>

<script setup lang="ts">
const links = [
    { name: "admin", url: "/admin" },
    { name: "orders", url: "" },
];

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
});
</script>

<style lang="sass" scoped>

.no-orders
    margin-top: 25px

.admin-box
    padding: 0

.filter-container
    display: flex
    align-items: center
    gap: 10px
    margin-bottom: 20px

select
    padding: 8px
    border: 1px solid #ddd
    font-size: 16px
.order
    cursor: pointer
.orders-table
    width: 100%
    border-collapse: collapse

    th, td
        padding: 10px
        text-align: left
        border-bottom: 1px solid #ddd

    th
        background-color: #f4f4f4
        font-weight: bold

    tr:hover
        background-color: #f1f1f1
</style>
