<template>
  <header class="font-medium p-4 max-w-70 mx-auto">
    <NavSuccess />
  </header>

  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        @click="fetchRecipe"
        class="mt-4 text-brown_color hover:underline"
      >
        Réessayer
      </button>
    </div>

    <!-- Recipe Details -->
    <div v-else-if="recipe" class="space-y-6">
      <div class="flex justify-between items-center">
        <NuxtLink to="/recipes" class="text-brown_color hover:underline">
          ← Retour aux recettes
        </NuxtLink>
      </div>

      <!-- Recipe Header -->
      <div class="relative">
        <div
          class="w-full h-80 bg-no-repeat bg-cover bg-center"
          :style="{ backgroundImage: `url(${recipe.imageURL})` }"
        ></div>
        <!-- <img
          :src="recipe.imageURL || '/images/default-recipe.jpg'"
          :alt="recipe.title"
          class="w-full h-80 object-cover rounded-lg shadow-md"
        /> -->
        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6"
        >
          <h1 class="text-3xl font-bold text-white">{{ recipe.title }}</h1>
        </div>
      </div>

      <!-- Author Info -->
      <div class="flex items-center space-x-4 py-4 border-b">
        <div
          class="w-12 h-12 bg-cover bg-center bg-no repeat rounded-full"
          :style="{ backgroundImage: `url(${recipe.author.photoURL})` }"
        ></div>

        <div>
          <p class="font-medium">{{ recipe.authorName }}</p>
          <p class="text-sm text-gray-600">Publié le {{ recipe.createdAt }}</p>
        </div>
      </div>

      <!-- Recipe Description -->
      <div class="prose max-w-none">
        <h2 class="text-xl font-semibold mb-2">Description</h2>
        <p class="text-gray-700">{{ recipe.description }}</p>
      </div>

      <!-- Ingredients -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Ingrédients</h2>
        <ul class="list-disc list-inside space-y-2">
          <li
            v-for="(ing, index) in recipe.ingredient"
            :key="index"
            class="text-gray-700"
          >
            {{ ing }}
          </li>
        </ul>
      </div>

      <!-- Instructions -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Instructions</h2>
        <ol class="list-decimal list-inside space-y-4">
          <li
            v-for="(inst, index) in recipe.instruction"
            :key="index"
            class="text-gray-700"
          >
            {{ inst }}
          </li>
        </ol>
      </div>

      <!-- Additional Info -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t">
        <div>
          <p class="text-sm text-gray-600">Temps de préparation</p>
          <p class="font-medium">{{ recipe.preparation }} min</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Temps de cuisson</p>
          <p class="font-medium">{{ recipe.cuisson }} min</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Portions</p>
          <p class="font-medium">{{ recipe.personne }} personnes</p>
        </div>
        <!-- <div>
          <p class="text-sm text-gray-600">Difficulté</p>
          <p class="font-medium">{{ recipe.difficulty }}</p>
        </div> -->
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="text-center py-12 h-[60vh]">
      <p class="text-gray-600 text-lg">Recette non trouvée</p>
      <NuxtLink
        to="/recipes"
        class="mt-4 inline-block text-brown_color hover:underline"
      >
        Retour à la liste des recettes
      </NuxtLink>
    </div>
  </div>

  <section class="p-8 bg-gray">
    <Footer />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getRecipeById } from "@/composables/useFirebaseAuth";

const route = useRoute();
const recipe = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchRecipe = async () => {
  try {
    loading.value = true;
    error.value = null;

    const recipeId = route.params.id;
    recipe.value = await getRecipeById(recipeId);
    console.log(recipe.value);

    if (!recipe.value) {
      error.value = "Recette non trouvée";
    }
  } catch (err) {
    console.error("Erreur:", err);
    error.value = "Une erreur est survenue lors du chargement de la recette";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRecipe();
});
</script>
