<template>
  <section class="py-10 md:py-8">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="flex items-center font-bold text-xl mt-10">
        <img src="/images/logo.png" alt="" class="w-16">
        <p>Cuisto<span class="text-brown_color">Recettes</span></p>
      </div>
      <div class="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
        <NuxtLink to="/">
          <h1 class="text-brown_color text-sm px-5 py-2">Retour à l'accueil</h1>
        </NuxtLink>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <LoadingButton
            class="w-full border border-[#e0e0e0] rounded-md"
            @click="signInWithGoogleHandler"
            :isLoading="isGoogleLoading"
            :isSuccess="isGoogleSuccess"
          >
            <div class="flex justify-center gap-4 items-center text-gray_color">
              <IconGoogle class="size-6" />
              Se connecter avec Google
            </div>
          </LoadingButton>

          <div class="flex items-center">
            <div class="w-full h-0.5 bg-[#E5E7EB]"></div>
            <div class="px-5 text-center text-gray-500">ou</div>
            <div class="w-full h-0.5 bg-[#E5E7EB]"></div>
          </div>

          <form class="space-y-4" @submit.prevent="signIn">
            <div v-if="error" class="text-rouge text-sm">
              {{ error }}
            </div>

            <div class="mb-5">
              <label for="email" class="mb-3 block text-base text-gray_color">
                Votre email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="nom@example.com"
                v-model="email"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div>
              <label for="password" class="mb-3 block text-base text-gray_color">
                Votre mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                v-model="password"
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <LoadingButton
              type="submit"
              class="w-full bg-brown_color"
              :isLoading="isLoading"
              :isSuccess="isSuccess"
            >
              Se connecter
            </LoadingButton>
          </form>

          <p class="text-sm text-gray_color">
            Vous n'avez pas de compte ?
            <NuxtLink to="/signup" class="text-brown_color hover:underline">
              Inscrivez-vous
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInUser, signUpWithGoogle } from '@/composables/useFirebaseAuth';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);
const isSuccess = ref(false);
const isGoogleLoading = ref(false);
const isGoogleSuccess = ref(false);

const signIn = async () => {
  try {
    isLoading.value = true;
    error.value = '';
    
    await signInUser(email.value, password.value);
    isSuccess.value = true;
    
    setTimeout(() => {
      router.push('/success');
    }, 1500);
  } catch (err) {
    error.value = "Email ou mot de passe incorrect";
  } finally {
    isLoading.value = false;
  }
};

const signInWithGoogleHandler = async () => {
  try {
    isGoogleLoading.value = true;
    error.value = '';
    
    await signUpWithGoogle();
    isGoogleSuccess.value = true;
    
    setTimeout(() => {
      router.push('/success');
    }, 1500);
  } catch (err) {
    error.value = "Erreur lors de la connexion avec Google";
  } finally {
    isGoogleLoading.value = false;
  }
};
</script>
