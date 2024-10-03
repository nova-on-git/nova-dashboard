import { defineStore } from "pinia"

export const useBasketStore = defineStore("basket", {
    state: () => ({
        basket: [],
    }),

    getters: {
        get(state) {
            return state.basket
        },

        getBasketTotal(state) {
            let total = 0
            for (const item of state.basket) {
                total += Number(item.price)
            }

            // Return total in pence //
            return total * 100
        },

        inBasket: (state) => (id) => {
            return state.basket.some((item) => item.id === id)
        },
    },

    actions: {
        async read() {
            this.unCache()
        },

        async add(itemObj) {
            if (!this.basket.includes(itemObj)) {
                this.basket.push(itemObj)
            }

            this.cache()
        },

        async remove(itemObj) {
            this.basket = this.basket.filter((item) => {
                item != itemObj
            })
            this.cache()
        },

        async removeById(itemId) {
            this.basket = this.basket.splice(
                this.basket.findIndex((item) => item.id === itemId),
                1
            )
            this.cache()
        },

        async cache() {
            localStorage.setItem("$Basket", JSON.stringify(this.basket))
        },

        async unCache() {
            const basketCache = localStorage.getItem("$Basket")
            if (basketCache) this.basket = JSON.parse(basketCache)
        },
    },
})
