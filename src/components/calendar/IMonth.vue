<template>
  <div class="i-month">
    <div class="i-month-row" v-for="(week, index) in calendar" :key="index">
      <template v-for="day in week" :key="`${index}-${day?.toString()}`">
        <IDay :day="day" :type="recordType(day)" />
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Dayjs } from 'dayjs'
import calendarUtil from '../../util/calendar.util'
import type { ActiveDateMap } from 'types'
import IDay from './IDay.vue'
const props = defineProps<{
  month: Dayjs
  activeDays: ActiveDateMap | null
}>()

const calendar = calendarUtil.generatorMonth(props.month.toDate())

const recordType = (_date: Dayjs | null) => {
  if (_date === null) return undefined
  return props.activeDays?.[_date.year()]?.[_date.month()]?.[_date.date()]
}
</script>
<style lang="scss" scoped>
.i-month {
  &-row {
    display: flex;
  }
  &-cell {
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-radius: 4px;
    background-color: #e7e7e7;
  }
  &-cell.null-cell {
    background-color: #fff;
  }

  &-cell.active-cell {
    background-color: #1eadb5;
  }
}
</style>
