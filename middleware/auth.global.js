// middleware/auth.js
import { getAuth,onAuthStateChanged } from 'firebase/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = getAuth();

  // Vérifier l'état de l'utilisateur Firebase
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(auth)
      console.log('User is signed in');
      // L'utilisateur est connecté, laissez-le accéder à la route demandée
    } else {
      console.log('No user is signed in');
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      if (to.path !== '/') {
        await navigateTo('/');
      }
    }
  });
});
