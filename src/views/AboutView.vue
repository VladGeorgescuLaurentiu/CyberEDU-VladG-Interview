<script setup lang="ts">
import WizardModal from '../components/uilibrary/WizardModal.vue'
import { useServiceStore } from "../stores/serviceStore";

const serviceStore = useServiceStore();

serviceStore.getLockConfigurationSummary()

</script>

<template>
  <main>
    <div class="row clearfix col-md-12">
      <div class="card">
        <div class="header">
          <h2>Cyber Security Competitions & Hacking Tournaments</h2>
        </div>
        <div class="body">
          <p>
            Grow your offensive and defensive skills by competing in our exciting hacking & Capture the Flag
            competitions. Contact us if you plan to organize a corporate event, a competition in your University or your
            Highschool. You can design your own challenges or you can let us manage your event.
          </p>
        </div>
      </div>
    </div>

    <button type="button" class="btn btn-round btn-info" data-toggle="modal" data-target=".bd-example-modal-lg">
      Create event
    </button>

    <WizardModal />

    <div class="col-lg-12 mt-4">
      <div class="card">
        <div class="header">
          <h2>Event List</h2>
        </div>
        <div class="body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>SUBDOMAIN</th>
                  <th>GAMEPLAY</th>
                  <th>SCOREOPTION</th>
                  <th>MAXPLAYERS</th>
                  <th>RANKING</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(el, index) in serviceStore.EventList" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ el.name }}</td>
                  <td>{{ el.description }}</td>
                  <td>{{ el.subdomain }}</td>
                  <td>{{ el.gameplay }}</td>
                  <td>{{ el.scoreOption }}</td>
                  <td>{{ el.maxPlayers }}</td>
                  <td>{{ el.ranking }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>

