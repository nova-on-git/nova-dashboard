import { defineStore } from "pinia"
import axios from "axios"

export const useProductStore = defineStore("products", {
    state: () => ({
        products: {} as ProductCategory,
    }),

    getters: {
        get: (state) => {
            return state.products
        },

        getCategories: (state) => {
            let categories = []

            for (const key in state.products) {
                categories.push(key)
            }

            return categories
        },

        getProductsByCategory: (state) => (category: string) => {
            if (category === "all") {
                return Object.values(state.products).flat()
            }
            return state.products[category] || []
        },

        getProductById: (state) => (id: string) => {
            for (const category in state.products) {
                const foundProduct = state.products[category].find((product) => product.id === id)
                if (foundProduct) {
                    return foundProduct
                }
            }
            return undefined
        },
    },

    actions: {
        async create(category: string, itemObj: Product) {
            try {
                await axios.post(`/api/store/categories/${category}/products`, itemObj)
            } catch (error) {
                console.error(error)
            }
        },

        async read(forceRefresh = true) {
            if (!forceRefresh) {
                const cachedProducts = localStorage.getItem("products")
                if (cachedProducts) {
                    console.info("Fetching orders from cache")
                    this.products = JSON.parse(cachedProducts)
                    return this.products
                }
            }

            console.info("Fetching orders from DB")

            try {
                const response = await axios.get("/api/store")
                this.products = response.data

                if (process.client) {
                    localStorage.setItem("products", JSON.stringify(this.products))
                }

                return this.products
            } catch (error) {
                console.error(error)
                return []
            }
        },

        async update(category: string, itemObj: Product) {
            try {
                await axios.put(`${window.location.origin}/api/store/categories/${category}/products`, itemObj)
            } catch (error) {
                console.error(error)
            }
        },

        async delete(itemId: string) {
            console.log("deleting", itemId)
            try {
                await axios.delete(`${window.location.origin}/api/store/${itemId}`)
            } catch (error) {
                console.error("Failed to delete item: ", error)
            }
        },

        async createCategory(category: string) {
            try {
                await axios.post(`${window.location.origin}/api/store/categories/${category}`)
            } catch (error) {
                console.error(error)
            }
        },
    },
})
