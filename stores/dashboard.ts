import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        dashboard: {
            loading: true,
            isNavOpen: true,
        },
    }),

    getters: {
        get(state) {
            return state.dashboard;
        },

        loading(state) {
            return state.dashboard.loading;
        },

        isNavOpen(state) {
            return state.dashboard.isNavOpen;
        },
    },

    actions: {
        loadingState(state: boolean) {
            this.dashboard.loading = state;
        },

        toggleLoadingState() {
            this.dashboard.loading = !this.dashboard.loading;
        },

        toggleNav() {
            this.dashboard.isNavOpen = !this.dashboard.isNavOpen;
        },

        openNav() {
            this.dashboard.isNavOpen = true;
        },

        closeNav() {
            this.dashboard.isNavOpen = false;
        },
    },
});
