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

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api',
    },
  },

  css: [`~/assets/css/main.css`],

  build: {
    transpile: [`vue-toastification`],
  },
});
