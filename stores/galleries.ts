import { defineStore } from "pinia";

export const useGalleryStore = defineStore("galleries", {
    state: () => ({
        galleries: {},
    }),

    getters: {
        get(state) {
            return state.galleries;
        },
    },

    actions: {
        async create() {},
    },
});
