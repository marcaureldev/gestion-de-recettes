<template>
  <header class="font-medium p-4 max-w-70 mx-auto">
    <NavSuccess />
  </header>

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

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12 h-[60vh]">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-brown_color"
      ></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12 h-[60vh]">
      <p class="text-rouge text-lg">{{ error }}</p>
      <button
        @click="fetchRecipes"
        class="mt-4 text-brown_color hover:underline"
      >
        Réessayer
      </button>
    </div>

    <!-- Recipes Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div
          class="w-full h-48 bg-no-repeat bg-cover bg-center"
          :style="{ backgroundImage: `url(${recipe.imageURL})` }"
        ></div>
        <!-- <img
          :src="recipe.imageURL"
          :alt="recipe.title"
          class="w-full h-48 object-cover"
        /> -->
        <div class="p-4">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">
            {{ recipe.title }}
          </h2>
          <p class="text-gray-600 text-sm mb-4 line-clamp-2">
            {{ recipe.description }}
          </p>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <img
                :src="recipe.authorPhotoURL || '/images/default-avatar.png'"
                :alt="recipe.authorName"
                class="w-8 h-8 rounded-full"
              />
              <span class="text-sm text-gray-600">{{ recipe.authorName }}</span>
            </div>
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

    <!-- Empty State -->
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

  <section class="p-8 bg-gray">
    <Footer />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const recipes = ref([]);
const loading = ref(true);
const error = ref(null);

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

onMounted(() => {
  fetchRecipes();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
