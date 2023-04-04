import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// 全局样式
import '@/styles/index.scss'
// 按需导入组件
import { globalRegister } from './global'
import  '@/service'
import {get, post} from '@/service'

import * as ElIcons from '@element-plus/icons-vue'
const app = createApp(App)

// 图标
Object.keys(ElIcons).forEach(key => {
    app.component(key, ElIcons[key as keyof typeof ElIcons])
})
app.config.globalProperties.get = get
app.config.globalProperties.post = post
app.use(router).use(globalRegister).mount('#app')
