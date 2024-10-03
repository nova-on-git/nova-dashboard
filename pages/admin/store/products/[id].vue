<template>
    <main class="admin-page">
        <modal id="discard" ref="modalRef">
            <cflex class="discard-modal admin-box">
                <rflex class="modal-top-row">
                    <h6>Are you sure?</h6>
                    <btn @click="modalRef.close()"><Icon icon="material-symbols:close-rounded" width="25" /></btn>
                </rflex>

                <rflex>
                    <button class="red-button" @click="resetPage">
                        DISCARD
                        <Icon icon="ri:delete-bin-5-line" width="20" />
                    </button>

                    <button class="darkgrey-button" @click="modalRef.close()">
                        KEEP MY PRODUCT
                        <Icon icon="icon-park-outline:ad-product" width="20" />
                    </button>
                </rflex>
            </cflex>
        </modal>

        <mpage class="admin-mpage">
            <form @submit.prevent="updateItem">
                <rflex class="admin-header">
                    <header class="dashboard-header">
                        <breadcrumbs :links="links" />
                        <h1>$Dashboard</h1>
                    </header>

                    <rflex class="action-buttons">
                        <btn type="button" class="grey-button" toggle="discard">
                            DISCARD
                            <Icon icon="ri:delete-bin-5-line" width="20" />
                        </btn>
                        <btn type="submit" class="darkgrey-button" :loading="savingChanges">
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
    </main>
</template>

<script setup>
import { Icon } from "@iconify/vue"
const route = useRoute()
// const $Products = use$Products()
const savedChanges = ref(false)
const savingChanges = ref(false)
const images = ref([])
const modalRef = ref(null)
const formData = ref({})

onMounted(async () => {
    await $Products.read()
    const productId = route.params.id
    formData.value = $Products.getProductById(productId)
    initImages()
    setTimeout(() => {
        watchFormData()
    }, 100)
})

function watchFormData() {
    watch(
        formData,
        () => {
            savedChanges.value = false
        },
        { deep: true }
    )

    watch(
        images,
        () => {
            savedChanges.value = false
        },
        { deep: true }
    )
}

function initImages() {
    for (const index in formData.value.images) {
        const imageObj = {
            file: {},
            localUrl: "",
            preview: formData.value.images[index].preview,
            fullSize: formData.value.images[index].fullSize,
        }

        images.value.push(imageObj)
    }
}

async function updateItem() {
    savingChanges.value = true

    let newImages = []
    // Get images if needed.
    for (const imageObj of formData.value["images"]) {
        console.log("doing", imageObj)
        let imageObject = {
            preview: "",
            fullSize: "",
        }

        if (imageObj.preview) {
            imageObject["preview"] = imageObj.preview
        } else {
            const previewUrl = await saveFileToStorage(imageObj.file, true)
            imageObject["preview"] = previewUrl
        }

        if (imageObj.fullSize) {
            imageObject["fullSize"] = imageObj["fullSize"]
        } else {
            const fullSizeUrl = await saveFileToStorage(imageObj.file, false)
            imageObject["fullSize"] = fullSizeUrl
        }
        newImages.push(imageObject)
    }
    formData.value["images"] = newImages

    await $Products.update("default", formData.value)
    await $Products.read(true)
    savedChanges.value = true
    savingChanges.value = false
    navigateTo("/admin")
}

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped>


.admin-container
    align-items: start

.item-details
    width: 450px
    max-width: 450px
    gap: 15px

    h5
        font-weight: bold
        margin-bottom: 10px

button
    padding: 8px 20px
    border-radius: 2px
    display: flex
    gap: 0.5rem
    align-items: center

.action-buttons
    gap: 10px

.grey-button
    background: lightgrey
    &:hover
        background: lightgrey

.darkgrey-button
    background: #273E47
    color: white

    &:hover
        background: #273E47

.red-button
    background: #cf0909f6
    margin-right: 10px
    color: white

    &:hover
        background: #cf0909f6

.input-container
    label
        margin-bottom: 5px
        font-size: 0.9rem
        font-weight: 400

    input, textarea
        padding: 10px 10px
        border: 1px solid rgba(0, 0, 0, 0.3)
        border-radius: 2px
        resize: none

    p
        font-size: 0.75rem
        opacity: 0.7
        margin-top: 3px

    &.radio
        margin-top: 10px
        gap: 3px

        h6
            margin-bottom: 10px

#discard
    .modal-top-row
        justify-content: space-between
        margin-bottom: 25px

        button
            padding: 0

.image-input-container
    min-height: 400px
    transition: height 0.3s
    flex-grow: 1

    label
        margin-bottom: 5px
        font-size: 0.9rem
        font-weight: 400

.main-image

    .image-container
        height: 100%
        min-height: 400px
        display: flex
        align-items: center
        justify-content: center
        cursor: pointer

        &:hover
            background: #f8f8f8

        .input-trigger
            justify-content: center
            align-items: center
            gap: 10px
            cursor: pointer
            width: 100%


    img
        width: 100%

.image-previews
    overflow-x: auto
    align-items: start
    gap: 15px

    .image-container
        position: relative
        cursor: pointer
        min-height: 100px
        align-items: center
        padding: 10px
        border: 8px solid black

        &:hover
            .remove-image-button
                display: flex

        &.selected-image
            outline: 3px solid rgba(0, 0, 0, 0.3)


    img
        width: 150px
        margin-block: auto

        &.selected-image
            outline: 3px solid rgba(0, 0, 0, 0.3)

    .remove-image-button
        display: none
        position: absolute
        background: rgba(255, 255, 255, 0.5)
        padding: 3px
        top: 10px
        right: 10px
.inline-inputs
    align-items: start
    gap: 1.5rem

    .input-container
        flex-grow: 1


.radio
    label
        margin-bottom: 5px
        font-size: 0.95rem
        text-transform: capitalize
    input
        margin: 0

.bottom-row
    align-items: end
    justify-content: space-between
</style>
