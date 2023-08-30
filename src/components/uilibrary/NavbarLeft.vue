<script setup lang="ts">
import { useServiceStore } from "../../stores/serviceStore";

const serviceStore = useServiceStore();

function handleCLick(event: any, route: string) {
    event.preventDefault();
    if (route === 'Details') {
        serviceStore.selectedRoute = 'Details'
    }
    if (route === 'Compete') {
        serviceStore.selectedRoute = 'Compete'
    }
}
</script>

<template>
    <div id="left-sidebar" class="sidebar">
        <div class="navbar-brand">
            <a href="index.html"><img src="https://api.cyber-edu.co/landing/images/cyberEDU-logo-alternative.svg"
                    class="img-fluid logo"><span>CyberEdu VladG </span></a>
            <button type="button" class="btn-toggle-offcanvas btn btn-sm float-right"><i
                    class="lnr lnr-menu icon-close"></i></button>
        </div>
        <div class="sidebar-scroll">
            <nav id="left-sidebar-nav" class="sidebar-nav">
                <ul id="main-menu" class="metismenu">
                    <li class="header">Main</li>
                    <li><a @click="handleCLick($event, 'Details')"
                            :class="`${serviceStore.selectedRoute === 'Details' ? 'active open' : ''}`"><i
                                class="icon-book-open"></i><span>Details</span></a>
                    </li>
                    <li><a @click="handleCLick($event, 'Compete')"
                            :class="`${serviceStore.selectedRoute === 'Compete' ? 'active open' : ''}`"><i
                                class="icon-game-controller"></i><span>Compete</span></a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>