<template>
  <header class="font-medium p-4 max-w-70 mx-auto">
    <NavSuccess />
  </header>

  <!-- Conteneur principal avec espacement responsive -->
  <div class="max-w-70 mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Toutes les Recettes</h1>
      <NuxtLink
        to="/add-recipes"
        class="bg-brown_color font-bold px-4 py-2 rounded-md hover:bg-opacity-90"
        style="color: white"
      >
        Ajouter une recette
      </NuxtLink>
    </div>

    <!-- État de chargement avec spinner animé -->
    <div v-if="loading" class="flex justify-center items-center py-12 h-[60vh]">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-brown_color"
      ></div>
    </div>

    <!-- État d'erreur avec bouton de réessai -->
    <div v-else-if="error" class="text-center py-12 h-[60vh]">
      <p class="text-rouge text-lg">{{ error }}</p>
      <button
        @click="fetchRecipes"
        class="mt-4 text-brown_color hover:underline"
      >
        Réessayer
      </button>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Carte de recette -->
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div
          class="w-full h-48 bg-no-repeat bg-cover bg-center"
          :style="{ backgroundImage: `url(${recipe.imageURL})` }"
        ></div>

        <div class="p-4">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">
            {{ recipe.title }}
          </h2>
          <p class="text-gray-600 text-sm mb-4 truncate">
            {{ recipe.description }}
          </p>

          <div class="flex items-center justify-between">
            <!-- Informations sur l'auteur -->
            <div class="flex items-center space-x-2">
              <div
                class="w-12 h-12 rounded-full bg-center bg-cover"
                :style="{ backgroundImage: `url(${recipe.author.photoURL})` }"
              ></div>
              <div>
                <span class="text-sm text-gray-600">{{
                  recipe.author.displayName.charAt(0).toUpperCase() +
                  recipe.author.displayName.slice(1)
                }}</span>
                <p class="text-xs" style="color: #b55d51">
                  {{ recipe.createdAt }}
                </p>
              </div>
            </div>
            <!-- Lien vers le détail de la recette -->
            <NuxtLink
              :to="'/recipe/' + recipe.id"
              class="text-brown_color hover:underline text-sm"
            >
              Voir plus
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- État vide - Aucune recette -->
    <div
      v-if="!loading && !error && recipes.length === 0"
      class="text-center py-12 h-[60vh]"
    >
      <p class="text-gray-600 text-lg">Aucune recette trouvée</p>
      <NuxtLink
        to="/add-recipes"
        class="mt-4 inline-block text-brown_color hover:underline"
      >
        Ajouter votre première recette
      </NuxtLink>
    </div>
  </div>

  <!-- Pied de page -->
  <section class="p-8 bg-gray">
    <Footer />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

/**
 * @typedef {Object} Author
 * @property {string} displayName - Nom d'affichage de l'auteur
 * @property {string} photoURL - URL de la photo de profil de l'auteur
 */

/**
 * @typedef {Object} Recipe
 * @property {string} id - Identifiant unique de la recette
 * @property {string} title - Titre de la recette
 * @property {string} description - Description de la recette
 * @property {string} imageURL - URL de l'image de couverture
 * @property {Author} author - Informations sur l'auteur
 * @property {string} createdAt - Date de création formatée
 */

/**
 * @type {import('vue').Ref<Recipe[]>}
 * @description Liste réactive des recettes
 */
const recipes = ref([]);

/**
 * @type {import('vue').Ref<boolean>}
 * @description État de chargement des recettes
 */
const loading = ref(true);

/**
 * @type {import('vue').Ref<string|null>}
 * @description Message d'erreur en cas d'échec du chargement
 */
const error = ref(null);

/**
 * @async
 * @function fetchRecipes
 * @description Récupère toutes les recettes depuis l'API et met à jour l'état local
 * @throws {Error} En cas d'erreur lors de la récupération des recettes
 */
const fetchRecipes = async () => {
  try {
    loading.value = true;
    error.value = null;

    recipes.value = await getAllRecipes();
    console.log(recipes.value);
  } catch (err) {
    console.error("Erreur:", err);
    error.value = "Une erreur est survenue lors du chargement des recettes";
  } finally {
    loading.value = false;
  }
};

// Charge les recettes au montage du composant
onMounted(() => {
  fetchRecipes();
});
</script>
