// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'fa',
      },
    },
  },

  css: [`~/assets/css/main.css`],
});
