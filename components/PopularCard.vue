<template>
  <div>
    <div
      class="w-[10em] h-[10em] rounded-[5em] bg-cover bg-center bg-no-repeat animation"
      :style="{ backgroundImage: popular.backgroundImage }"
    ></div>
    <p class="text-center">{{ popular.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    popular: Object,
  },
};
</script>

<style>
.animation {
  background-size: 15em;
  transition: background-size 0.5s ease-in-out;
}

.animation:hover {
  background-size: 20em;
}
</style>
