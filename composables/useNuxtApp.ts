import { VelorisConfig } from "~~/velorisConfig.global"

export const useVelorisConfig = () => {
    const nuxtApp = useNuxtApp()
    const $velorisConfig: VelorisConfig = nuxtApp.$velorisConfig
    return $velorisConfig
}

/** Returns the firebase DB instance */
export const useDb = () => {
    const nuxtApp = useNuxtApp()
    const $db = nuxtApp.$db
    return $db
}

/** Returns the firebase Auth instance */
export const useAuth = () => {
    const nuxtApp = useNuxtApp()
    const $auth = nuxtApp.$auth
    return $auth
}
