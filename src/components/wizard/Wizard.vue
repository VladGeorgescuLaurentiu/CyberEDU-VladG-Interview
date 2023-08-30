<script setup lang="ts">
import { useServiceStore } from "../../stores/serviceStore";
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'

const serviceStore = useServiceStore();

interface WizardConfiguration {
    stepName: string;
    componentName: string;
}

const props = defineProps({
    configuration: {
        type: Array<WizardConfiguration>,
        required: true,
    },
})

function onStepNavicationClick(index: number) {
    if (index <= serviceStore.currentWizardStep) {
        serviceStore.setCurrentWizardStep(index)
    }
}

</script>

<template>
    <div>
        <div class="modal-body text-uppercase font-weight-bold d-flex justify-content-center">
            <span v-for="(x, index) in props.configuration">
                <span @click="onStepNavicationClick(index)" class="d-none d-lg-inline"
                    :style="index <= serviceStore.currentWizardStep ? index === serviceStore.currentWizardStep ? 'cursor: pointer; color: #17C2D7;' : 'cursor: pointer;' : ''"
                    :disabled="index <= serviceStore.currentWizardStep ? false : true">
                    {{ x.stepName }}
                    <span class="d-lg-none">{{ x.stepName }}</span>
                    <span v-if="index !== props.configuration.length - 1" class="m-r-10 m-l-10">
                        •
                    </span>
                </span>
            </span>
        </div>

        <component :is="props.configuration[serviceStore.currentWizardStep].componentName" />
    </div>
</template>