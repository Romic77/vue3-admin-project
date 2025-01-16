import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import globalComponent from './components'
import '@/styles/index.scss'
import router from '@/router'
import store from '@/store'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

//自定义全局组件
app.use(globalComponent)
//路由
app.use(router)
//仓库
app.use(store)
import './permisstion'

app.mount('#app')
