<template>
    <main class="admin-page">
        <mpage class="admin-mpage">
            <form @submit.prevent="createItem">
                <rflex class="admin-header">
                    <header class="dashboard-header">
                        <breadcrumbs :links="links" />
                        <h1>Add a product</h1>
                    </header>

                    <rflex class="action-buttons">
                        <btn type="button" class="grey-button" modal="discard">
                            DISCARD
                            <Icon icon="ri:delete-bin-5-line" width="20" />
                        </btn>
                        <btn :loading="savingChanges" type="submit" class="darkgrey-button">
                            SAVE CHANGES
                            <Icon icon="material-symbols:storefront-outline-rounded" width="20" />
                            <loader color="white" width="20px" />
                        </btn>
                    </rflex>
                </rflex>

                <rflex class="admin-container">
                    <AddItemImageInputs v-model="images" />
                    <AddItemForm v-model="formData" />
                </rflex>
            </form>
        </mpage>

        <AddItemDiscardModal />

        <pre>{{ formData }}</pre>
    </main>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
import type { FirebaseStorage } from "firebase/storage"

const images = ref<ProductImage[]>([])
const formData = ref<Product | {}>({})
const modalRef = ref<HTMLDivElement | null>(null)

const links = [
    { name: "admin", url: "/admin" },
    { name: "store", url: "/admin/store" },
    { name: "add item", url: "" },
]

const $storage = useStorage()

// const $Products = use$Products()
const savingChanges = ref(false)

function resetPage() {
    if (modalRef.value) {
        modalRef.value.close()
        images.value = []
    }
}

async function createItem() {
    if (!formData.value) return
    savingChanges.value = true

    const processedImages = []

    for (const imageObj of images.value) {
        const processedImage = await processImage($storage, imageObj)
        processedImages.push(processedImage)
    }

    const newformData = {
        ...formData.value,
        images: processedImages,
    }
    await $Products.create("default", newformData)
    await $Products.read(true)

    savingChanges.value = false
    navigateTo("/admin")
}

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})

onMounted(() => {
    $Products.read
})
</script>

<style lang="sass" scoped>
main
    height: auto

.admin-container
    align-items: start

#discard
    .modal-top-row
        justify-content: space-between
        margin-bottom: 25px
.action-buttons
    gap: 10px

.red-button, .darkgrey-button, .grey-button
    padding: 4px 15px
    display: flex
    align-items: center
    gap: 10px
    border-radius: 2px
</style>
