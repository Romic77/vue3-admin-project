<template>
  <div>
    <el-card class="box-card">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :onclick="addTradeMark"
      >
        添加品牌
      </el-button>
      <el-table style="margin: 10px 0px" border :data="trademarkList">
        <el-table-column
          label="id"
          width="80px"
          align="center"
          prop="id"
        ></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row, $index }">
            <img
              :src="row.logoUrl"
              alt="图片丢失了"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
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
        @current-change="getHasTradeMark"
        @size-change="sizeChange"
      />
    </el-card>

    <el-dialog v-model="dialogFormVisible" title="添加品牌">
      <el-form
        style="width: 80%"
        :model="tradeMarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            placeholder="输入品牌名称"
            v-model="tradeMarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="tradeMarkParams.logoUrl"
              :src="tradeMarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { UploadProps } from 'element-plus/es/components/upload/src/upload'
import {
  reqAddOrUpdateTradeMark,
  reqTradeMark,
  reqDeleteTradeMark,
} from '@/api/product/trademark'
import {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let trademarkList = ref<Records>()
let dialogFormVisible = ref<boolean>(false)
let tradeMarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
const formRef = ref<any>()

const getHasTradeMark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqTradeMark(
    pageNo.value,
    limit.value,
  )

  if (result.code == 200) {
    total.value = result.data.total
    trademarkList.value = result.data.records
  }
}

const sizeChange = () => getHasTradeMark()

onMounted(() => {
  getHasTradeMark()
})

//添加
const addTradeMark = () => {
  dialogFormVisible.value = true

  tradeMarkParams.id = 0
  tradeMarkParams.tmName = ''
  tradeMarkParams.logoUrl = ''

  //校验规则清空
  nextTick(() => formRef.value?.resetFields())
}

//取消
const cancel = () => {
  dialogFormVisible.value = false

  formRef.value?.resetFields()
}

//确定
const confirm = async () => {
  await formRef.value.validate()

  let result = await reqAddOrUpdateTradeMark(tradeMarkParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: tradeMarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    getHasTradeMark(tradeMarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: tradeMarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
  dialogFormVisible.value = false
}

//修改
const updateTradeMark = (row: TradeMark) => {
  dialogFormVisible.value = true

  Object.assign(tradeMarkParams, row)
}

//文件格式校验
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const validTypes = ['image/png', 'image/jpeg', 'image/gif']
  const isValidType = validTypes.includes(rawFile.type)
  const isValidSize = rawFile.size / 1024 / 1024 < 4

  if (!isValidType) {
    ElMessage.error('上传的文件类型必须是 PNG、JPG 或 GIF')
    return false
  }
  if (!isValidSize) {
    ElMessage.error('上传的文件大小应小于 4MB')
    return false
  }

  return true
}

//图片上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  tradeMarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}

const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('Logo的图片务必上传'))
  }
}

const rules = {
  tmName: [
    {
      required: true,
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      trigger: 'change',
      validator: validatorLogoUrl,
    },
  ],
}

//删除
const removeTradeMark = async (id: number) => {
  let result = await reqDeleteTradeMark(id)

  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    //再次获取已有的品牌数据
    getHasTradeMark(
      trademarkList.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
