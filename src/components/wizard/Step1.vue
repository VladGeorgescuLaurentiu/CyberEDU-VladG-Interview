<script setup lang="ts">
import { ref, reactive } from 'vue'
import CustomTextbox from '../../components/uilibrary/CustomTextbox.vue'
import { Step1ValidationSchema } from '../../models/EventDTO'
import { useServiceStore } from "../../stores/serviceStore";

const serviceStore = useServiceStore();

const eventDTO = reactive({ ...serviceStore.currentEvent })

const validationErrors = ref<{ [key: string]: string }>({});

async function validateAndNext() {
    try {
        await Step1ValidationSchema.validate(eventDTO, { abortEarly: false });
        serviceStore.updateCurrentEvent(eventDTO);
        validationErrors.value = {};
        serviceStore.incrementWizardStep();
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            validationErrors.value = err.inner.reduce((errors: { [key: string]: string }, error: any) => {
                errors[error.path] = error.message;
                return errors;
            }, {});
        }
    }
}

</script>

<template>
    <div>
        <CustomTextbox v-model:model-value="eventDTO.name" uniqueid="textbox1" custom-type="textbox" label="Name" />
        <p class="error-message" v-if="validationErrors.name">{{ validationErrors.name }}</p>

        <CustomTextbox v-model:model-value="eventDTO.description" uniqueid="textarea1" custom-type="textarea"
            label="Description" />
        <p class="error-message" v-if="validationErrors.description">{{ validationErrors.description }}</p>

        <CustomTextbox v-model:model-value="eventDTO.subdomain" uniqueid="textbox2" custom-type="textbox"
            label="Subdomain" />
        <p class="error-message" v-if="validationErrors.subdomain">{{ validationErrors.subdomain }}</p>

        <button @click="validateAndNext" class="btn btn-info btn-lg btn-block">Next</button>
    </div>
</template>

<style>
.error-message {
    color: red;
}
</style>