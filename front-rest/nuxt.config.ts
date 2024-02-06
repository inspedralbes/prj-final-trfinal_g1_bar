// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'nuxt-primevue'
  ],
  primevue: {
    options:{
      ripple: true
    },
    components: {
      prefix: 'Prime',
      include: '*',
    }
  },
  css: ['primevue/resources/themes/aura-dark-amber/theme.css']
})
