<script setup lang="ts">
import { computed } from 'vue'

interface OptionData {
    text: string;
    value: string | number;
}

const props = defineProps({
    uniqueid: {
        type: String,
        required: true,
    },
    modelValue: {
        type: [Number, String],
        required: false,
    },
    label: {
        type: String,
        required: false,
        default: null
    },
    options: {
        type: Array<OptionData>,
        required: true
    }
})


const emit = defineEmits(["update:modelValue"]);
const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

</script>

<template>
    <div class="input-group mb-3">
        <label v-if="props.label"> <b>{{ props.label }}</b> </label>
        <div>
            <select v-model="model" class="custom-select ml-2" :id="uniqueid">
                <option v-for="option in options" :value="option.value">{{ option.text }}</option>
            </select>

        </div>
    </div>
</template>