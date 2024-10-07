import type { Auth } from "firebase/auth"
import type { Firestore } from "firebase/firestore"

export function useVelorisConfig(): VelorisConfig {
    const nuxtApp = useNuxtApp()
    const $velorisConfig = nuxtApp.$velorisConfig 
    return $velorisConfig as VelorisConfig
}

export function useAuth(): Auth {
    const nuxtApp = useNuxtApp()
    return nuxtApp.$auth as Auth
}

export function useDb(): Firestore {
    const nuxtApp = useNuxtApp()
    return nuxtApp.$db as Firestore
}

