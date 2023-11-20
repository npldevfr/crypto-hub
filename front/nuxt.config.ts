// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // @ts-expect-error
    ssr: false,
  devtools: { enabled: true },

  modules: [
    "@vueuse/nuxt",
    "@unocss/nuxt"
  ],
   css: [
        '@unocss/reset/tailwind.css'
   ],
})
