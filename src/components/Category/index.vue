<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类" style="width: 20%">
          <el-select
            v-model="categoryStore.c1Id"
            @change="changeHandler"
            :disabled="scene == 0 ? false : true"
          >
            <el-option
              v-for="(c1, index) in categoryStore.c1Arr"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" style="width: 20%">
          <el-select
            v-model="categoryStore.c2Id"
            @change="changeHandler2"
            :disabled="scene == 0 ? false : true"
          >
            <el-option
              v-for="(c2, index) in categoryStore.c2Arr"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类" style="width: 20%">
          <el-select
            v-model="categoryStore.c3Id"
            :disabled="scene == 0 ? false : true"
          >
            <el-option
              v-for="(c3, index) in categoryStore.c3Arr"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { onMounted, ref } from 'vue'
let categoryStore = useCategoryStore()

onMounted(() => {
  getC1()
})

const getC1 = async () => {
  categoryStore.getC1()
}

//一级分类触发change时间的时候
const changeHandler = () => {
  categoryStore.c2Arr = []
  categoryStore.c3Arr = []
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''

  categoryStore.getC2()
}

//二级分类触发change时间的时候
const changeHandler2 = () => {
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  categoryStore.getC3()
}

defineProps(['scene'])
</script>
<style scoped lang="scss"></style>
