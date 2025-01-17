<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请你输入SPU名称"
        v-model="spuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option
          v-for="item in allTradeMark"
          :label="item.tmName"
          :key="item.id"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请你输入SPU描述"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        style="width: 200px"
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '暂无数据可选择'
        "
      >
        <el-option
          :label="item.name"
          v-for="(item, index) in unSelectSaleAttr"
          :key="item.id"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 10px"
        type="primary"
        size="default"
        icon="Plus"
        :disabled="saleAttrIdAndValueName ? false : true"
        @click="addSaleAttr"
      >
        添加属性值
      </el-button>
      <el-table border="border" :data="saleAttr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
        <el-table-column label="属性值">
          <template #="{ row, $index }">
            <el-tag
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="row.id"
              class="mx-1"
              closable
              style="margin: 0 8px"
              @close="row.spuSaleAttrValueList.splice($index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              :ref="(vc: any) => (inputArr[$index] = vc)"
              v-model="row.saleAttrValue"
              v-if="row.flag === true"
              placeholder="请你输入属性值"
              size="small"
              style="width: 100px"
              @blur="toLook(row)"
            ></el-input>
            <el-button
              v-else
              size="small"
              icon="Plus"
              type="primary"
              @click="toEdit(row, $index)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="default"
        @click="save"
        :disabled="saleAttr.length > 0 ? false : true"
      >
        保存
      </el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import type { SpuData } from '@/api/product/spu/type'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuSaleAttrList,
  reqAllSaleAttrList,
} from '@/api/product/spu/index'
import {
  AllTradeMark,
  Trademark,
  SpuHasImg,
  SaleAttr,
  HasSaleAttr,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuImg,
  SaleAttrValue,
} from '@/api/product/spu/type'
import { ref, computed, nextTick } from 'vue'
import { reqAddOrUpdateSpu } from '@/api/product/spu'

let $emit = defineEmits(['changeScene'])
let allTradeMark = ref<Trademark[]>([])
let imgList = ref<SpuImg[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])
let spuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')
let saleAttrIdAndValueName = ref<string>('')
let inputArr = ref<any>([])

// 重置函数
const resetSpuParams = () => {
  Object.assign(spuParams.value, {
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''
}

const cancel = () => {
  //调用changeScene事件，传参0
  $emit('changeScene', { flag: 0, params: 'update' })
  //resetSpuParams()
}

//子组件书写一个方法
const initSpuData = async (spu: SpuData) => {
  spuParams.value = spu

  //发送4个请求
  let result1: AllTradeMark = await reqAllTradeMark()
  let result2: SpuHasImg = await reqSpuImageList(spu.id)
  let result3: SaleAttrResponseData = await reqSpuSaleAttrList(spu.id)
  let result4: HasSaleAttrResponseData = await reqAllSaleAttrList()

  allTradeMark.value = result1.data
  imgList.value = result2.data
  imgList.value = result2.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })

  saleAttr.value = result3.data
  allSaleAttr.value = result4.data
}

const handlePictureCardPreview = (file: any) => {
  dialogVisible.value = true
  dialogImageUrl.value = file.url
}

const handleRemove = () => {}

const handlerUpload = (file: any) => {
  if (
    file.type === 'image/png' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必PNG|JPG|GIF',
    })
    return false
  }
}

let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name !== item1.saleAttrName
    })
  })
  return unSelectArr
})

const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}

const toEdit = (row: SaleAttr, $index: number) => {
  row.flag = true
  row.saleAttrValue = ''
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  if (saleAttrValue?.trim() === '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空的',
    })
    return
  }
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName === saleAttrValue
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复',
    })
    return
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}

const save = async () => {
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  spuParams.value.spuSaleAttrList = saleAttr.value
  let res = await reqAddOrUpdateSpu(spuParams.value)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功',
    })
    $emit('changeScene', {
      flag: 0,
      params: spuParams.value.id ? 'update' : 'add',
    })
  }
}

const initAddSpu = async (c3Id: number | string) => {
  Object.assign(spuParams.value, {
    id: '',
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''
  spuParams.value.category3Id = c3Id
  let res: AllTradeMark = await reqAllTradeMark()
  let res1: HasSaleAttrResponseData = await reqAllSaleAttrList()
  allTradeMark.value = res.data
  allSaleAttr.value = res1.data
}

defineExpose({ initSpuData, initAddSpu })
</script>
<style scoped lang="scss"></style>
