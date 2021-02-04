import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import 'normalize.css'
import './index.css'
import SourceCodeLink from './components/source-code-link/index.vue'

const app = createApp(App)
app.component('source-code-link', SourceCodeLink)
app.use(router)
app.mount('#app')
