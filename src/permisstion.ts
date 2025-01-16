import router from '@/router'
import setting from './setting'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)
nprogress.configure({ showSpinner: false })

//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = to.meta.title + ` | ${setting.title}`
  nprogress.start()

  //如果token不为空
  if (userStore.token) {
    //调用获取用户信息
    try {
      await userStore.userInfo()
    } catch (error) {
      //token过期失效，就获取不到用户信息
      userStore.userLogout()
      next({ path: '/login' })
    }

    if (to.path == '/login') {
      next({ path: '/' })
    }
    //向下处理
    next()
  } else {
    //跳转到登陆
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

//全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})
