<template>
  <div class="swim-count">
    <div class="header">
      <div class="title">
        <div>累计</div>
        <div class="highlight">{{ records.length }}</div>
      </div>
      <div class="custom-style">
        <el-segmented v-model="layoutValue" :options="layoutOptions">
          <template #default="{ item }">
            <el-icon size="18">
              <div class="modal-change-item">
                <img alt="swim" class="icon" :src="getImgUrl(item.icon)" :width="14" :height="14" />
              </div>
            </el-icon>
          </template>
        </el-segmented>
      </div>
    </div>
    <div class="calendar-content">
      <ICalendar :records="records" start="2024-01-01" :end="new Date()" :layout="layoutValue" />
    </div>
    <div class="slogan">
      <div class="modal-change">
        <el-segmented v-model="modeValue" :options="modeOptions">
          <template #default="{ item }">
            <div class="modal-change-item">
              <img
                alt="swim"
                class="icon"
                :src="getImgUrl(item.value)"
                :width="getImgSize(item.value)"
                :height="getImgSize(item.value)"
              />
            </div>
          </template>
        </el-segmented>
      </div>
      <!-- <div class="slogan-dream">DREAM</div>
      <div class="slogan-big">BIG</div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Record } from 'types'
import ICalendar from '../components/calendar/ICalendar.vue'
import { getAllRecords, getRecords } from '../services/index'
import { onMounted, ref, watch } from 'vue'

let records = ref<Record[]>([])
let layoutOptions = ref([
  { value: 'default', icon: 'calendar' },
  { value: 'compact', icon: 'list' }
])
let modeOptions = ref([{ value: 'all' }, { value: 'swim' }, { value: 'tennis' }])
let layoutValue = ref('default')
let modeValue = ref('all')

onMounted(() => {
  getAllRecords()
    .then((res) => {
      records.value = res.data
    })
    .catch((err) => console.log(err))
})

const getImgUrl = (name: string) => {
  return new URL(`/src/assets/${name}.svg`, import.meta.url).href
}
const getImgSize = (name: string) => {
  return name === 'swim' ? 22 : 18
}
watch(modeValue, (newVal, oldVal) => {
  if (newVal === oldVal) return
  if (newVal === 'all') {
    getAllRecords()
      .then((res) => {
        records.value = res.data
      })
      .catch((err) => console.log(err))
  } else {
    getRecords(newVal)
      .then((res) => {
        records.value = res.data
      })
      .catch((err) => console.log(err))
  }
})
</script>

<style lang="scss" scoped>
.swim-count {
  position: relative;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .custom-style .el-segmented {
      --el-segmented-item-selected-color: var(--el-color-white);
      --el-segmented-item-selected-bg-color: #fdfdfd;
      --el-segmented-bg-color: #e7e7e7;
      --el-border-radius-base: 16px;
    }
    .custom-style {
      .modal-change-item {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          display: block;
        }
      }
    }
    .title {
      font-weight: 500;
      padding: 2px 0;
      font-size: 14px;
      color: #7c7c7c;
      display: flex;
      align-items: last baseline;
      .highlight {
        font-weight: 700;
        font-size: 24px;
        color: #1dadb5;
        margin-left: 8px;
      }
    }
  }
  .calendar-content {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .slogan {
    padding: 12px 0;
    text-align: right;
    &-dream {
      font-size: 72px;
      font-weight: 700;
      line-height: 56px;
      color: #acacac;
    }
    &-big {
      font-size: 96px;
      font-weight: 700;
      line-height: 18px;
      text-align: right;
      color: #1dadb5;
    }
    .modal-change {
      .el-segmented {
        --el-segmented-item-selected-color: var(--el-color-white);
        --el-segmented-item-selected-bg-color: #9b9b9b;
        --el-border-radius-base: 16px;
        --el-segmented-bg-color: #282828;
      }
    }
    .modal-change-item {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        display: block;
      }
    }
  }
}
</style>
