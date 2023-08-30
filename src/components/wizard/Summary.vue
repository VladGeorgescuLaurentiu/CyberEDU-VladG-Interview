<script setup lang="ts">
import EventDTO from "@/models/EventDTO";
import { useServiceStore } from "../../stores/serviceStore";

const serviceStore = useServiceStore();

async function onSubmit() {
    serviceStore.addEventToList(serviceStore.currentEvent);
    serviceStore.currentWizardStep = 0;
    serviceStore.currentEvent = new EventDTO();
}

</script>

<template>
    <div class="table-responsive mt-2">
        <table class="table">
            <tbody>
                <tr v-for="(value, key) in serviceStore.currentEvent" :key="key">
                    <td class="text-uppercase text-info">{{ key }}</td>
                    <td>{{ value }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <button @click="onSubmit" class="btn btn-success btn-lg btn-block mt-3">Submit</button>
</template>
