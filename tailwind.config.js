/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      'brown_color': '#B55D51',
      'gray_color': '#878787',
      'gray': '#EBEBEB',
      'rouge': '#EF4444',
    },
    fontFamily:{
      'Roboto': '"Roboto", sans-serif'
    },
    extend: {
      backgroundImage: {
        'profile': "url('/images/food_29.png')",
      },
      maxWidth: {
        '70': '70em',
        '10': '10em',
        '40': '40em',
        '30': '30em',
      },
      width: {
        '24': '24em',
        '70': '70em',
      }
    },
  },
  plugins: [],
}