<template>
    <div>
        <!-- =============================== HEADER SECTION ========================================= -->
        <header class="font-medium p-4 max-w-70 mx-auto">
            <NavSuccess />
        </header>

        <!-- =============================== Formulaire d'ajout de recettes ========================================= -->
        <section>
            <hr style="margin:auto" class="border-brown_color">
            <div class="flex justify-between items-center px-4 py-3 mt-5 max-w-70 mx-auto">
                <h1 class="text-xl font-bold">Créer une nouvelle recette </h1>
                <Button @click="addNewRecipe" :button="register" style="color: white;" />
            </div>
            <hr style="margin:auto" class="border-brown_color">

            <div class="max-w-70 mx-auto p-8 space-y-5">

                <!-- ===== title ===== -->
                <div class="w-full px-3 sm:w-1/2 mx-auto">
                    <div class="">
                        <label for="title" class="mb-3 block text-base">
                            Nom de la recette:
                        </label>
                        <input type="text" name="title" id="title" v-model="title"
                            class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md" />
                    </div>
                </div>

                <!-- ===== Image de la recette ===== -->
                <div class="w-full px-3 sm:w-1/2 mx-auto">
                    <div class="">
                        <p class="mb-3 block text-base">
                            Image de la recette:
                        </p>
                        <div
                            class="flex justify-center items-center mb-3 w-full h-40 rounded-md border border-brown_color shadow-md">
                            <img v-if="image" :src="image" class="w-full h-full object-cover" />
                            <CameraIcon v-else class="size-10" style="color: #B55D51;" />
                        </div>
                        <div class="flex justify-center items-center w-20 h-16 border border-brown_color rounded-md">
                            <div @click="openFilePicker">
                                <CameraIcon class="size-8 mx-auto" style="color: #B55D51;" />
                                <p class="text-sm">Ajouter</p>
                            </div>
                        </div>
                        <input type="file" id="fileInput" class="hidden" @change="onFileChange" />
                    </div>
                </div>

                <!-- ===== description ===== -->
                <div class="w-full px-3 sm:w-1/2 mx-auto">
                    <div class="">
                        <label for="description" class="mb-3 block text-base">
                            Description:
                        </label>
                        <input type="text" name="description" id="description" v-model="description" maxlength="250"
                            class="mb-3 w-full rounded-md border border-brown_color py-3 px-6 outline-none shadow-md" />
                        <p class="text-gray_color text-end">{{ description.length }} / 250</p>
                    </div>
                </div>

                <!-- ===== ingredients ===== -->
                <div class="w-full px-3 sm:w-1/2 mx-auto">
                    <div class="">
                        <label for="ingredients" class="mb-3 block text-base">
                            Ingrédients:
                        </label>
                        <input type="text" name="ingredients" id="ingredients" v-model="ingredients"
                            placeholder="Ajouter un ingrédient"
                            class="mb-4 w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md" />
                        <input type="text" name="title" id="title" v-model="ingredients_1"
                            placeholder="Ajouter un ingrédient"
                            class="mb-4 w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md" />
                        <Inputs />
                    </div>
                </div>

                <!-- ===== instructions ===== -->
                <div class="w-full px-3 sm:w-1/2 mx-auto">
                    <div class="">
                        <label for="instructions" class="mb-3 block text-base">
                            Instuctions:
                        </label>
                        <div
                            class="flex justify-center items-center w-14 h-12 border border-brown_color rounded-md mb-3">
                            <div @click="openFilePicker">
                                <CameraIcon class="size-5 mx-auto" style="color: #B55D51;" />
                                <p class="text-sm">Ajouter</p>
                            </div>
                        </div>
                        <input type="text" name="instructions" id="instructions" placeholder="Instructions"
                            v-model="instructions"
                            class="mb-4 w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md" />
                        <Inputs />
                    </div>
                </div>

                <!-- ===== personne ===== -->
                <div class="w-full px-3 sm:w-1/2 mx-auto">
                    <div class="">
                        <label for="personne" class="mb-3 block text-base">
                            Nombre de personnes:
                        </label>
                        <input type="text" name="personne" id="personne" v-model="personne"
                            placeholder="Cette recette peut nourrir combien de personnes"
                            class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md" />
                    </div>
                </div>

                <!-- ===== préparation ===== -->
                <div class="w-full px-3 sm:w-1/2 mx-auto">
                    <div class="">
                        <label for="preparation" class="mb-3 block text-base">
                            Temps de préparation:
                        </label>
                        <input type="text" name="preparation" id="preparation" v-model="preparation"
                            placeholder="Temps de préparation"
                            class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md" />
                    </div>
                </div>

                <!-- ===== cuisson ===== -->
                <div class="w-full px-3 sm:w-1/2 mx-auto">
                    <div class="">
                        <label for="cuisson" class="mb-3 block text-base">
                            Temps de cuisson:
                        </label>
                        <input type="text" name="cuisson" id="cuisson" v-model="cuisson" placeholder="Temps de cuisson"
                            class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md" />
                    </div>
                </div>

                <!-- ===== cuisine ===== -->
                <div class="w-full px-3 sm:w-1/2 mx-auto">
                    <div class="">
                        <label for="cuisine" class="mb-3 block text-base">
                            Cuisine:
                        </label>
                        <input type="text" name="cuisine" id="cuisine" v-model="cuisine" placeholder="Cuisine"
                            class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md" />
                    </div>
                </div>

                <!-- ===== categorie ===== -->
                <div class="w-full px-3 sm:w-1/2 mx-auto">
                    <div class="">
                        <label for="categorie" class="mb-3 block text-base">
                            Cuisine:
                        </label>
                        <input type="text" name="categorie" id="categorie" v-model="categorie" placeholder="Categorie"
                            class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md" />
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
export default {
    data() {
        return {
            register: 'Enrégistrer',
        }
    },

    setup() {
        const title = ref('');
        const image = ref("");
        const description = ref("");
        const ingredients = ref("");
        const ingredients_1 = ref("");
        const instructions = ref("");
        const personne = ref("");
        const preparation = ref("");
        const cuisson = ref("");
        const cuisine = ref("");
        const categorie = ref("");
        const variable = ref(null)


        const openFilePicker = () => {
            document.getElementById('fileInput').click();
        };

        const onFileChange = (e) => {
            const file = e.target.files[0];
            image.value = URL.createObjectURL(file);
            variable.value = file;
        };



        const addNewRecipe = async () => {
            try {
                const recipeData = {
                    title: title.value,
                    description: description.value,
                    ingredients: [ingredients.value, ingredients_1.value],
                    instructions: instructions.value,
                    personne: personne.value,
                    preparation: preparation.value,
                    cuisson: cuisson.value,
                    cuisine: cuisine.value,
                    categorie: categorie.value,
                };

                await addRecipe(recipeData, variable.value);
                console.log('Recipe added successfully');
            } catch (err) {
                console.log('Erreur lors de l\'ajout de la recette:', err);
            }
        };




        return {
            title,
            image,
            description,
            ingredients,
            ingredients_1,
            instructions,
            personne,
            preparation,
            cuisson,
            cuisine,
            categorie,
            onFileChange,
            openFilePicker,
            addNewRecipe
        }
    }

}
</script>

<style></style>