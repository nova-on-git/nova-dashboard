<template>
    <main class="admin-page">
        <modal id="categoryToggle" ref="categoryToggle">
            <div class="modalBody">
                <h4 class="text-blue-500">Add a category</h4>
                <input class="rounded-input text-blue-50" type="text" v-model="addCategoryInput" />

                <rflex class="buttonsContainer">
                    <btn
                        class="darkgrey-button"
                        @click="$Products.createCategory(addCategoryInput), $Products.read(true)"
                        >Add Category</btn
                    >
                    <btn class="red-button text-blue-500" @click="categoryToggle.close()">
                        <Icon icon="material-symbols:close-rounded" width="25" />
                        Cancel
                    </btn>
                </rflex>
            </div>
        </modal>

        <modal id="delete" ref="modalRef">
            <cflex class="discard-modal admin-box">
                <rflex class="modal-top-row">
                    <h6>Are you sure?</h6>
                    <btn @click="modalRef.close(), (itemToDelete = '')"
                        ><Icon icon="material-symbols:close-rounded" width="25"
                    /></btn>
                </rflex>

                <rflex class="buttons-row">
                    <btn class="darkgrey-button" @click="modalRef.close(), (itemToDelete = '')">
                        KEEP MY PRODUCT
                        <Icon icon="icon-park-outline:ad-product" width="20" />
                    </btn>
                    <btn class="red-button" @click="deleteItem(itemToDelete), modalRef.close()">
                        DELETE
                        <Icon icon="ri:delete-bin-5-line" width="20" />
                    </btn>
                </rflex>
            </cflex>
        </modal>
        <mpage class="admin-mpage">
            <cflex class="admin-header">
                <header class="dashboard-header">
                    <breadcrumbs :links="links" />
                    <h1>Your Store</h1>
                </header>

                <rflex class="search-filter">
                    <div class="filter-container">
                        <label for="filter"><strong>Filter Status:</strong></label>
                        <select id="filter" v-model="selectedFilter" @change="applyFilter">
                            <option value="all">all</option>
                            <option value="available">available</option>
                            <option value="sold">sold</option>
                            <option value="hidden">hidden</option>
                        </select>
                    </div>
                    <input type="search" v-model="searchQuery" placeholder="Search products..." />
                </rflex>
            </cflex>
            <form @submit.prevent="addCategory">
                <rflex class="categories-bar admin-box" v-if="velorisConfig.categories">
                    <rflex class="tabs">
                        <tab
                            :class="{ active: activeCategory === 'all' }"
                            class="tab"
                            @click="changeActiveCategory('all')"
                            >All Categories</tab
                        >

                        <tab
                            :class="{ active: activeCategory === category }"
                            class="tab"
                            @click="changeActiveCategory(category)"
                            v-for="(category, index) in categories"
                            :key="index"
                        >
                            {{ category }}
                        </tab>
                    </rflex>

                    <rflex>
                        <btn modal="categoryToggle" class="text-red-500">Add a category</btn>
                    </rflex>
                </rflex>
            </form>

            <Suspense>
                <template #default>
                    <rflex class="items" v-if="!isLoading">
                        <StoreProductCard
                            :product="item"
                            v-for="item in filteredProducts"
                            :key="item.id"
                        >
                        </StoreProductCard>
                    </rflex>
                </template>

                <template #fallback>
                    <!-- Fallback content to show while loading -->
                    <div>Loading...</div>
                </template>
            </Suspense>
        </mpage>
        <DashboardFooter />
    </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { Icon } from "@iconify/vue"
// import { use$Products } from "~/stores/products"
import velorisConfig from "~/veloris.config.ts"

const links = [
    // Add your breadcrumb links here
]

const categoryToggle = ref(null)
const addCategoryInput = ref("")
// const $Products = use$Products()
const activeCategory = ref("all")
const modalRef = ref(null)
const itemToDelete = ref("")
const selectedFilter = ref("all")
const searchQuery = ref("")
const products = ref([])
const categories = ref([])

const filteredProducts = computed(() => {
    let filtered =
        activeCategory.value === "all"
            ? products.value
            : products.value.filter((product) => product.category === activeCategory.value)

    if (selectedFilter.value !== "all") {
        filtered = filtered.filter((product) => product.visibility === selectedFilter.value)
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(
            (product) =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
        )
    }

    return filtered
})

function changeActiveCategory(category) {
    activeCategory.value = category
}

const isLoading = ref(true)
onMounted(async () => {
    await $Products.read(true)
    products.value = $Products.get
    categories.value = $Products.getCategories

    let flattenedArr = []

    for (const category in products.value) {
        if (Array.isArray(products.value[category])) {
            flattenedArr = flattenedArr.concat(products.value[category])
        }
    }

    products.value = flattenedArr
    isLoading.value = false
})

async function deleteItem(itemToDelete) {
    await $Products.delete(itemToDelete)
    await $Products.read(true)
    products.value = $Products.get
}

function applyFilter() {
    // This function can be implemented if additional logic is needed
    console.log("Filter applied:", selectedFilter.value)
}

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped>
.modalBody
    background-color: white
    padding: 20px
    border: 1px solid #ccc
    border-radius: 1rem
    display: flex
    flex-direction: column
    justify-content: start

    .buttonsContainer
        display: flex
        justify-content: space-between
        gap: 15px
        width: 100%
        margin-top: 15px

.rounded-input
    padding: 8px
    margin: 10px 0
    border: 1px solid #ccc
    border-radius: 4px

.categories-bar
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px
    margin-bottom: 20px

    .tabs
        display: flex
        gap: 10px

        .tab
            cursor: pointer
            font-size: 1.2rem
            padding: 5px 10px
            border: none
            background: none

            &.active
                text-decoration: underline
                font-weight: bold

.items
    display: flex
    flex-wrap: wrap
    gap: 40px
    margin-top: 25px



.search-filter
    display: flex
    gap: 20px
    margin-bottom: 20px
    align-items: center

    input[type="search"]
        flex-grow: 1
        padding: 8px
        border: 1px solid #ccc
        border-radius: 4px

.filter-container
    display: flex
    align-items: center
    gap: 10px

    select
        padding: 5px 10px
        text-transform: capitalize
        border-radius: 4px
        border: 1px solid #ccc

        &:focus
            border-color: #007bff
            outline: 0
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25)

#delete
    .modal-top-row
        display: flex
        justify-content: space-between
        align-items: center
        margin-bottom: 25px

        button
            background: none
            border: none
            cursor: pointer

    .buttons-row
        display: flex
        justify-content: space-between
        gap: 10px

@media (max-width: 1200px)
    .items .item
        flex-basis: calc(33.33% - 40px)

@media (max-width: 900px)
    .items .item
        flex-basis: calc(50% - 40px)

@media (max-width: 600px)
    .items
        justify-content: center

        .item
            flex-basis: 100%
            max-width: none

    .search-filter
        flex-direction: column
        align-items: stretch

        input[type="search"]
            width: 100%

        .filter-container
            justify-content: space-between
</style>
