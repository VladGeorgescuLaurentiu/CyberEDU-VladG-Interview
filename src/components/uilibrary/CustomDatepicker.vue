<script setup lang="ts">
import { ref, computed } from 'vue'
import Datepicker from 'vue3-datepicker'
import { enUS } from 'date-fns/locale'

const props = defineProps({
    uniqueid: {
        type: String,
        required: true,
    },
    modelValue: {
        type: [Date],
        required: false,
    },
    label: {
        type: String,
        required: false,
        default: null
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

const locale = computed(() => { return enUS })

</script>

<template>
    <label class="input-group mb-3" v-if="props.label">{{ props.label }}</label>
    <div class="input-group mb-4">
        <!-- <input v-model="model" data-provide="datepicker" data-date-autoclose="true" class="form-control"> -->

        <datepicker v-model="model" lang="fr" :locale="locale" type="date" :lowerLimit="new Date()">
        </datepicker>
    </div>
</template>