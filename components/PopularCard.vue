<template>
    <div>
        <div class="w-[11em] h-[11em] rounded-[5.5em] bg-cover bg-center animation" :style="{ backgroundImage: popular.backgroundImage }"></div>
        <p class="text-center"> {{ popular.name }}</p>
    </div>
</template>

<script>
export default {
  props:{
    popular: Object,
  }
}

</script>

<style>
.animation:hover{
  background-size: 20em;
}
</style>