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
import { watch, ref } from 'vue'
import type { ActiveDateMap } from 'types'
const props = defineProps<{
  records: { type: string; date: string }[]
  start: string
  end: string
}>()
const monthList = calendarUtil.generatorMonthList(props.start, props.end)

const activeDates = ref<string[]>([])
const activeMapping = ref<ActiveDateMap | null>(null)

watch(
  () => props.records,
  (newVal) => {
    activeDates.value = newVal.map(({ date }) => date)
    activeMapping.value = calendarUtil.transActiveMapping(activeDates.value)
  }
)
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
