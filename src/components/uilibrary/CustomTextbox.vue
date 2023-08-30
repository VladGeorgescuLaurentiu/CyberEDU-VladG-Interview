<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    uniqueid: {
        type: String,
        required: true,
    },
    modelValue: {
        type: [String, Number],
        required: false,
    },
    customType: {
        type: String,
        required: false,
        default: 'textbox'
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

</script>

<template>
    <label v-if="props.label"> <b>{{ props.label }}</b> </label>

    <div v-if="props.customType === 'time'">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="icon-clock"></i></span>
            </div>
            <input v-model="model" type="text" class="form-control time24" placeholder="Ex: 23:59">
        </div>
    </div>

    <div v-if="props.customType === 'email'">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-envelope-o"></i></span>
            </div>
            <input v-model="model" type="text" class="form-control email" placeholder="Ex: example@example.com">
        </div>
    </div>

    <div v-if="props.customType === 'textarea'">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-desktop"></i></span>
            </div>
            <textarea v-model="model" class="form-control"></textarea>
        </div>
    </div>

    <div v-if="props.customType === 'textbox'">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-desktop"></i></span>
            </div>
            <input v-model="model" type="text" class="form-control">
        </div>
    </div>
</template>
