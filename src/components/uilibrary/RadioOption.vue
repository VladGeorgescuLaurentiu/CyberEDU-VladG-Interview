<script setup lang="ts">
const props = defineProps({
    uniqueid: {
        type: String,
        required: true,
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    value: {
        type: [String, Number],
        required: true
    },
})

</script>

<template>
    <div class="btn btn-outline-info btn-sm text-uppercase mr-2">
        <label class="radio-button-label">
            <input :name="props.uniqueid" :value="props.value" type="radio" :checked="props.modelValue === props.value"
                @change="$emit('update:modelValue', value)" v-bind="$attrs">
            <span><i></i>{{ props.value }}</span>
        </label>
    </div>
</template>

<style scoped>
input[type="radio"] {
    visibility: hidden;
    height: 0;
    width: 0;
}

.radio-button-label {
    display: inline-block;
    cursor: pointer;
    padding: 0.15rem 0.35rem;
    font-size: 0.75rem;
    border: 1px solid transparent;
    transition: background-color 0.3s, border-color 0.3s;
}

.radio-button-label:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.2);
}
</style>


