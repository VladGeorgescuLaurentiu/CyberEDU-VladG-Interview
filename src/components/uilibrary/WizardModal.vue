<script setup lang="ts">
import Wizard from '../../components/wizard/Wizard.vue'

interface WizardConfiguration {
    stepName: string;
}
const wizardConfig = [
    { stepName: 'General Info', componentName: 'Step1' },
    { stepName: 'Description', componentName: 'Step2' },
    { stepName: 'Add Exercices', componentName: 'Step3' },
    { stepName: 'Summary', componentName: 'Summary' }
]


</script>

<template>
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title h4" id="myLargeModalLabel">Create your event</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <Wizard :configuration="wizardConfig" />
                </div>
            </div>
        </div>
    </div>
</template>