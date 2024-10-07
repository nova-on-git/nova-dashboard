import type { Auth } from "firebase/auth"
import type { Firestore } from "firebase/firestore"

export function useVelorisConfig() {
    const nuxtApp = useNuxtApp()
    const $velorisConfig = nuxtApp.$velorisConfig 
    return $velorisConfig as VelorisConfig
}

export function useAuth() {
    const nuxtApp = useNuxtApp()
    return nuxtApp.$auth as Auth
}

export function useDb() {
    const nuxtApp = useNuxtApp()
    return nuxtApp.$db as Firestore
}

