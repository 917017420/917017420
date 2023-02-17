import { createApp } from 'vue'
import router from './router/index'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router).use(pinia).mount('#app')
