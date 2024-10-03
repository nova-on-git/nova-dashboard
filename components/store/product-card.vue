<template>
    <div class="product">

        <anchor class="product">
            <div class="main-image product-img" v-if="product.images && product.images.length">
                <img :src="getImageUrl(product.images[0].fullSize)" :alt="product.name">
            </div>
            <div class="main-image product-img no-image" v-else>
                <span>No image provided</span>
            </div>
            
            <cflex class="product-info">
                <rflex class="top-product-info">
                    <h5>{{ product.name }}</h5>
                </rflex>
            </cflex>
            
            <rflex class="product-controls">
                <anchor :to="`/admin/store/products/${product.id}`">
                    <btn class="grey-button" modal="discard">
                        EDIT
                        <Icon icon='material-symbols:edit-outline' width='20' />
                    </btn>
                </anchor>

                <btn preset="danger" modal="delete" @click="productToDelete = product.id">
                    REMOVE
                    <aft><Icon icon='ri:delete-bin-5-line' width='20' /></aft>
                </btn>
            </rflex>
        </anchor>  
        
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
const props = defineProps<{
    product: Product
}>()

function getImageUrl(imageUrl: string) {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl
    }
    return `${import.meta.env.VITE_APP_BASE_URL || ''}${imageUrl}`
}
</script>

<style lang='sass' scoped>
.product
    flex: 1 1 calc(25% - 40px)
    max-width: 300px
    display: flex
    align-items: start
    flex-direction: column
    background: white
    padding: 10px
    border-radius: 5px

.product-img
    position: relative

    img
        width: 100%
        height: auto
        object-fit: cover

    &.no-image
        background: #f0f0f0
        color: #888
        font-style: italic

    .sold-tag
        position: absolute
        bottom: 15px
        right: 10px
        width: 55px

.product-info
    margin-top: 10px

    h5
        font-size: 1.4rem
        font-weight: 600

.product-controls 
    display: flex
    gap: 10px
    margin-top: 10px
</style>