<template>
  <div class="swim-count">
    <div class="header">
      <div class="title">
        累计
        <span class="highlight"> {{ records.length }} </span>天
      </div>
      <div class="custom-style">
        <el-segmented v-model="layoutValue" :options="layoutOptions">
          <template #default="{ item }">
            <el-icon size="16">
              <component :is="item.icon" />
            </el-icon>
          </template>
        </el-segmented>
      </div>
    </div>
    <div class="calendar-content">
      <ICalendar :records="records" start="2024-01-01" :end="new Date()" :layout="layoutValue" />
    </div>
    <div class="slogan">
      <div class="slogan-dream">DREAM</div>
      <div class="slogan-big">BIG</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ICalendar from '../components/calendar/ICalendar.vue'
import { getRecords } from '../services/index'
import { onMounted, ref } from 'vue'

let records = ref<{ type: string; date: string }[]>([])
let layoutOptions = ref([
  { value: 'default', icon: 'Calendar' },
  { value: 'compact', icon: 'Tickets' }
])
let layoutValue = ref('default')

onMounted(() => {
  getRecords('swim')
    .then((res) => {
      records.value = res.data
    })
    .catch((err) => console.log(err))
})
</script>

<style lang="scss" scoped>
.swim-count {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .custom-style .el-segmented {
      --el-segmented-item-selected-color: var(--el-color-white);
      --el-segmented-item-selected-bg-color: #1eadb5;
      --el-border-radius-base: 18px;
    }
    .title {
      font-weight: 500;
      padding: 12px 0;
      font-size: 14px;
      color: #7c7c7c;
      .highlight {
        font-weight: 700;
        font-size: 24px;
        color: #1dadb5;
      }
    }
  }
  .calendar-content {
    max-height: 600px;
    overflow-y: scroll;
  }
  .slogan {
    margin-top: 12px;
    &-dream {
      font-size: 56px;
      font-weight: 700;
      line-height: 56px;
      color: #acacac;
    }
    &-big {
      font-size: 86px;
      font-weight: 700;
      line-height: 18px;
      text-align: right;
      color: #1dadb5;
    }
  }
}
</style>
