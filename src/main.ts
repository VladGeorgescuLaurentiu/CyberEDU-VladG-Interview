import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'


import Step1 from '../src/components/wizard/Step1.vue'
import Step2 from '../src/components/wizard/Step2.vue'
import Step3 from '../src/components/wizard/Step3.vue'
import Summary from '../src/components/wizard/Summary.vue'

const app = createApp(App)

app.use(createPinia())

app
    .component('Step1', Step1)
    .component('Step2', Step2)
    .component('Step3', Step3)
    .component('Summary', Summary)

app.mount('#app')
