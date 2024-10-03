<template>
    <main>
        <mpage v-if="order">
            <cflex>
                <mheader>
                    <Icon icon="teenyicons:tick-circle-outline" width="60" color="lightgreen" />
                    <div>
                        <h4>Thank you</h4>
                        <h4>Your order has been received.</h4>
                    </div>
                    <p>Your order will be with you shortly!</p>
                </mheader>

                <div class="order-details">
                    <lheader>
                        <h5>Order Details</h5>
                        <cflex class="order-details-grid" v-if="order">
                            <rflex>
                                <div>Order ID:</div>
                                <div>#{{ order.items[0].id }}</div>
                            </rflex>

                            <rflex>
                                <div>Order Date:</div>
                                <div>{{ order.timestamp }}</div>
                            </rflex>
                            <rflex>
                                <div>Payment:</div>
                                <div>Card</div>
                            </rflex>
                        </cflex>

                        <cflex class="total-details">
                            <rflex class="total-row">
                                <h6>Sub Total</h6>
                                <div>£{{ order.subTotal / 100 }}</div>
                            </rflex>
                            <rflex class="total-row">
                                <h6>Shipping Cost</h6>
                                <div>£{{ order.shipping / 100 }}</div>
                            </rflex>
                            <rflex class="total-row">
                                <h6>Total</h6>
                                <div>£{{ order.total / 100 }}</div>
                            </rflex>
                        </cflex>
                    </lheader>
                </div>

                <cflex v-if="order" class="order-items">
                    <h5>Products</h5>

                    <cflex class="items">
                        <div class="products-grid" v-for="item in order.items">
                            <rflex class="product-image-name">
                                <div class="image-container">
                                    <img :src="item.images[0].preview" alt="" />
                                </div>
                                <h5>{{ item.name }}</h5>
                            </rflex>
                            <cflex class="product-details">
                                <div>£{{ item.price }}</div>
                                <div>{{ item.height }} x {{ item.width }} cm</div>
                            </cflex>
                        </div>
                    </cflex>
                </cflex>

                <cflex class="customer-details">
                    <h5>Shipping Address</h5>

                    <div>{{ order.address.name }}</div>
                    <div>{{ order.address.street }}</div>
                    <div>{{ order.address.postcode }}</div>
                    <div>{{ order.address.city }}</div>
                    <div>{{ order.address.county }}</div>
                    <div>{{ order.address.country }}</div>
                </cflex>
            </cflex>
        </mpage>
    </main>
</template>

<script setup>
import { Icon } from "@iconify/vue"
// const $Orders = use$Orders()
const order = ref()
onMounted(() => {
    order.value = JSON.parse(localStorage.getItem("orderObj"))
    console.log(order.value)
    $Orders.create(order.value)
})
</script>

<style lang="sass" scoped>
.mpage
    max-width: 1000px
main
    background: #f8f4f4
    height: auto

.mheader
    margin-block: 100px
    gap: 10px

    h4
        margin-top: 5px
    p
        font-size: 0.9rem
        opacity: 0.6

.total-details
    width: 100%
    gap: 10px

    .total-row
        justify-content: space-between
        width: 100%
.lheader
.items
    gap: 25px
    .products-grid
        display: grid
        grid-template-columns: auto auto
        width: 100%
        justify-content: space-between

        .product-image-name
            align-items: start
            gap: 25px

            .image-container
                padding: 10px
                background: white
                border: 7px solid black

                img
                    width: 100px

        .product-details
            text-align: right
            gap: 5px

.order-details
    background: white
    padding: 25px
    box-shadow: 0 1px 3px #00000026

.order-details-grid
    margin-top: 25px
    gap: 15px
    width: 100%
    grid-template-columns: auto auto
    justify-content: space-between
    padding-bottom: 25px
    margin-bottom: 25px
    border-bottom: 1px dashed grey

    .rflex
        justify-content: space-between

.order-items
    margin-top: 50px
    h5
        font-weight: bold
        margin-bottom: 15px

.customer-details
    gap: 5px
    margin-bottom: 50px

    h5
        margin-top: 50px
        font-weight: bold
        margin-bottom: 15px
</style>
