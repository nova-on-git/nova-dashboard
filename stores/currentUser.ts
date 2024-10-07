import { defineStore } from "pinia"
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth"
import type { Auth, User } from "firebase/auth"
import axios from "axios"
import { useAuth } from "~~/composables/useGlobals"

interface UserObj {
    uid: string
    email: string
    displayName?: string
    role: "user" | "admin" | "dev"
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
            return state.currentUser?.role ? state.currentUser.role : "No role"
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
            const $auth = useAuth()
            this.currentUser = await this.getCache()

            onAuthStateChanged($auth, async (user: User | null) => {
                this.isLoadings = true
                console.debug("[Veloris] Auth state change detected.")

                if (user) {
                    let role = await this.readRole(user.uid)

                    this.currentUser = {
                        uid: user.uid,
                        email: user.email || "",
                        displayName: user.displayName || undefined,
                        role: role || "user",
                    }

                    await this.createUserProfile()
                    this.currentUser.role = await this.readRole(user.uid) || "user"
                }
                await this.cache()
                this.isLoadings = false
            })
        },

        async createUserProfile() {
            this.isLoadings = true

            try {
                await axios.post(`/api/users`, {
                    uid: this.currentUser.uid,
                    email: this.currentUser.email,
                    domain: window.location.hostname,

                })
            } catch (error) {
                console.error("Failed to create user profile:", error)
            } finally {
                this.isLoadings = false
            }
        },

        async readRole(uid: string) {
            const { data } = await useFetch(`/api/users/role`, {
                params: { uid: uid },
            })

			console.log(data.value)
            return data.value
        },

        async logout() {
            const $auth = useAuth()
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
