// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // router: {
  //   middleware: ['auth'], // Middleware global par défaut
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       name: 'success',
  //       path: '/success',
  //       component: resolve(__dirname, 'pages/success.vue'),
  //       middleware: ['auth'] // Middleware spécifique à cette route
  //     });
  //   }
  // },
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