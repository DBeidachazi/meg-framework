/** 重置样式 */
import '@/styles/reset.css'
import 'uno.css'
import '@/styles/global.scss'
import 'virtual:svg-icons-register'
import 'vue3-lottie/dist/style.css'

import { createApp } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'
import { useResize } from '@zclzone/utils'
import { Vue3Lottie } from 'vue3-lottie'

async function setupApp() {
  const app = createApp(App)

  setupStore(app)

  await setupRouter(app)

  app.use(useResize)
  app.use(Vue3Lottie)
  app.mount('#app')
}

setupApp()
