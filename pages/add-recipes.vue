<template>
  <div>
    <!-- =============================== HEADER SECTION ========================================= -->
    <header class="font-medium p-4 max-w-70 mx-auto">
      <NavSuccess />
    </header>

    <!-- =============================== Formulaire d'ajout de recettes ========================================= -->
    <section>
      <hr style="margin: auto" class="border-brown_color" />
      <div
        class="flex justify-between items-center px-4 py-3 mt-5 max-w-70 mx-auto"
      >
        <h1 class="text-xl font-bold">Créer une nouvelle recette</h1>
        <LoadingButton
          style="color: white"
          @click="addNewRecipe"
          :isLoading="isLoading"
          :isSuccess="isSuccess"
        >
          {{ register }}
        </LoadingButton>
      </div>
      <hr style="margin: auto" class="border-brown_color" />

      <div class="max-w-70 mx-auto p-8 space-y-5">
        <!-- ===== title ===== -->
        <div class="w-full px-3 sm:w-1/2 mx-auto">
          <div class="">
            <label for="title" class="mb-3 block text-base">
              Nom de la recette:
            </label>
            <input
              type="text"
              name="title"
              id="recipe-name"
              placeholder="Nom de la recette"
              v-model="recipeName"
              class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md"
            />
          </div>
        </div>

        <!-- ===== Image de la recette ===== -->
        <div class="w-full px-3 sm:w-1/2 mx-auto">
          <div class="">
            <p class="mb-3 block text-base">Image de la recette:</p>
            <div
              class="flex justify-center items-center mb-3 w-full h-40 rounded-md border border-brown_color shadow-md"
            >
              <img
                v-if="image"
                :src="image"
                class="w-full h-full object-cover"
              />
              <CameraIcon v-else class="size-10" style="color: #b55d51" />
            </div>
            <div
              class="flex justify-center items-center w-20 h-16 border border-brown_color rounded-md"
            >
              <div @click="openFilePicker">
                <CameraIcon class="size-8 mx-auto" style="color: #b55d51" />
                <p class="text-sm">Ajouter</p>
              </div>
            </div>
            <input
              type="file"
              id="fileInput"
              class="hidden"
              @change="onFileChange"
            />
          </div>
        </div>

        <!-- ===== description ===== -->
        <div class="w-full px-3 sm:w-1/2 mx-auto">
          <div class="">
            <label for="description" class="mb-3 block text-base">
              Description:
            </label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Ajoutez une brève description de la recette"
              v-model="description"
              maxlength="250"
              class="mb-3 w-full rounded-md border border-brown_color py-3 px-6 outline-none shadow-md"
            />
            <p class="text-gray_color text-end">
              {{ description.length }} / 250
            </p>
          </div>
        </div>

        <!-- ===== ingredients ===== -->
        <div class="w-full px-3 sm:w-1/2 mx-auto">
          <div class="">
            <label for="ingredients" class="mb-3 block text-base">
              Ingrédients:
            </label>
            <input
              type="text"
              name="ingredient"
              id="ingredient"
              placeholder="Ajouter un ingrédient"
              v-model="ingredient"
              class="mb-4 w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md"
            />

            <div v-for="(input, index) in ingredients" :key="input.id">
              <div class="flex items-center">
                <input
                  type="text"
                  v-model="input.value"
                  placeholder="Ajouter un ingrédient"
                  class="mb-4 w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md"
                />
                <button
                  @click="removeIngredient(input.id)"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <DeleteIcon class="text-brown_color size-5" />
                </button>
              </div>
            </div>
            <button
              @click="addIngredient"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              <AddIcon class="text-brown_color size-5" />
            </button>
          </div>
        </div>

        <!-- ===== instructions ===== -->
        <div class="w-full px-3 sm:w-1/2 mx-auto">
          <div class="">
            <label for="instructions" class="mb-3 block text-base">
              Instuctions:
            </label>
            <input
              type="text"
              name="instructions"
              id="instructions"
              placeholder="Instructions"
              v-model="instruction"
              class="mb-4 w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md"
            />
            <div v-for="(input, index) in instructions" :key="input.id">
              <div class="flex items-center">
                <input
                  type="text"
                  v-model="input.value"
                  placeholder="Instructions"
                  class="mb-4 w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md"
                />
                <button
                  @click="removeInstruction(input.id)"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <DeleteIcon class="text-brown_color size-5" />
                </button>
              </div>
            </div>
            <button
              @click="addInstruction"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              <AddIcon class="text-brown_color size-5" />
            </button>
          </div>
        </div>

        <!-- ===== personne ===== -->
        <div class="w-full px-3 sm:w-1/2 mx-auto">
          <div class="">
            <label for="personne" class="mb-3 block text-base">
              Nombre de personnes:
            </label>
            <input
              type="text"
              name="personne"
              id="personne"
              v-model="personne"
              placeholder="Cette recette peut nourrir combien de personnes"
              class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md"
            />
          </div>
        </div>

        <!-- ===== préparation ===== -->
        <div class="w-full px-3 sm:w-1/2 mx-auto">
          <div class="">
            <label for="preparation" class="mb-3 block text-base">
              Temps de préparation:
            </label>
            <input
              type="text"
              name="preparation"
              id="preparation"
              v-model="preparation"
              placeholder="Temps de préparation"
              class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md"
            />
          </div>
        </div>

        <!-- ===== cuisson ===== -->
        <div class="w-full px-3 sm:w-1/2 mx-auto">
          <div class="">
            <label for="cuisson" class="mb-3 block text-base">
              Temps de cuisson:
            </label>
            <input
              type="text"
              name="cuisson"
              id="cuisson"
              v-model="cuisson"
              placeholder="Temps de cuisson"
              class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md"
            />
          </div>
        </div>

        <!-- ===== cuisine ===== -->
        <div class="w-full px-3 sm:w-1/2 mx-auto">
          <div class="">
            <label for="cuisine" class="mb-3 block text-base"> Cuisine: </label>
            <input
              type="text"
              name="cuisine"
              id="cuisine"
              v-model="cuisine"
              placeholder="Cuisine"
              class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md"
            />
          </div>
        </div>

        <!-- ===== categorie ===== -->
        <div class="w-full px-3 sm:w-1/2 mx-auto">
          <div class="">
            <label for="categorie" class="mb-3 block text-base">
              Catégorie:
            </label>
            <input
              type="text"
              name="categorie"
              id="categorie"
              v-model="categorie"
              placeholder="Categorie"
              class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md"
            />
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
import { ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      register: "Enrégistrer",
    };
  },

  setup() {
    const router = useRouter();
    const recipeName = ref("");
    const image = ref("");
    const description = ref("");
    const ingredient = ref("");
    const instruction = ref("");
    const personne = ref("");
    const preparation = ref("");
    const cuisson = ref("");
    const cuisine = ref("");
    const categorie = ref("");
    const variable = ref(null);
    const ingredients = ref([{ id: Date.now(), value: "" }]);
    const instructions = ref([{ id: Date.now(), value: "" }]);
    const createdAt = ref(Date.now());
    const currentUser = ref(null);
    const userPhotoURL = ref(null);
    const userName = ref(null);

    // États pour le bouton de chargement
    const isLoading = ref(false);
    const isSuccess = ref(false);

    onMounted(() => {
      const auth = getAuth();
      
      // Utiliser onAuthStateChanged pour gérer l'état de l'authentification
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // L'utilisateur est connecté
          currentUser.value = user;
          try {
            const userData = await getUserData(user.uid);
            userPhotoURL.value = userData?.photoURL || user.photoURL;
            userName.value = userData?.displayName || user.displayName || user.email.split('@')[0];
            userCreatedAt.value = userData?.createdAt || null;
          } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur:", error);
          }
        } else {
          // L'utilisateur n'est pas connecté
          router.push('/login');
        }
      });
    });

    const openFilePicker = () => {
      document.getElementById("fileInput").click();
    };

    const onFileChange = (e) => {
      const file = e.target.files[0];
      image.value = URL.createObjectURL(file);
      variable.value = file;
    };

    const addIngredient = () => {
      ingredients.value.push({ id: Date.now(), value: "" });
    };

    const removeIngredient = (id) => {
      ingredients.value = ingredients.value.filter((input) => input.id !== id);
    };

    const addInstruction = () => {
      instructions.value.push({ id: Date.now(), value: "" });
    };

    const removeInstruction = (id) => {
      instructions.value = instructions.value.filter(
        (input) => input.id !== id
      );
    };

    const resetForm = () => {
      recipeName.value = "";
      description.value = "";
      ingredient.value = "";
      instruction.value = "";
      personne.value = "";
      preparation.value = "";
      cuisson.value = "";
      cuisine.value = "";
      categorie.value = "";
      variable.value = null;
      image.value = "";
      ingredients.value = [{ id: Date.now(), value: "" }];
      instructions.value = [{ id: Date.now(), value: "" }];
    };

    const addNewRecipe = async () => {
      try {
        isLoading.value = true;
        isSuccess.value = false;

        if (!currentUser.value) {
          error.value = "Vous devez être connecté pour ajouter une recette";
          return;
        }

        // Vérification des champs requis
        if (!recipeName.value || !description.value) {
          throw new Error("Veuillez remplir tous les champs requis.");
        }

        // Collecte des ingrédients dynamiques
        const allIngredients = [
          ingredient.value,
          ...ingredients.value.map((input) => input.value).filter(Boolean),
        ];

        // Collecte des instructions dynamiques
        const allInstructions = [
          instruction.value,
          ...instructions.value.map((input) => input.value).filter(Boolean),
        ];

        const recipeData = {
          recipeName: recipeName.value,
          description: description.value,
          ingredient: allIngredients,
          instruction: allInstructions,
          personne: personne.value,
          preparation: preparation.value,
          cuisson: cuisson.value,
          cuisine: cuisine.value,
          categorie: categorie.value,
          createdAt: createdAt.value,
          author: {
            uid: currentUser.value?.uid,
            photoURL: userPhotoURL.value,
            displayName: userName.value
          },
        };

        await addRecipe(recipeData, variable.value);
        isSuccess.value = true;

        // Réinitialiser le formulaire après 1.5 secondes
        setTimeout(() => {
          resetForm();
          isSuccess.value = false;
        }, 1500);
      } catch (err) {
        console.error("Erreur lors de l'ajout de la recette:", err.message);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      recipeName,
      image,
      description,
      ingredient,
      instruction,
      personne,
      preparation,
      cuisson,
      cuisine,
      categorie,
      variable,
      openFilePicker,
      onFileChange,
      addNewRecipe,
      ingredients,
      instructions,
      addIngredient,
      removeIngredient,
      addInstruction,
      removeInstruction,
      isLoading,
      isSuccess,
    };
  },
};
</script>

<style></style>
