<template>
  <div class="record-container" v-loading="loading">
    <div class="form">
      <div class="form-row">
        <div class="header-block">
          <div class="title">{{ dayjs(form.date).format('DD MMM') }}</div>
          <el-select v-model="form.type" placeholder="Select" style="width: 80px">
            <el-option :label="'swim'" :value="'swim'" />
            <el-option :label="'tennis'" :value="'tennis'" />
          </el-select>
        </div>
      </div>
      <div class="date-block">
        <IDatePicker :records="records" :active="form.date" @on-change="handleDateChange" />
      </div>
      <div class="record-btn" @click="handleRecord">Record</div>
    </div>
    <div class="slogan">
      <div class="slogan-dream">DREAM</div>
      <div class="slogan-big">BIG</div>
    </div>
    <div class="back" @click="toCheck">
      <el-icon size="20"><DArrowRight /></el-icon>
    </div>
    <el-dialog
      v-model="dialogVisible"
      width="80%"
      :show-close="false"
      @close="loading = false"
      @opened="handleOpened"
    >
      <template #header="{ titleId, titleClass }">
        <div class="i-dialog-header">
          <h4 :id="titleId" :class="titleClass">Input The Verify Code</h4>
        </div>
      </template>
      <div>
        <el-input
          ref="inputRef"
          placeholder="Verify Code"
          v-model="verifyCode"
          size="large"
          :autofocus="true"
        />
        <div class="confirm-btn" @click="handleConfirm">OK</div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRecords, saveRecord } from '../services/index'
import dayjs from 'dayjs'
import IDatePicker from '../components/date-picker/IDatePicker.vue'
import { ElMessage } from 'element-plus'
import conf from '@/conf'

const form = reactive({
  type: 'swim',
  date: new Date()
})
const router = useRouter()
const loading = ref(false)
let records = ref<{ type: string; date: string }[]>([])
const dialogVisible = ref(false)
const verifyCode = ref('')
const inputRef = ref()

onMounted(() => {
  fetchRecord()
})

const fetchRecord = () => {
  getRecords('swim')
    .then((res) => {
      records.value = res.data
    })
    .catch((err) => console.log(err))
}

const handleRecord = () => {
  dialogVisible.value = true
  loading.value = true
  verifyCode.value = ''
}

const handleConfirm = () => {
  const params = {
    type: form.type,
    date: dayjs(form.date).format('YYYY-MM-DD')
  }
  if (verifyCode.value === conf.VERIFY_CODE) {
    saveRecord(params)
      .then(() => {
        ElMessage({
          message: 'Record Successful',
          type: 'success',
          plain: true
        })
        fetchRecord()
      })
      .catch(() => {
        ElMessage({
          message: 'Record Failed',
          type: 'error',
          plain: true
        })
      })
      .finally(() => {
        loading.value = false
        dialogVisible.value = false
      })
  } else {
    loading.value = false
    dialogVisible.value = false
    ElMessage({
      type: 'error',
      message: 'Verify Failed.'
    })
  }
}

const handleDateChange = (date: Date) => {
  form.date = date
}

const toCheck = () => {
  router.push({ name: 'swim' })
}

const handleOpened = () => {
  inputRef.value.focus()
}
</script>

<style lang="scss" scoped>
.record-container {
  .form {
    max-width: 360px;
    background-color: #fff;
    border-radius: 12px;
    margin: 0 auto;
    padding: 24px 0;
    --el-border-radius-base: 8px;
    &-row {
      margin-bottom: 20px;
    }
    .header-block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 28px;
        font-weight: 800;
        flex-shrink: 0;
        color: #575757;
      }
    }
    .date-block {
      margin: 24px 0 32px;
    }
    .record-btn {
      width: 100%;
      color: #fff;
      background-color: #09a9b1;
      font-weight: 500;
      border-radius: 8px;
      font-size: 18px;
      font-weight: 500;
      text-align: center;
      padding: 8px 0;
      cursor: pointer;
    }
  }
  .slogan {
    margin-top: 32px;
    padding: 0 18px;
    &-dream {
      font-size: 86px;
      font-weight: 700;
      line-height: 76px;
      color: #acacac;
    }
    &-big {
      font-size: 136px;
      font-weight: 700;
      line-height: 136px;
      text-align: right;
      color: #1dadb5;
    }
  }
  .back {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .i-dialog-header {
    h4 {
      font-size: 20px;
      font-weight: 600;
    }
  }
  :deep(.el-dialog) {
    --el-dialog-border-radius: 12px;
    padding: 22px;
  }
  .confirm-btn {
    width: 100%;
    color: #fff;
    background-color: #000;
    font-weight: 500;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    padding: 6px 0;
    cursor: pointer;
    margin-top: 12px;
  }
}
</style>
