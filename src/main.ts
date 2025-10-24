import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './main/router'
import { useAppStore } from '@/core/stores/app'

// 导入 Ant Design Vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 导入样式
import '@/shared/styles/global.scss'

const app = createApp(App)

// 安装插件
app.use(createPinia())
app.use(router)
app.use(Antd)

// 初始化应用状态
const appStore = useAppStore()
appStore.initializeApp()

app.mount('#app')
