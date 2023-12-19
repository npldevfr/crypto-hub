// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-expect-error
  ssr: false,
  devtools: {
    enabled: true,

  },
  formkit: {
    autoImport: true,
  },
  vue: {
    propsDestructure: true,
    defineModel: true,
  },
  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@formkit/nuxt'],
  css: [
    '@unocss/reset/tailwind.css',
  ],
})
