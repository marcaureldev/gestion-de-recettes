// composables/useInputs.js
import { ref } from 'vue';

export default function useInputs() {
    const inputs = ref([{ id: Date.now(), value: '' }]);

    const addInput = () => {
        inputs.value.push({ id: Date.now(), value: '' });
    };

    const removeInput = (id) => {
        inputs.value = inputs.value.filter(input => input.id !== id);
    };

    return {
        inputs,
        addInput,
        removeInput
    };
}
