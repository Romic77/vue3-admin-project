<template>
  <div>
    <Category :scene />

    <el-card style="margin: 10px 0px">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="categoryStore.c3Id ? false : true"
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
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTradeMark(row)"
            ></el-button>
            <el-popconfirm
              :title="`您确定删除${row.tmName}`"
              width="250px"
              icon="delete"
              @confirm="removeTradeMark(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
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
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { reqSpuList } from '@/api/product/spu'
import useCategoryStore from '@/store/modules/category'
import type { SpuResponseData } from '@/api/product/spu/type'

let categoryStore = useCategoryStore()
let scene = ref<number>(0)
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let records = ref<Records>([])
let total = ref<number>(0)

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
</script>
<style scoped lang="scss"></style>
