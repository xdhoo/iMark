<template>
  <template v-if="layout === 'compact'">
    <div class="i-simple-calendar">
      <div class="chunk" v-for="(chunk, idx) in dayList" :key="idx">
        <div class="tag" v-if="chunk.yearTag">
          {{ chunk.yearTag.year() }}
        </div>
        <template v-for="day in chunk.chunk" :key="day.toString()">
          <IDay :day="day" :type="recordType(day)" :size="20" />
        </template>
      </div>
    </div>
  </template>
  <template v-if="layout === 'default'">
    <div class="i-calendar">
      <div v-for="month in monthList" :key="month.toString()">
        <div v-if="!month.month()"></div>
        <div class="month-title">
          <span v-if="!month.month()" class="highlight">{{ month.year() }}</span>
          <span v-else>{{ month.month() + 1 }}月</span>
        </div>
        <IMonth :month="month" :active-days="activeMapping" />
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import calendarUtil from '../../util/calendar.util'
import IMonth from './IMonth.vue'
import { watch, ref, onMounted } from 'vue'
import type { ActiveDateMap, Record } from 'types'
import type { Dayjs } from 'dayjs'
import IDay from './IDay.vue'
const props = defineProps<{
  records: Record[]
  start: string | Date
  end: string | Date
  layout: string
}>()
const monthList = ref<Dayjs[]>([])
const dayList = ref<{ yearTag?: Dayjs; chunk: Dayjs[] }[]>([])
const activeDates = ref<string[]>([])
const activeMapping = ref<ActiveDateMap | null>(null)

const recordType = (_date: Dayjs | null) => {
  if (_date === null) return undefined
  return activeMapping.value?.[_date.year()]?.[_date.month()]?.[_date.date()]
}

watch(
  () => props.records,
  (newVal) => {
    activeDates.value = newVal.map(({ date }) => date)
    activeMapping.value = calendarUtil.transActiveMapping(newVal)
  }
)

onMounted(() => {
  if (props.layout === 'compact') {
    dayList.value = calendarUtil.generatorDayList(props.start, props.end)
  } else {
    monthList.value = calendarUtil.generatorMonthList(props.start, props.end)
  }
})

watch(
  () => props.layout,
  (newVal) => {
    if (newVal === 'compact') {
      dayList.value = calendarUtil.generatorDayList(props.start, props.end)
    } else {
      monthList.value = calendarUtil.generatorMonthList(props.start, props.end)
    }
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
  .highlight {
    font-weight: 700;
    font-size: 14px;
    color: #1c9ca3;
  }
}
.i-simple-calendar {
  .chunk {
    display: flex;
    position: relative;
    .tag {
      position: absolute;
      right: 32px;
      top: -2px;
      color: #1c9ca3;
      font-weight: 600;
    }
  }
}
</style>
