import { defineStore } from "pinia"
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth"
import type { Auth, User } from "firebase/auth"
import axios from "axios"

interface UserObj {
    uid: string
    email: string
    displayName?: string
    siteAccess: SiteAccess[]
}

export const useCurrentUserStore = defineStore("currentUserStore", {
    state: () => ({
        currentUser: {} as UserObj,
        isLoadings: false,
    }),

    getters: {
        get(state) {
            return state.currentUser
        },

        uid(state) {
            return state.currentUser?.uid ? state.currentUser.uid : "No uid"
        },

        email(state) {
            return state.currentUser?.email ? state.currentUser.email : "No email"
        },

        truncatedEmail:
            (state) =>
            (truncateLength: number = 25) => {
                if (state.currentUser?.email.length < truncateLength) return state.currentUser.email
                return `${state.currentUser.email.slice(0, truncateLength)}...`
            },

        truncatedName:
            (state) =>
            (truncateLength: number = 25) => {
                if (!state.currentUser.displayName) return ""

                if (state.currentUser?.displayName.length < truncateLength) return state.currentUser.displayName
                return `${state.currentUser.email.slice(0, truncateLength)}...`
            },

        displayName(state) {
            return state.currentUser?.displayName ? state.currentUser.displayName : ""
        },

        role(state) {
            const domain = window.location.hostname

            if (state.currentUser && state.currentUser.siteAccess) {
                const siteAccessEntry = state.currentUser.siteAccess.find((site) => site.domain === domain)

                return siteAccessEntry ? siteAccessEntry.role : "No role"
            }

            // Default to "No role" if user or siteAccess is not available
            return "No role"
        },

        isLoading(state) {
            return state.isLoadings
        },

        isAuthenticated(state) {
            return !!state.currentUser.uid
        },
    },

    actions: {
        async asyncGet() {
            while (this.isLoading) {
                await new Promise((resolve) => setTimeout(resolve, 50))
            }
            this.cache()
            return this.currentUser
        },

        async init() {
            const nuxtApp = useNuxtApp()
            const $auth = nuxtApp.$auth as Auth
            this.currentUser = await this.getCache()
            onAuthStateChanged($auth, async (user: User | null) => {
                this.isLoadings = true
                console.debug("[Veloris] Auth state change detected.")

                if (user) {
                    let profile = await this.readProfile(user.uid)

                    this.currentUser = {
                        uid: user.uid,
                        email: user.email || "",
                        displayName: user.displayName || undefined,
                        siteAccess: profile.siteAccess || [],
                    }

                    await this.createUserProfile()
                    profile = await this.readProfile(user.uid)
                    this.currentUser.siteAccess = profile.siteAccess
                }
                await this.cache()
                this.isLoadings = false
            })
        },

        /**  This is separate to the firestore auth purely for other user data */
        async createUserProfile() {
            this.isLoadings = true

            try {
                await axios.post(`/api/users`, {
                    uid: this.currentUser.uid,
                    email: this.currentUser.email,
                    siteAccess: [{ domain: window.location.hostname, role: "user" }],
                })
            } catch (error) {
                console.error("Failed to create user profile:", error)
            } finally {
                this.isLoadings = false
            }
        },

        async readProfile(uid: string) {
            const response = await axios.get(`/api/users/role`, {
                params: { uid: uid },
            })
            return response.data
        },

        async logout() {
            const nuxtApp = useNuxtApp()
            const $auth = nuxtApp.$auth as Auth
            try {
                await firebaseSignOut($auth)
                this.clearUser()
                navigateTo("/")
                console.debug("[Veloris] User logged out, cache cleared.")
            } catch (error) {
                console.error("Logout failed: ", error)
            }
        },

        async cache() {
            if (!import.meta.client) return
            localStorage.setItem("currentUser", JSON.stringify(this.currentUser))
        },

        async getCache() {
            if (!import.meta.client) return
            const cachedUser = localStorage.getItem("currentUser")
            if (cachedUser) {
                try {
                    console.log("User fetched from client localStorage")
                    return JSON.parse(cachedUser)
                } catch (error) {
                    console.error("Failed to parse cached user data:", error)
                    return {} as UserObj
                }
            }
        },

        clearUser() {
            this.currentUser = {} as UserObj
            this.removeCache()
        },

        async removeCache() {
            if (import.meta.client) localStorage.removeItem("currentUser")
        },
    },
})
