import { createApp, reactive } from 'vue'
import router from './router'
import 'normalize.css'
import App from './App.vue'
import 'highlight.js/styles/xcode.css'
import './assets/iconfont/iconfont.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
