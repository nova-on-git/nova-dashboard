export const usePaymentStore = defineStore("payment", {
    state: () => ({
        payments: {},
    }),

    getters: {
        get(state) {
            return state.payments
        },
    },

    actions: {
        async createRecord(payment: PaymentRecord) {
            await useFetch("/api/payments", {
                method: "POST",
                body: {
                    payment,
                },
            })

            //TODO save payment records to db.
        },
    },
})
