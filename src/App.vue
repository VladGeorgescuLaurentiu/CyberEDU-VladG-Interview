<script setup lang="ts">

import NavbarLeft from './components/uilibrary/NavbarLeft.vue'
import NavbarTop from './components/uilibrary/NavbarTop.vue'
import Loader from './components/uilibrary/Loader.vue'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import { useServiceStore } from "./stores/serviceStore";

const serviceStore = useServiceStore();

const loading = false;

</script>

<template>
  <Loader v-if="loading" />
  <NavbarTop />
  <NavbarLeft />


  <div id="main-content">
    <div class="container-fluid">
      <HomeView v-if="serviceStore.selectedRoute === 'Details'" />
      <AboutView v-if="serviceStore.selectedRoute === 'Compete'" />

    </div>
  </div>
</template>

