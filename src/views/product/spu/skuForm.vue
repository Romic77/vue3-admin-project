<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="sku名称">
        <el-input placeholder="请输入sku名称"></el-input>
      </el-form-item>
      <el-form-item label="sku价格">
        <el-input placeholder="请输入sku价格" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(g)">
        <el-input placeholder="请输入sku名称" type="number"></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input placeholder="请输入sku名称" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline>
          <el-form-item
            :label="item.attrName"
            v-for="(item, index) in attrArr"
            :key="item.id"
          >
            <el-select v-model="item.attrIdAndValueId" style="width: 200px">
              <el-option
                :value="`${item.id}:${attrValue.id}`"
                :label="attrValue.valueName"
                v-for="(attrValue, index) in item.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline>
          <el-form-item
            :label="item.saleAttrName"
            v-for="(item, index) in saleArr"
            :key="item.id"
          >
            <el-select v-model="item.saleIdAndValueId" style="width: 200px">
              <el-option
                :value="`${item.id}:${saleAttrValue.id}`"
                :label="saleAttrValue.saleAttrValueName"
                v-for="(saleAttrValue, index) in item.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgArr" ref="table">
          <el-table-column
            type="selection"
            width="80px"
            align="center"
            :key="table2"
          ></el-table-column>
          <el-table-column label="图片">
            <template #="{ row, $index }">
              <img
                :src="row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" @click="handler(row)">
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default">保存</el-button>
        <el-button size="default" @click="cancel1">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reqCategoryAttrList } from '@/api/product/attr'
import {
  reqSpuImageList,
  reqSpuSaleAttrList,
  reqAddSku,
} from '@/api/product/spu'
import { SkuData } from '@/api/product/spu/type'
import { reactive, ref } from 'vue'
let $emit = defineEmits(['changeScene'])
let attrArr = ref<any>([])
let saleArr = ref<any>([])
let imgArr = ref<any>([])
let table = ref<any>()
let skuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [
    // {
    //   attrId: '',
    //   valueId: '',
    // },
  ],
  skuSaleAttrValueList: [
    // {
    //   saleAttrId: '',
    //   saleAttrValueId: '',
    // },
  ],
  skuDefaultImg: '',
})

const cancel1 = () => {
  $emit('changeScene', { flag: 0, params: '' })
}

const initSkuData = async (c1Id: number, c2Id: number, spu: any) => {
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId
  let res: any = await reqCategoryAttrList(c1Id, c2Id, spu.category3Id)
  let res1: any = await reqSpuSaleAttrList(spu.id)
  let res2: any = await reqSpuImageList(spu.id)
  attrArr.value = res.data
  saleArr.value = res1.data
  imgArr.value = res2.data
}

defineExpose({ initSkuData })
</script>
<style scoped lang="scss"></style>
