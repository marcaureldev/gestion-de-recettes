// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
  '~/plugins/firebaseAuth.ts',
],
  modules: ['nuxt-icon'],
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  postcss: {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
},
})