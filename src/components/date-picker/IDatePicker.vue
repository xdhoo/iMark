<template>
  <div class="i-date-picker">
    <div class="i-date-picker-row">
      <template v-for="(day, index) in dateList" :key="index">
        <div :class="['cell', day.isSame(active, 'day') && 'active']" @click="handleClick(day)">
          <p>{{ dayMap[day.day()] }}</p>
          <span>{{ day.date() }}</span>
          <div :class="['mark', getClass(day)]" v-if="isRecord(day)"></div>
        </div>
      </template>
      <div id="end_target"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from 'vue'
import calendarUtil from '../../util/calendar.util'
import { Dayjs } from 'dayjs'

const props = defineProps<{
  active: Dayjs | Date
  records: { type: string; date: string }[]
}>()

const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const dateList = calendarUtil.generatorDateList('2024-11-01', new Date())
const emit = defineEmits(['on-change'])
const activeDates = ref(new Map())

onMounted(() => {
  setTimeout(() => {
    document.getElementById('end_target')?.scrollIntoView()
  }, 100)
})

watch(
  () => props.records,
  (newVal) => {
    const map = new Map()
    newVal.forEach((item) => {
      map.set(item.date, item.type)
    })
    activeDates.value = map
  }
)

const handleClick = (date: Dayjs) => {
  emit('on-change', date)
}

const isRecord = (day: Dayjs) => {
  return activeDates.value.get(day.format('YYYY-MM-DD'))
}
const getClass = (day: Dayjs) => {
  return activeDates.value.get(day.format('YYYY-MM-DD'))
}
</script>

<style lang="scss" scoped>
.i-date-picker {
  .title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  &-row {
    display: flex;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: auto;
    .cell {
      width: 52px;
      height: 66px;
      flex-shrink: 0;
      border-radius: 8px;
      text-align: center;
      padding: 4px 0;
      display: flex;
      flex-direction: column;
      p {
        color: #6c6c6c;
        font-size: 14px;
        font-weight: 500;
      }
      span {
        font-size: 18px;
        font-weight: 700;
        color: #505050;
      }
      .mark {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: #1eadb5;
        align-self: center;
      }
      .mark.tennis {
        background-color: #53b51e;
      }
    }
    .cell.active {
      background-color: #09a9b1;
      p,
      span {
        color: #fff;
      }
      .mark {
        background-color: #fff;
      }
    }
  }
}
</style>
