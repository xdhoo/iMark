<template>
  <div class="record-container">
    <div class="form">
      <div class="form-row">
        <el-select v-model="form.type" placeholder="Select" size="large">
          <el-option :label="'swim'" :value="'swim'" />
        </el-select>
      </div>
      <div class="form-row">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a day"
          value-format="YYYY-MM-DD"
          size="large"
          style="width: 100%"
        />
      </div>
      <div>
        <el-button @click="handleRecord" class="record-btn" size="large" :loading="loading"
          >Record</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { saveRecord } from '../services/index'

const form = reactive({
  type: 'swim',
  date: ''
})

const loading = ref(false)

const handleRecord = () => {
  loading.value = true
  saveRecord(form)
    .then((res) => {
      console.log('save record res', res)
    })
    .catch((err) => {
      console.log('save record error', err)
    })
    .finally(() => (loading.value = false))
}
</script>

<style lang="scss" scoped>
.record-container {
  .form {
    width: 360px;
    background-color: #fff;
    padding: 12px;
    border-radius: 12px;
    --el-border-radius-base: 8px;
    &-row {
      margin-bottom: 20px;
    }
    .record-btn {
      width: 100%;
      color: #fff;
      background-color: #09a9b1;
      font-weight: 500;
    }
  }
}
</style>
