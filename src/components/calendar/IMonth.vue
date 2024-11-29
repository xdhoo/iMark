<template>
  <div class="i-month">
    <div class="i-month-row" v-for="(week, index) in calendar" :key="index">
      <div
        v-for="day in week"
        :class="['i-month-cell', !day && 'null-cell', isActive(day) && 'active-cell']"
        :key="`${index}-${day?.toString()}`"
      ></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Dayjs } from 'dayjs'
import calendarUtil from '../../util/calendar.util'
import type { ActiveDateMap } from 'types'
const props = defineProps<{
  month: Dayjs
  activeDays: ActiveDateMap | null
}>()

const calendar = calendarUtil.generatorMonth(props.month.toDate())

const isActive = (_date: Dayjs | null) => {
  return _date && props.activeDays?.[_date.year()]?.[_date.month()]?.[_date.date()]
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
