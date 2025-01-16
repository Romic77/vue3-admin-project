import { defineStore } from 'pinia'
import type { loginForm } from '@/api/user/type'
import { reqLogin, reqLogOut } from '@/api/user/user'
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'
import { reqUserInfo } from '../../api/user/user'

const userStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      const result: LoginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data
        SET_TOKEN(result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message as string))
      }
    },
    async userInfo() {
      const result: userInfoResponseData = await reqUserInfo()

      if (result.code == 200) {
        this.avatar = result.data.avatar
        this.username = result.data.name
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message as string))
      }
    },
    async userLogout() {
      const result = await reqLogOut()
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default userStore
