import Svgicon from '@/components/Svgicon/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import Category from '@/components/Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allGlobalComponent = { Svgicon, Pagination, Category }

export default {
  install(app) {
    //注册项目全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
    //注册element-plus的icons为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
