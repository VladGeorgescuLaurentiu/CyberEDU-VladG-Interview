<script setup lang="ts">
import { ref } from 'vue';

interface ChallengesOptions {
    id: string,
    title: string,
    difficulty: string,
    points: string,
    tags: any
}

const props = defineProps({
    options: Array<ChallengesOptions>,
    value: Array,
    label: String
});

const selectedOptions = ref(props.value);

const emit = defineEmits();

const updateSelectedOptions = () => {
    emit('update:value', selectedOptions.value);
};
</script>
  


<template class="mt-4">
    <label>{{ props.label }}</label>
    <select id="optgroup" class="ms" multiple>
        <option v-for="option in options" :value="option.id" :key="option.id">{{ option.title
        }}
        </option>
    </select>
</template>
  