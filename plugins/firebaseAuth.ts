import { initializeApp } from "firebase/app";

export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp

  const firebaseConfig = {
    apiKey: "AIzaSyBlffc6B9N4zYzVImG0LJat6R2Y1R0TPtI",
    authDomain: "gestion-de-recettes.firebaseapp.com",
    projectId: "gestion-de-recettes",
    storageBucket: "gestion-de-recettes.appspot.com",
    messagingSenderId: "541099270029",
    appId: "1:541099270029:web:ba49fb6e637197a43227c4",
    measurementId: "G-7T2KXD2CJ9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
})
