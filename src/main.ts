import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { createI18n } from 'vue-i18n'
import { messages } from '@/i18n'
const i18n = createI18n({
  messages,
  fallbackLocale: 'en-US'
})
const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.use(router)
app.mount('#app')
