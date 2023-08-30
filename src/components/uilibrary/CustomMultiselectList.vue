<template>
    <div class="container">
        <div class="list-container">
            <div class="button-list">
                <div v-for="button in availableButtons" :key="button.id" @click="toggleButton(button.title)"
                    :class="{ 'button-row': true, 'selected': selectedButtons.includes(button.title), 'blue': selectedInFirst.includes(button.title) }">
                    {{ button.title }}
                </div>
            </div>
            <div class="mt-4 text-info">
                {{ availableButtons.length }} items
            </div>
        </div>
        <div class="list-container">
            <div class="button-list">
                <div v-for="button in selectedButtons" :key="button" @click="removeFromSelected(button)" class="button-row">
                    {{ button }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface ChallengeSummary {
    id: number;
    title: string;
    difficulty: string;
    points: string;
    tags: Array<any>;
    uniqueTagType: Array<string>;
    uniqueTagNames: Array<string>;
}

interface MyComponentProps {
    availableButtons: ChallengeSummary[];
    modelValue: string[];
    maxSelection: number; // New prop for maximum selection count
}

const props = defineProps({
    availableButtons: {
        type: Array as () => ChallengeSummary[],
        required: true
    },
    modelValue: {
        type: Array as () => string[],
        required: true
    },
    maxSelection: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(["update:modelValue"]);

const selectedButtons = ref<string[]>([]);
const selectedInFirst = ref<string[]>([]);

const toggleButton = (button: string) => {
    if (selectedButtons.value.includes(button)) {
        selectedButtons.value = selectedButtons.value.filter(b => b !== button);
        selectedInFirst.value = selectedInFirst.value.filter(b => b !== button);
        emit("update:modelValue", selectedButtons.value);
    } else {
        if (selectedInFirst.value.length < props.maxSelection) { // Check maximum selection count
            selectedButtons.value.push(button);
            selectedInFirst.value.push(button);
            emit("update:modelValue", selectedButtons.value);
        }
    }
};

const removeFromSelected = (button: string) => {
    selectedButtons.value = selectedButtons.value.filter(b => b !== button);
    selectedInFirst.value = selectedInFirst.value.filter(b => b !== button);
    emit("update:modelValue", selectedButtons.value);
};

</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.list-container {
    width: 48%;
    background-color: #333;
    border-radius: 5px;
    color: white;
    padding: 10px;
}

.button-list {
    max-height: 200px;
    overflow-y: scroll;
}

.button-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    /* Add border between rows */
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

.button-row:hover {
    background-color: #444;
}

.button-row.selected {
    background-color: #333;
    color: white;
}

.button-list .button-row.selected:hover {
    background-color: #333;
}

.blue {
    background-color: #1976D2 !important;
}
</style>
