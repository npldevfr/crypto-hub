// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@vueuse/nuxt",
    "@unocss/nuxt"
  ],
    // @ts-expect-error
   css: [
        '@unocss/reset/tailwind.css'
   ]
})
