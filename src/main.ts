import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

createApp(App).use(Vant).use(store).use(router).mount('#app')
// 创建应用，使用store，使用 router，挂载到 #app 上