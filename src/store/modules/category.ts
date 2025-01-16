import {
  reqOneCategory,
  reqTwoCategory,
  reqThreeCategory,
} from '@/api/product/attr'
import { defineStore } from 'pinia'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from '@/store/modules/types/types'

let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Id: '',
      c2Id: '',
      c3Id: '',
      c1Arr: [],
      c2Arr: [],
      c3Arr: [],
    }
  },
  actions: {
    async getC1() {
      let res: CategoryResponseData = await reqOneCategory()
      if (res.code === 200) {
        this.c1Arr = res.data
      }
    },
    async getC2() {
      let res: CategoryResponseData = await reqTwoCategory(this.c1Id)
      if (res.code === 200) {
        this.c2Arr = res.data
      }
    },
    async getC3() {
      let res: CategoryResponseData = await reqThreeCategory(this.c2Id)
      if (res.code === 200) {
        this.c3Arr = res.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
