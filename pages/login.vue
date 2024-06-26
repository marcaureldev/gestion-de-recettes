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
                    <button class="border border-[#e0e0e0] rounded-md block w-full py-3 px-6" type="button"
                        @click="signInWithGoogleHandler">
                        <div class="flex justify-center gap-4 items-center text-gray_color">
                            <IconGoogle class="size-6" />
                            Se connecter avec Google
                        </div>
                    </button>
                    <div class="flex items-center">
                        <div class="w-full h-0.5 bg-[#E5E7EB]"></div>
                        <div class="px-5 text-center text-gray-500 dark:text-gray-400">ou</div>
                        <div class="w-full h-0.5 bg-[#E5E7EB]"></div>
                    </div>
                    <form class="space-y-4 md:space-y-" @submit.prevent="signIn">
                        <div v-if="error" class="text-rouge text-sm">
                            {{ error }}
                        </div>
                        <div class="">
                            <div class="mb-5">
                                <label for="email" class="mb-3 block text-base text-gray_color">
                                    Votre email
                                </label>
                                <input type="email" name="email" id="email" placeholder="nom@example.com"
                                    v-model="email"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                        <div>
                            <label for="password" class="mb-3 block text-base text-gray_color">Votre mot de
                                passe</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                v-model="password"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md"
                                required="">
                        </div>
                        <button type="submit" class="bg-brown_color rounded-md font-bold w-full py-3 px-6"
                            style="color: white;">
                            Connexion
                        </button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Vous n'avez pas de compte?
                            <NuxtLink to="/signup" class="font-medium hover:underline"> Inscription</NuxtLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const email = ref("");
        const password = ref("");
        const error = ref(null);
        const router = useRouter();

        function resetForm() {
            email.value = '';
            password.value = '';
        }

        const { user } = useFirebaseUser()

        const signIn = async () => {
            try {
                const credentials = await signInUser(email.value, password.value)
                // Pas besoin de mettre à jour user manuellement, onAuthStateChanged s'en chargera
                resetForm()
                router.push('/success')
            } catch (err) {
                console.error('Error during sign in:', err)
                error.value = 'Les identifiants ne sont pas corrects'
                resetForm()
            }
        }

        const signInWithGoogleHandler = async () => {
            try {
                const credentials = await signUpWithGoogle();
                console.log(credentials);
                router.push('/success');
            } catch (err) {
                console.error('Error during Google sign in:', err);
                error.value = 'Erreur lors de la connexion avec Google';
            }
        }

        return {
            email,
            password,
            error,
            signIn,
            signInWithGoogleHandler
        };
    },
}
</script>

<style></style>
