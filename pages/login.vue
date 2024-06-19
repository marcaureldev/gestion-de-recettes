<template>
    <section class="py-10 md:py-8">

        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="flex items-center font-bold text-xl mt-10">
                <img src="/images/logo.png" alt="" class="w-16">
                <p>Cuisto<span class="text-brown_color">Recettes</span></p>
            </div>

            <div class="w-full bg-white rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0 ">
                <NuxtLink to="/">
                    <h1 class="text-brown_color text-sm px-5 py-2">Retour à l'accueil</h1>
                </NuxtLink>
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">

                    <form id="connect-google-button" method="post" action="">
                        <button class="border border-[#e0e0e0] rounded-md block w-full py-3 px-6" type="submit">
                            <div class="flex justify-center gap-4 items-center text-gray_color">
                                <IconGoogle class="size-6" />
                                Inscrivez-vous avec Google
                            </div>
                        </button>
                    </form>


                    <div class="flex items-center">
                        <div class="w-full h-0.5 bg-[#E5E7EB]"></div>
                        <div class="px-5 text-center text-gray-500 dark:text-gray-400">ou</div>
                        <div class="w-full h-0.5 bg-[#E5E7EB]"></div>
                    </div>

                    <form class="space-y-4 md:space-y-" method="POST" action="/auth/login/">

                        <div class="">
                            <div class="mb-5">
                                <label for="email" class="mb-3 block text-base  text-gray_color">
                                    Votre email
                                </label>
                                <input type="text" name="email" id="email" placeholder="nom@example.com"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md" />
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
export default {

}
</script>

<style></style>