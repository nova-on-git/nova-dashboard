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
        async createRecord(paymentRecord: PaymentRecord) {
            await useFetch("/api/payments", {
                method: "POST",
                body: { paymentRecord },
            })

            //TODO save payment records to db.
        },
    },
})
