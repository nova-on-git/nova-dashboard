// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    extends: [["github:Veloris-Designs/nova#v1.1.9", { install: true }]],

    modules: ["@nuxt/fonts", "@pinia/nuxt", "nuxt-build-cache", "nuxt-calendly"],

    vite: {
        css: {
            preprocessorOptions: {
                sass: {
                    // Sass auto imports //
                    additionalData: '@import "./styles/main.sass" \n',
                },
            },
        },
    },

    compatibilityDate: "2024-10-03",
});