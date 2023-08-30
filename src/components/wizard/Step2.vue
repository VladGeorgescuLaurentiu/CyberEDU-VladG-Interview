<script setup lang="ts">
import { ref, reactive } from 'vue'

import CustomDatepicker from '../../components/uilibrary/CustomDatepicker.vue'
import RadioOption from '../../components/uilibrary/RadioOption.vue'
import Dropdown from '../../components/uilibrary/Dropdown.vue'
import CustomTextbox from '../../components/uilibrary/CustomTextbox.vue'

import { Step2ValidationSchema } from '../../models/EventDTO'
import { useServiceStore } from "../../stores/serviceStore";

const serviceStore = useServiceStore();

const eventDTO = reactive({ ...serviceStore.currentEvent })

const validationErrors = ref<{ [key: string]: string }>({});

async function validateAndNext() {
    try {
        await Step2ValidationSchema.validate(eventDTO, { abortEarly: false });
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


const maxNumberOptions = [
    { text: '2', value: 2 },
    { text: '3', value: 3 },
    { text: '4', value: 4 },
    { text: '5', value: 5 },
    { text: '6', value: 6 },
    { text: '7', value: 7 },
    { text: '8', value: 8 },
]

const rankingOptions = [
    { text: 'Public', value: 'Public' },
    { text: 'Restricted', value: 'Restricted' }
]

</script>


<template>
    <div>
        <div class="input-group mb-3 mt-4">
            <label class="input-label mr-2">Gameplay :</label>

            <RadioOption v-model:model-value="eventDTO.gameplay" uniqueid="radio1" :value="`Team`" name="gameplay"
                :class="eventDTO.gameplay === 'Team' ? 'active' : ''" />
            <RadioOption v-model:model-value="eventDTO.gameplay" uniqueid="radio2" :value="`Individual`" name="gameplay"
                :class="eventDTO.gameplay === 'Individual' ? 'active' : ''" />
        </div>
        <p class="error-message" v-if="validationErrors.gameplay">{{ validationErrors.gameplay }}</p>

        <div class="input-group mb-3 mt-4">
            <label class="input-label mr-2">Score option :</label>

            <RadioOption v-model:model-value="eventDTO.scoreOption" uniqueid="radio3" :value="`Dynamic`" name="scoreOption"
                :class="eventDTO.scoreOption === 'Dynamic' ? 'active' : ''" />
            <RadioOption v-model:model-value="eventDTO.scoreOption" uniqueid="radio4" :value="`Flat`" name="scoreOption"
                :class="eventDTO.scoreOption === 'Flat' ? 'active' : ''" />
        </div>
        <p class="error-message" v-if="validationErrors.scoreOption">{{ validationErrors.scoreOption }}</p>

        <div class="mb-3 mt-4 ">
            <CustomDatepicker v-model:model-value="eventDTO.startDate" uniqueid="datepiker1" label="Start Date" />
            <CustomDatepicker v-model:model-value="eventDTO.endDate" uniqueid="datepicker2" label="End Date" />
        </div>
        <p class="error-message" v-if="validationErrors.startDate">{{ validationErrors.startDate }}</p>
        <p class="error-message" v-if="validationErrors.endDate">{{ validationErrors.endDate }}</p>

        <div class="input-group mb-3 mt-3">
            <Dropdown v-model:model-value="eventDTO.maxPlayers" :options="maxNumberOptions" uniqueid="dropdownNumber"
                label="Max. players: " />
        </div>

        <div class="input-group mb-3">
            <Dropdown v-model:model-value="eventDTO.ranking" :options="rankingOptions" uniqueid="dropdownRanking"
                label="Ranking: " />
        </div>

        <div v-if="eventDTO.ranking === 'Restricted'">
            <CustomTextbox v-model:model-value="eventDTO.secret" uniqueid="textbox4" custom-type="textbox" label="Secret" />
        </div>

        <button @click="validateAndNext" class="btn btn-info btn-lg btn-block">Next</button>
    </div>
</template>

