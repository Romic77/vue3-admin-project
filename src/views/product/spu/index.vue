<template>
  <div>
    <Category :scene="scene" />

    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu"
        >
          添加
        </el-button>
        <el-table style="margin: 10px 0px" :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                icon="Plus"
                title="添加SKU"
                size="small"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                title="编辑SPU"
                icon="Edit"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="View"
                title="查看SKU列表"
                size="small"
                @click="addSku(row)"
              ></el-button>
              <el-popconfirm
                :title="`您确定删除${row.tmName}`"
                width="250px"
                icon="delete"
                @confirm="removeTradeMark(row.id)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- pagination -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getHasSpu"
          @size-change="sizeChange"
        />
      </div>

      <SpuForm
        ref="spuFormRef"
        @changeScene="changeScene"
        v-show="scene == 1"
      ></SpuForm>
      <SkuForm
        ref="skuFormRef"
        v-show="scene == 2"
        @changeScene="changeScene"
      ></SkuForm>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { reqSpuList } from '@/api/product/spu'
import useCategoryStore from '@/store/modules/category'
import type { SpuResponseData, SpuData, Records } from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'

let categoryStore = useCategoryStore()
let scene = ref<number>(0) //0显示已有的SPU 1-添加或者修改已有SPU 2添加Sku结构
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let records = ref<Records>([])
let total = ref<number>(0)
let spuFormRef = ref<any>()
let skuFormRef = ref<any>()

watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)

const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: SpuResponseData = await reqSpuList(
    pageNo.value,
    limit.value,
    categoryStore.c3Id,
  )

  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

const sizeChange = () => getHasSpu()

const addSpu = () => {
  //跳转到spuForm场景
  scene.value = 1
  //父组件调用子组件的initAddSpu方法
  spuFormRef.value.initAddSpu(categoryStore.c3Id)
}

//自定义changeScene事件
const changeScene = (obj: any) => {
  scene.value = obj.flag
  if (obj.params == 'update') {
    //更新留在当前页
    getHasSpu(pageNo.value)
  } else {
    //添加留在第一页
    getHasSpu()
  }
}

//修改spu
const updateSpu = (row: SpuData) => {
  scene.value = 1
  //调用SpuForm子组件的方法
  spuFormRef.value.initSpuData(row)
}

const addSku = (row: SpuData) => {
  scene.value = 2
  skuFormRef.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
</script>
<style scoped lang="scss"></style>
