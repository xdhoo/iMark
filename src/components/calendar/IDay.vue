<template>
  <div :class="['cell', !day && 'null-cell', isActive && 'active-cell']" :style="[cellStyle]"></div>
</template>
<script lang="ts" setup>
import type { Dayjs } from 'dayjs'
import { computed } from 'vue'

const props = defineProps<{
  day: Dayjs | null
  isActive: boolean
  size?: number
}>()
const cellStyle = computed(() => {
  return {
    width: (props.size ? props.size : 16) + 'px',
    height: (props.size ? props.size : 16) + 'px'
  }
})
</script>

<style lang="scss" scoped>
.cell {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 4px;
  background-color: #e7e7e7;
}
.cell.null-cell {
  background-color: #fff;
}

.cell.active-cell {
  background-color: #1eadb5;
}
</style>
