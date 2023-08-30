<template>
    <label class="row h4 ml-3 mb-3 mt-4" v-if="props.label"> <b>{{ props.label }}</b> </label>
    <div class="dropdown ml-3">
        <div class="selected-values" @click="isOpen = !isOpen">
            <div class="selected-value">
                {{ title }}
            </div>
        </div>
        <div class="options" v-if="isOpen">
            <div v-for="option in availableOptions" :key="option" @click="toggleOption(option)"
                :class="{ 'option-row': true, 'selected': selectedValues.includes(option) }">
                {{ option }}
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

interface MultipleSelectProps {
    availableOptions: string[];
    modelValue: string[];
    maxSelection: number;
    label: string
}

const props: MultipleSelectProps = defineProps({
    availableOptions: {
        type: Array as () => string[],
        required: true
    },
    modelValue: {
        type: Array as () => string[],
        required: true
    },
    maxSelection: {
        type: Number,
        default: Infinity
    },
    label: {
        type: String,
        required: false,
        default: null
    }
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedValues = ref<string[]>(props.modelValue);

const title = computed(() => {
    if (selectedValues.value.length === 0) {
        return 'Select options'
    }
    else if (selectedValues.value.length > 3) {
        return `${selectedValues.value.length} Selected`
    }
    else {
        return selectedValues.value.join(', ')
    }
})

onMounted(() => {
    const closeDropdown = (event: MouseEvent) => {
        if (!(event.target as HTMLElement).closest('.dropdown')) {
            isOpen.value = false;
        }
    };

    window.addEventListener('click', closeDropdown);
    onUnmounted(() => {
        window.removeEventListener('click', closeDropdown);
    });
});

const toggleOption = (option: string) => {
    if (selectedValues.value.includes(option)) {
        selectedValues.value = selectedValues.value.filter(value => value !== option);
        emit("update:modelValue", selectedValues.value);
    } else {
        if (selectedValues.value.length - 1 < props.maxSelection) {
            selectedValues.value.push(option);
        }
        emit("update:modelValue", selectedValues.value);
    }
};

</script>
  
<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
    background-color: #333;
    border-radius: 5px;
    color: white;
    width: 300px;
}

.selected-values {
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.selected-value {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6 15px;
}

.remove {
    display: none;
}

.placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.options {
    max-height: 300px;
    overflow-y: scroll;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #333;
    border-radius: 5px;
    color: white;
    z-index: 10;
}

.option-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.option-row:hover {
    background-color: #444;
}

.option-row.selected {
    background-color: #1976D2;
    color: white;
}
</style>
  