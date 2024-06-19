<template>
    <!-- -->
    <div class="max-w-[35em] mx-auto flex justify-center items-center shadow-lg rounded-lg p-6 m-14">
        <div class="space-y-5">
            <NuxtLink to="/"><h1 class="text-brown_color text-sm">Retour à l'accueil</h1></NuxtLink>
            <div class="flex justify-center items-center font-bold text-xl">
                <img src="/images/logo.png" alt="" class="w-16">
                <p>Cuisto<span class="text-brown_color">Recettes</span></p>
            </div>
            <!-- Author: FormBold Team -->
            <form class="space-y-4">
                <button class="border border-[#e0e0e0] rounded-md block w-full py-3 px-6" type="submit">
                    <div class="flex justify-center gap-4 items-center text-gray_color">
                        <IconGoogle class="size-6" />
                        Inscrivez-vous avec Google
                    </div>
                </button>

                <div class="flex items-center">
                    <div class="w-full h-0.5 bg-[#E5E7EB]"></div>
                    <div class="px-5 text-center text-gray-500 dark:text-gray-400">ou</div>
                    <div class="w-full h-0.5 bg-[#E5E7EB]"></div>
                </div>

                <div class="-mx-3 flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="">
                            <label for="fName" class="mb-3 block text-base text-gray_color">
                                Votre nom
                            </label>
                            <input type="text" name="fName" id="fName" placeholder="Votre Nom"
                                class="mb-3 w-full rounded-md border border-[#e0e0e0] py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-">
                            <label for="prenom" class="mb-3 block text-base text-gray_color">
                                Votre prenom
                            </label>
                            <input type="text" name="prenom" id="prenom" placeholder="Votre Prénom"
                                class="mb-3 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>

                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                            <label for="email" class="mb-3 block text-base  text-gray_color">
                                Votre email
                            </label>
                            <input type="text" name="email" id="email" placeholder="nom@example.com"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>

                    <div class="w-full px-3 sm:w-1/2">
                        <div class="">
                            <label for="prenom" class="mb-3 block text-base text-gray_color">
                                Votre numero
                            </label>
                            <input type="text" name="prenom" id="prenom" placeholder="58466965"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                </div>
                <div>
                    <label for="password" class="mb-3 block text-base text-gray_color">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••"
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md"
                        required="">
                </div>

                <button type="submit" class="bg-brown_color rounded-md font-bold w-full py-3 px-6"
                    style="color: white;">
                    Inscription
                </button>

                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Avez-vous un compte?
                    <NuxtLink to="/login" class="font-medium hover:underline"> Connexion</NuxtLink>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>