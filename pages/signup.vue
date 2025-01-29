<template>
  <div class="max-w-[35em] mx-auto flex justify-center items-center shadow-lg rounded-lg p-6 m-14">
    <div class="space-y-5">
      <NuxtLink to="/">
        <h1 class="text-brown_color text-sm">Retour à l'accueil</h1>
      </NuxtLink>
      <div class="flex justify-center items-center font-bold text-xl">
        <img src="/images/logo.png" alt="" class="w-16" />
        <p>Cuisto<span class="text-brown_color">Recettes</span></p>
      </div>

      <form @submit.prevent="signUp" class="space-y-4">
        <LoadingButton
          class="w-full border border-[#e0e0e0] rounded-md"
          type="button"
          @click="signUpWithGoogleHandler"
          :isLoading="isGoogleLoading"
          :isSuccess="isGoogleSuccess"
        >
          <div class="flex justify-center gap-4 items-center text-gray_color">
            <IconGoogle class="size-6" />
            S'inscrire avec Google
          </div>
        </LoadingButton>

        <div class="flex items-center">
          <div class="w-full h-0.5 bg-[#E5E7EB]"></div>
          <div class="px-5 text-center text-gray-500">ou</div>
          <div class="w-full h-0.5 bg-[#E5E7EB]"></div>
        </div>

        <div v-if="error" class="text-rouge text-sm">
          {{ error }}
        </div>

        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3 sm:w-1/2">
            <div class="">
              <label for="nom" class="mb-3 block text-base text-gray_color">
                Votre nom
              </label>
              <input
                type="text"
                name="nom"
                id="nom"
                placeholder="Votre Nom"
                v-model="nom"
                class="mb-3 w-full rounded-md border border-[#e0e0e0] py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
          <div class="w-full px-3 sm:w-1/2">
            <div class="mb-">
              <label for="prenom" class="mb-3 block text-base text-gray_color">
                Votre prenom
              </label>
              <input
                type="text"
                name="prenom"
                id="prenom"
                placeholder="Votre Prénom"
                v-model="prenom"
                class="mb-3 w-full rounded-md border border-[#e0e0e0] py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </div>

        <div class="mb-">
          <label for="email" class="mb-3 block text-base text-gray_color">
            Votre email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@domain.com"
            v-model="email"
            class="mb-3 w-full rounded-md border border-[#e0e0e0] py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div class="mb-">
          <label for="password" class="mb-3 block text-base text-gray_color">
            Votre mot de passe
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            v-model="password"
            class="mb-3 w-full rounded-md border border-[#e0e0e0] py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div class="mb-">
          <label for="numero" class="mb-3 block text-base text-gray_color">
            Votre numero
          </label>
          <input
            type="text"
            name="numero"
            id="numero"
            placeholder="+237 6XX XXX XXX"
            v-model="numero"
            class="mb-3 w-full rounded-md border border-[#e0e0e0] py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <LoadingButton
          type="submit"
          class="w-full bg-brown_color"
          :isLoading="isLoading"
          :isSuccess="isSuccess"
        >
          S'inscrire
        </LoadingButton>

        <p class="text-sm text-gray_color">
          Vous avez déjà un compte ?
          <NuxtLink to="/login" class="text-brown_color hover:underline">
            Connectez-vous
          </NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUser, signUpWithGoogle } from '@/composables/useFirebaseAuth';

const router = useRouter();
const nom = ref('');
const prenom = ref('');
const email = ref('');
const password = ref('');
const numero = ref('');
const error = ref('');
const isLoading = ref(false);
const isSuccess = ref(false);
const isGoogleLoading = ref(false);
const isGoogleSuccess = ref(false);

const signUp = async () => {
  try {
    isLoading.value = true;
    error.value = '';

    if (!nom.value || !prenom.value || !email.value || !password.value || !numero.value) {
      throw new Error('Veuillez remplir tous les champs');
    }

    const additionalData = {
      nom: nom.value,
      prenom: prenom.value,
      numero: numero.value,
    };

    await createUser(email.value, password.value, additionalData);
    isSuccess.value = true;

    setTimeout(() => {
      router.push('/success');
    }, 1500);
  } catch (err) {
    error.value = err.message || 'Une erreur est survenue lors de l\'inscription';
  } finally {
    isLoading.value = false;
  }
};

const signUpWithGoogleHandler = async () => {
  try {
    isGoogleLoading.value = true;
    error.value = '';

    await signUpWithGoogle();
    isGoogleSuccess.value = true;

    setTimeout(() => {
      router.push('/success');
    }, 1500);
  } catch (err) {
    error.value = 'Erreur lors de l\'inscription avec Google';
  } finally {
    isGoogleLoading.value = false;
  }
};
</script>