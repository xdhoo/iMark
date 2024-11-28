<template>
  <div class="record-container" v-loading="loading">
    <div class="form">
      <div class="form-row">
        <div class="header-block">
          <div class="title">{{ dayjs(form.date).format('DD MMM') }}</div>
          <el-select v-model="form.type" placeholder="Select" style="width: 80px">
            <el-option :label="'swim'" :value="'swim'" />
          </el-select>
        </div>
      </div>
      <div class="date-block">
        <IDatePicker :active="form.date" @on-change="handleDateChange" />
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
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { saveRecord } from '../services/index'
import dayjs from 'dayjs'
import IDatePicker from '../components/date-picker/IDatePicker.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import conf from '@/conf'

const form = reactive({
  type: 'swim',
  date: new Date()
})
const router = useRouter()
const loading = ref(false)

const handleRecord = () => {
  loading.value = true
  const params = {
    type: form.type,
    date: dayjs(form.date).format('YYYY-MM-DD')
  }
  ElMessageBox.prompt('Please input your verify code', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
  })
    .then(({ value }) => {
      if (value === conf.VERIFY_CODE) {
        saveRecord(params)
          .then((res) => {
            ElMessage({
              message: 'Record Successful',
              type: 'success',
              plain: true
            })
          })
          .catch((err) => {
            ElMessage({
              message: 'Record Failed',
              type: 'error',
              plain: true
            })
          })
          .finally(() => (loading.value = false))
      } else {
        loading.value = false
        ElMessage({
          type: 'error',
          message: 'Verify Failed.'
        })
      }
    })
    .catch(() => {
      loading.value = false
      ElMessage({
        type: 'error',
        message: 'Verify Failed.'
      })
    })
}

const handleDateChange = (date) => {
  form.date = date
}

const toCheck = () => {
  router.push({ name: 'swim' })
}
</script>

<style lang="scss" scoped>
.record-container {
  margin-top: 20%;
  .form {
    max-width: 360px;
    background-color: #fff;
    border-radius: 12px;
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
    margin-top: 46px;
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
}
</style>
