import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
// import DataVVue3 from '@kjgl77/datav-vue3'

const app = createApp(App)
// app.use(DataVVue3)
app.use(router)
app.mount('#app')