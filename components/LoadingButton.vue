<template>
  <button
    style="color: white"
    :class="[
      'relative flex items-center justify-center px-6 py-3 rounded-md transition-all duration-300',
      isLoading || isSuccess ? 'bg-opacity-70 cursor-not-allowed' : '',
      isSuccess ? 'bg-green-500' : 'bg-brown_color',
    ]"
    :disabled="isLoading || isSuccess"
    @click="$emit('click')"
  >
    <!-- Texte normal -->
    <span
      :class="[
        'text-white font-medium transition-opacity duration-300',
        isLoading || isSuccess ? 'opacity-0' : 'opacity-100',
      ]"
    >
      <slot></slot>
    </span>

    <!-- Loader -->
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <LoaderIcon class="animate-spin h-5 w-5" />
    </div>

    <!-- Icône de succès -->
    <div
      v-if="isSuccess"
      class="absolute inset-0 flex items-center justify-center"
    >
      <SuccesIcon />
    </div>
  </button>
</template>

<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  isSuccess: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["click"]);
</script>
