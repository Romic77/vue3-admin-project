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
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0px" :data="attrList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="属性名称" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
                style="margin: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                type="success"
                size="small"
                icon="Edit"
                @click="editAttr(row)"
              />
              <el-popconfirm
                :title="`你确认要删除${row.attrName}吗?`"
                @confirm="deleteAttr(row.id)"
                width="200px"
              >
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            />
          </el-form-item>
        </el-form>
        <el-button
          :disabled="attrParams.attrName ? false : true"
          type="primary"
          icon="Plus"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <!-- vc为组件实例 -->
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                @blur="blur(row, $index)"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                v-if="row.flag === true"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-button
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          type="primary"
          @click="save"
        >
          保存
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqCategoryAttrList } from '@/api/product/attr/index'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
let categoryStore = useCategoryStore()
let attrList = ref<Attr[]>([])
let scene = ref<number>(0)
//收集新增的属性的数据
const attrParams = reactive<Attr>({
  attrName: '', //新增属性名称
  categoryId: '', //所属的三级分类id
  categoryLevel: 3, //代表的是三级分类
  attrValueList: [], //新增的属性值数据
})
//存储已有的属性与属性值
const attrArr = ref<Attr[]>([])

//准备一个数组，将来存储对应的组件实例el-input
const inputArr = ref<any>([])

watch(
  () => categoryStore.c3Id,
  () => {
    getCategoryAttrList()
  },
)

const getCategoryAttrList = async () => {
  attrList.value = []
  if (!categoryStore.c3Id) {
    return
  }
  let result: AttrResponseData = await reqCategoryAttrList(
    categoryStore.c1Id,
    categoryStore.c2Id,
    categoryStore.c3Id,
  )

  if (result.code == 200) {
    attrList.value = result.data
  }
}

//添加属性
const addAttr = () => {
  //先清空以前添加的数据
  Object.assign(attrParams, {
    id: '',
    attrName: '', //新增属性名称
    categoryId: categoryStore.c3Id, //所属的三级分类id(这里直接收集)
    categoryLevel: 3, //代表的是三级分类
    attrValueList: [], //新增的属性值数据
  })
  //切换
  scene.value = 1
}

const addAttrValue = () => {
  //添加数据
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制每个属性值的编辑模式与切换模式的切换
  })
  //让最后一个el-input获取焦点
  nextTick(() => {
    //获取焦点
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

//保存按钮
const save = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParams)

  if (result.code === 200) {
    //切换场景
    scene.value = 0
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
    //重新获取数据
    getCategoryAttrList()
  } else {
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
  }
}

//添加属性值时失焦
const blur = (row: AttrValue, $index: number) => {
  //1.先判断不能为空
  if (row.valueName.trim() === '') {
    ElMessage.error('属性值不能为空')
    //如果为空直接删除
    attrParams.attrValueList.splice($index, 1)
    return
  }

  //2.判断属性值不能重复
  const repeat = attrParams.attrValueList.find((item) => {
    //这里使用find方法进行查找，所以需要先把row本身给去除掉
    if (row !== item) {
      return row.valueName === item.valueName
    }
  })
  //如果重复直接删除重复的数据
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage.error('属性值不能重复')
    return
  }

  //切换
  row.flag = false
}

const toEdit = (row: AttrValue, $index: number) => {
  //切换
  row.flag = true
  //响应式数据发生变化，获取更新的DOM（组件实例）
  nextTick(() => {
    //获取焦点
    inputArr.value[$index].focus()
  })
}

//取消按钮
const cancel = () => {
  scene.value = 0
}

//编辑
const editAttr = (row: AttrValue, $index: number) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

//删除
const deleteAttr = async (id: number) => {
  let result = await reqDeleteAttr(id)
  if (result.code == 200) {
    getCategoryAttrList()
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('删除失败')
  }
}

//路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>
<style scoped lang="scss"></style>
