import { VelorisConfig } from "~~/types/velorisConfig.global.d.ts"

export const useVelorisConfig = () => {
    const nuxtApp = useNuxtApp()
    const $velorisConfig: VelorisConfig = nuxtApp.$velorisConfig
    return $velorisConfig
}
