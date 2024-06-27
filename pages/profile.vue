<template>
    <div>
        <!-- =============================== HEADER SECTION ========================================= -->
        <header class="font-medium p-4 max-w-70 mx-auto">
            <NavSuccess />
        </header>

        <!-- =============================== PROFILE SECTION ========================================= -->
        <section class="max-w-70 mx-auto p-5 mb-5 space-y-5">
            <div class="flex justify-between items-center px-4 py-3 mt-5">
                <h1 class="text-lg">PROFILE</h1>
                <Button :button="register" @click="updateUserInfo" style="color: white;" />
            </div>
            <hr style="max-width: 68em; margin:auto" class="border border-brown_color">

            <div class="max-w-30 flex flex-wrap justify-center items-center p-5 space-y-4">
                <div class="w-28 h-28 rounded-[56px] bg-profile bg-center bg-cover mx-auto">
                </div>
                <div class="flex flex-wrap justify-center gap-5 items-center">
                    <Button :button="modifier" style="color: white;" />
                    <Button :button="supprimer" style="background-color: #EBEBEB; border: #000 solid 1.95px;" />
                </div>
            </div>

            <div class="max-w-70 mx-auto flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2 mb-6">
                    <div class="">
                        <label for="nom" class="mb-1 block text-base text-gray_color">
                            Votre nom
                        </label>
                        <div class="border-b-2 border-b-brown_color">
                            <input type="text" name="nom" id="nom" class="mb-1 w-full rounded-md py-2 px-6 outline-none"
                                v-model="user.nom" v-if="user" />
                        </div>
                    </div>
                </div>

                <div class="w-full px-3 sm:w-1/2 mb-6">
                    <div class="">
                        <label for="prenom" class="mb-1 block text-base text-gray_color">
                            Votre prenom
                        </label>
                        <div class="border-b-2 border-b-brown_color">
                            <input type="text" name="prenom" id="prenom" class="mb-1 w-full rounded-md py-2 px-6 outline-none"
                                v-model="user.prenom" v-if="user"/>
                        </div>
                    </div>
                </div>

                <div class="w-full px-3 sm:w-1/2 mb-6">
                    <div class="">
                        <label for="email" class="mb-1 block text-base text-gray_color">
                            Votre adresse email
                        </label>
                        <div class="border-b-2 border-b-brown_color">
                            <input type="text" name="email" id="email" v-model="user.email" v-if="user"
                                class="mb-1 w-full rounded-md py-2 px-6 outline-none" />
                        </div>
                    </div>
                </div>

                <div class="w-full px-3 sm:w-1/2 mb-6">
                    <div class="">
                        <label for="numero" class="mb-1 block text-base text-gray_color">
                            Votre numero
                        </label>
                        <div class="border-b-2 border-b-brown_color">
                            <input type="text" name="numero" id="numero" class="mb-1 w-full rounded-md py-2 px-6 outline-none"
                                v-model="user.numero" v-if="user"/>
                        </div>
                    </div>
                </div>

                <div class="w-full px-3 sm:w-1/2 mb-6">
                    <div class="">
                        <label for="password" class="mb-1 block text-base text-gray_color">
                            Votre mot de passe
                        </label>
                        <div class="border-b-2 border-b-brown_color">
                            <input type="password" name="password" id="password"
                                class="mb-1 w-full rounded-md py-2 px-6 outline-none" v-model="user.password" v-if="user"
                                placeholder="••••••••" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- =============================== FOOTER SECTION ========================================= -->
        <section class="p-8 bg-gray">
            <Footer />
        </section>
    </div>
</template>

<script>
import { onMounted } from 'vue';
export default {
    data() {
        return {
            register: 'Enregistrer',
            modifier: 'Modifier la photo',
            supprimer: 'Supprimer',
        };
    },

    setup() {
        const user = useFirebaseUser();
        
        onMounted(async () => {
            await initUser();
        });

        const updateUserInfo = async () => {
            try {
                await updateUser(user.value.uid, {
                    nom: user.value.nom,
                    prenom: user.value.prenom,
                    email: user.value.email,
                    numero: user.value.numero,
                    // Ajoutez d'autres champs si nécessaire
                });
                alert("User information updated successfully!");
            } catch (error) {
                console.error("Error updating user information: ", error);
            }
        };

        return {
            user,
            updateUserInfo
        };
    }
};
</script>

<style></style>
