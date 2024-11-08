<template>
  <div class="i-calendar">
    <div v-for="month in monthList" :key="month.toString()">
      <div class="month-title">{{ month.month() + 1 }}月</div>
      <IMonth :month="month" :active-days="activeMapping" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import calendarUtil from '../../util/calendar.util'
import IMonth from './IMonth.vue'
// const props = defineProps<{
//   start: Date
//   end: Date
// }>()
const monthList = calendarUtil.generatorMonthList('2024-01-01', '2024-12-02')
const activeMapping = calendarUtil.transActiveMapping([
  '2024-08-14',
  '2024-08-17',
  '2024-08-24',
  '2024-09-07',
  '2024-09-14',
  '2024-09-17',
  '2024-09-21',
  '2024-09-24',
  '2024-10-01',
  '2024-10-11',
  '2024-10-13',
  '2024-10-15',
  '2024-10-17',
  '2024-10-19',
  '2024-10-28',
  '2024-10-30',
  '2024-11-02',
  '2024-11-04',
  '2024-11-07'
])
</script>
<style lang="scss" scoped>
.i-calendar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  .month-title {
    font-size: 12px;
    font-weight: 500;
    padding: 2px;
    color: #848484;
  }
}
</style>
