import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'normalize.css'
import './index.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
