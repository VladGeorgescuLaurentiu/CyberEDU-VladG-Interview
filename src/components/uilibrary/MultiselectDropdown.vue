<template>
    <div class="multiselect_div">
        <label class="mb-2 bt-2">{{ label }}</label>
        <select id="multiselect2" name="multiselect2[]" class="multiselect multiselect-custom" v-model="selectedOptions"
            multiple @input="updateSelectedOptions">
            <option v-for="option in options" :value="option">{{ option }}</option>
        </select>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    options: Array,
    value: Array,
    label: String
});

const selectedOptions = ref(props.value);

const emit = defineEmits();

const updateSelectedOptions = () => {
    emit('update:value', selectedOptions.value);
};
</script>
  