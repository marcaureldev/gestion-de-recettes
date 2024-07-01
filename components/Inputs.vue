<!-- components/DynamicInputs.vue -->
<template>
  <div>
    <div v-for="input in inputs" :key="input.id" class="input-group flex justify-between items-center">
      <input type="text" v-model="input.value"
        class="w-full rounded-md border border-brown_color py-3 px-6 outline-none focus:shadow-md">
      <DeleteIcon class="size-5" style="color: #B55D51;" @click="removeInput(input.id)"/>
    </div>
    <AddIcon class="size-7" style="color: #B55D51;" @click="addInput"/>
  </div>
</template>

<script setup>
import useInputs from '@/composables/useInputs';

const { inputs, addInput, removeInput } = useInputs();
</script>

<style scoped>
.input-group {
  margin-bottom: 10px;
}
</style>
