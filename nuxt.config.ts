// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // extends: ["../nova/"],
  // extends: ["github:Veloris-Designs/nova#v1.1.8"],

  modules: ["@nuxt/fonts", "@pinia/nuxt", "nuxt-build-cache"],

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
})