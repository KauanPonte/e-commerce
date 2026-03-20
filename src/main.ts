import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setPrimeVue } from './modules/primevue.modules'

const app = createApp(App)

app.use(createPinia())
app.use(router)
setPrimeVue(app)
app.mount('#app')
