<script setup lang="ts">
import { ref, watch, computed, reactive } from 'vue'
import { useServiceStore } from "../../stores/serviceStore";
import CustomMultiselectList from '../uilibrary/CustomMultiselectList.vue'
import CustomMultiselectDropdown from '../uilibrary/CustomMultiselectDropdown.vue'
import { ChallengesJSON } from '../../constants/ChallengesJSON'

const serviceStore = useServiceStore();

const eventDTO = reactive({ ...serviceStore.currentEvent })

interface ChallengeSummary {
    id: number;
    title: string;
    difficulty: string;
    points: string;
    tags: Array<any>;
    uniqueTagType: Array<string>;
    uniqueTagNames: Array<string>;
}

//initialization from ChallengesJSON.ts
const challengeSummaryList = ChallengesJSON.map((x: any) => {
    return {
        id: x.id,
        title: x.title,
        difficulty: x.difficulty,
        points: x.points,
        tags: x.tags,
        uniqueTagType: removeDuplicates(x.tags.map((y: any) => { return y.type })),
        uniqueTagNames: removeDuplicates(x.tags.map((y: any) => { return y.name }))
    }
})
let skillFilteredList = ref(ChallengesJSON.map((x: any) => {
    return {
        id: x.id,
        title: x.title,
        difficulty: x.difficulty,
        points: x.points,
        tags: x.tags,
        uniqueTagType: removeDuplicates(x.tags.map((y: any) => { return y.type })),
        uniqueTagNames: removeDuplicates(x.tags.map((y: any) => { return y.name }))
    }
}))
let diffTagFilteredList = ref(ChallengesJSON.map((x: any) => {
    return {
        id: x.id,
        title: x.title,
        difficulty: x.difficulty,
        points: x.points,
        tags: x.tags,
        uniqueTagType: removeDuplicates(x.tags.map((y: any) => { return y.type })),
        uniqueTagNames: removeDuplicates(x.tags.map((y: any) => { return y.name }))
    }
}))

let filterType = ref('');

const selectedSkills = ref<string[]>([]);
const selectedDifficultes = ref<string[]>([]);
const selectedTags = ref<string[]>([]);

const selectedSkillChallenges = ref([]);
const selectedDiffTagChallenges = ref([]);


const selectedSkillsLength = computed(() => {
    return selectedSkills.value.length
})
const selectedDifficultiesLength = computed(() => {
    return selectedDifficultes.value.length
})
const selectedTagsLength = computed(() => {
    return selectedTags.value.length
})
const error = computed(() => {
    if (filterType.value === '') return ''
    if (filterType.value === 'skills') {
        if (selectedSkillChallenges.value.length < 1) return 'Select at least one challenge'
    }
    if (filterType.value === 'diffTags') {
        if (selectedDifficultes.value.length === 0) return 'Select at least one difficulty'
        if (selectedTags.value.length < 1) return 'Select at least one tag'
        if (selectedDiffTagChallenges.value.length === 0) return 'Select at least one challenge'
    }
    return ''
})


watch(selectedSkillsLength, () => {
    skillFilteredList.value = challengeSummaryList.filter((x) => {
        return filterSKillArray(selectedSkills.value, x.uniqueTagType)
    })
});
watch(selectedDifficultiesLength, () => {
    diffTagFilteredList.value = challengeSummaryList.filter((x) => {
        return filterDiffTagArray(selectedTags.value, selectedDifficultes.value, x)
    })
});
watch(selectedTagsLength, () => {
    diffTagFilteredList.value = challengeSummaryList.filter((x) => {
        return filterDiffTagArray(selectedTags.value, selectedDifficultes.value, x)
    })
});



function choseFilter(type: string) {
    filterType.value = type
}

function removeDuplicates(arr: any) {
    let unique = arr.reduce(function (acc: any, curr: any) {
        if (!acc.includes(curr))
            acc.push(curr);
        return acc;
    }, []);
    return unique;
}

function filterSKillArray(skillArray: string[], uniqueTagTypeArray: string[]): boolean {
    if (skillArray.length === 0) return true
    const filtered = skillArray.filter(item =>
        uniqueTagTypeArray.includes(item)
    );

    return filtered.length > 0;
}

function filterDiffTagArray(tagArray: string[], diffArray: string[], challengeSummary: ChallengeSummary): boolean {
    if (tagArray.length === 0 && diffArray.length === 0) return true

    if (tagArray.length === 0) {
        return diffArray.includes(challengeSummary.difficulty)
    }

    if (diffArray.length === 0) {
        return tagArray.filter(item => challengeSummary.uniqueTagNames.includes(item)).length > 0;
    }

    const filtered1 = tagArray.filter(item =>
        challengeSummary.uniqueTagNames.includes(item)
    );

    const filtered2 = diffArray.includes(challengeSummary.difficulty)

    if (filtered1.length !== 0 && filtered2) return true

    return false
}

const selectedValues = ref([]);

async function validateAndNext() {
    if (filterType.value === 'skills') {
        eventDTO.exercices = selectedSkillChallenges.value
    }
    else {
        eventDTO.exercices = selectedDiffTagChallenges.value
    }

    serviceStore.updateCurrentEvent(eventDTO);
    serviceStore.incrementWizardStep();
}



</script>

<template>
    <div>
        <h4 class="text-center mt-4">Choose the filter option you want </h4>
        <div class="full-width-container mb-4">
            <button @click="choseFilter('skills')" type="button"
                :class="`btn btn-outline-warning btn-lg full-width-button ${filterType === 'skills' ? 'active' : ''}`">Skill
                Filter</button>
            <button @click="choseFilter('diffTags')" type="button"
                :class="`btn btn-outline-success btn-lg full-width-button ${filterType === 'diffTags' ? 'active' : ''}`">Difficulties
                &
                Tags Filter</button>
        </div>

        <section v-if="filterType === 'skills'">
            <CustomMultiselectDropdown v-model="selectedSkills" :availableOptions="serviceStore.getSkillsOptions"
                :initialValue="selectedValues" label="Select Skills" />

            <CustomMultiselectList v-model="selectedSkillChallenges" :availableButtons="skillFilteredList" :maxSelection="5"
                class="mt-4" />
            <div class="help-message text-warning mt-4 ml-3 ">
                You can select maximum 5 Challenges
            </div>
        </section>

        <section v-if="filterType === 'diffTags'">
            <CustomMultiselectDropdown v-model="selectedDifficultes" :availableOptions="serviceStore.getDifficultiesOptions"
                :initialValue="selectedValues" label="Select Difficulties" />

            <CustomMultiselectDropdown v-model="selectedTags" :availableOptions="serviceStore.getTagOptions"
                :initialValue="selectedValues" label="Select tags" />

            <CustomMultiselectList v-model="selectedDiffTagChallenges" :availableButtons="diffTagFilteredList"
                :maxSelection="5" class="mt-4" />
            <div class="help-message text-warning mt-4 ml-3 ">
                You can select maximum 5 Challenges
            </div>
        </section>

        <div class="error-message text-danger mt-4 ml-3 ">
            {{ error }}
        </div>

        <button v-if="error === ''" @click="validateAndNext" class="btn btn-info btn-lg btn-block mt-4"
            :disabled="filterType === ''">Next</button>
    </div>
</template>

<style scoped>
.full-width-container {
    display: flex;
    width: 100%;
}

.full-width-button {
    flex: 1;
    margin: 10px;
}

.error-message {
    font-size: 16px;
}

.help-message {
    font-size: 16px;
}
</style>
