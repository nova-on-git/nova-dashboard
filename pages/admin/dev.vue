<template>
    <mpage class="admin-page">
        <header class="dashboard-header">
            <h1>Dev Panel</h1>
        </header>

        <rflex class="action-buttons">
            <btn
                preset="dark"
                @click="
                    $Payment.createPayment(
                        'stripe',
                        10000,
                        'Test Item',
                        testOrderObject,
                    )
                "
                >Simulate checkout</btn
            >
            <btn preset="dark" @click="$Orders.createDummy()"
                >Add order to db</btn
            >
            <btn preset="dark" @click="$Notifications.createDummy()"
                >Create notification</btn
            >
        </rflex>

        <rflex>
            <btn preset="dark" @click="generateAdminLink()">admin link</btn>
            <btn preset="dark">Dev link</btn>
        </rflex>

        <rflex>
            <btn preset="dark" @click="$Analytics.refresh()"
                >Refresh Analytics</btn
            >
        </rflex>
    </mpage>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
});

function generateAdminLink() {}
</script>

<style lang="sass" scoped>
.rflex
    margin-bottom: 50px
    gap: 25px
.action-buttons
    gap: 10px


    .btn
        width: min-content
        white-space: nowrap
.order-crud
    background: white
    margin: 50px
</style>
