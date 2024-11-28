<template>
  <div class="swim-count">
    <div class="title">
      累计
      <span class="highlight"> {{ records.length }} </span>天
    </div>
    <ICalendar :records="records" start="2024-01-01" end="2024-12-31" />
  </div>
</template>
<script lang="ts" setup>
import ICalendar from '../components/calendar/ICalendar.vue'
import { getRecords } from '../services/index'
import { onMounted, ref } from 'vue'

let records = ref<{ type: string; date: string }[]>([])

onMounted(() => {
  getRecords('swim')
    .then((res) => {
      records.value = res.data
      console.log(res)
    })
    .catch((err) => console.log(err))
})
</script>

<style lang="scss" scoped>
.swim-count {
  .title {
    font-weight: 500;
    padding: 12px 0;
    font-size: 14px;
    color: #7c7c7c;
    .highlight {
      font-weight: 600;
      font-size: 18px;
    }
  }
}
</style>
