<template>
    <main>
        <mpage>
            <rflex class="content-container">
                <cflex class="basket-items" v-if="basket">
                    <anchor
                        class="item"
                        :to="`/store/${item.id}`"
                        v-for="item in basket"
                    >
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
                            <rflex>
                                <div>
                                    <strong>Size:</strong> {{ item.height }}cm x
                                    {{ item.width }}cm
                                </div>
                                <div>
                                    <strong>£{{ item.price }}</strong>
                                </div>
                            </rflex>
                        </cflex>
                    </anchor>

                    <h6 v-if="basket.length == 0">
                        <strong>Items in your basket will show up here.</strong>
                    </h6>
                    <rflex class="total-row" v-if="basket.length != 0">
                        <div><strong>Subtotal</strong></div>
                        <div>
                            <strong>£{{ basketSubTotal / 100 }}</strong>
                        </div>
                    </rflex>
                </cflex>

                <form @submit.prevent="startCheckout" class="right-column">
                    <div class="nova-form">
                        <h5><strong>Address</strong></h5>

                        <cflex class="input-container">
                            <label for="name">Full Name</label>
                            <input
                                v-model="addressData.name"
                                class="nova-input"
                                type="text"
                                name="name"
                                required
                            />
                        </cflex>

                        <cflex class="input-container">
                            <label for="postcode">Postcode</label>
                            <input
                                v-model="addressData.postcode"
                                class="nova-input"
                                type="text"
                                name="postcode"
                            />
                        </cflex>

                        <cflex class="input-container">
                            <label for="street-name">Street Name</label>
                            <input
                                v-model="addressData.street"
                                class="nova-input"
                                type="text"
                                name="street-name"
                            />
                        </cflex>

                        <cflex class="input-container">
                            <label for="city">City</label>
                            <input
                                v-model="addressData.city"
                                class="nova-input"
                                type="text"
                                name="city"
                            />
                        </cflex>

                        <cflex class="input-container">
                            <label for="city">County/ Province</label>
                            <input
                                v-model="addressData.county"
                                class="nova-input"
                                type="text"
                                name="county"
                            />
                        </cflex>

                        <cflex class="input-container">
                            <label for="city">Country</label>
                            <input
                                v-model="addressData.country"
                                class="nova-input"
                                type="text"
                                name="Country"
                            />
                        </cflex>

                        <cflex class="input-container">
                            <label for="number">Contact Number</label>
                            <input
                                v-model="addressData.contactNumber"
                                class="nova-input"
                                type="text"
                                name="number"
                            />
                        </cflex>

                        <cflex class="input-container">
                            <label for="notes">Delivery Notes</label>
                            <textarea
                                v-model="notes"
                                class="nova-input"
                                rows="5"
                                type="text"
                                name="notes"
                            />
                        </cflex>
                    </div>

                    <cflex class="nova-form price-summary">
                        <h5><strong>Summary</strong></h5>

                        <rflex>
                            <div>Subtotal</div>
                            <div>£{{ basketSubTotal / 100 }}</div>
                        </rflex>

                        <rflex>
                            <div>Delivery</div>
                            <div>£{{ deliveryPrice / 100 }}</div>
                        </rflex>

                        <rflex>
                            <div>Total</div>
                            <div>£{{ basketTotal / 100 }}</div>
                        </rflex>
                    </cflex>

                    <btn class="darkgrey-button checkout-button" type="submit"
                        >Checkout</btn
                    >
                </form>
            </rflex>
        </mpage>
    </main>
</template>

<script setup lang="ts">
// const $Basket = use$Basket()

const basket = ref();
const basketSubTotal = ref<number>(0);
const deliveryPrice = ref<number>(2000);
const basketTotal = ref<number>(0);

const notes = ref("");
const addressData = ref<Address>({
    name: "Random Name Johnson",
    postcode: "RGB6YZ",
    city: "Manchester",
    street: "Milk Street",
    country: "England",
    county: "Buckinghamshire",
});

onMounted(async () => {
    $Basket.read();
    basket.value = $Basket.get;
    basketSubTotal.value = $Basket.getBasketTotal;
    basketTotal.value =
        Number(basketSubTotal.value) + Number(deliveryPrice.value);
});

async function startCheckout() {
    await stripeCheckout(100000, "testitem", {});
}
</script>

<style lang="sass" scoped>
main
    background: #f8f4f4

.content-container
    align-items: start
    gap: 50px
    padding-top: 50px

.basket-items
    flex-grow: 1
    gap: 25px
    background: white
    padding: 25px
    border-radius: 1px
    box-shadow: 0 1px 3px #00000026

    .total-row
        justify-content: space-between

.price-summary
    gap: 10px
    .rflex
        justify-content: space-between

.item
    display: flex
    align-items: stretch
    white-space: normal
    gap: 40px
    padding-bottom: 25px
    border-bottom: 1px solid rgba( 0, 0, 0, 0.1)
    justify-content: start
    height: 100%

    .image-container
        padding: 10px
        border: 7px solid black
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

.right-column
    display: flex
    flex-direction: column
    gap: 25px


.rflex
    align-items: start

.nova-form
    h5
        margin-bottom: 15px
    input
        padding: 10px 10px !important
        margin-bottom: 15px !important
        min-height: 0px !important
    label
        margin-bottom: 3px

.checkout-button
    display: flex
    justify-content: center
    font-size: 1.2rem
</style>
