<template>
  <div :class="['cell', !day && 'null-cell', isActive && 'active-cell']" :style="[cellStyle]">
    <img v-if="isActive" alt="swim" class="icon" :src="imgSrc" :width="imgSize" :height="imgSize" />
  </div>
</template>
<script lang="ts" setup>
import type { Dayjs } from 'dayjs'
import type { RecordType } from 'types'
import { computed } from 'vue'

const props = defineProps<{
  day: Dayjs | null
  size?: number
  type?: RecordType
}>()
const cellStyle = computed(() => {
  return {
    width: (props.size ? props.size : 16) + 'px',
    height: (props.size ? props.size : 16) + 'px'
  }
})

const imgSize = computed(() => (props.size ?? 16) - 4)
const isActive = computed(() => !!props.type)
const imgSrc = computed(() => `../src/assets/${props.type}.svg`)
</script>

<style lang="scss" scoped>
.cell {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 4px;
  background-color: #e7e7e7;

  img.icon {
    display: block;
  }
}
.cell.null-cell {
  background-color: #fff;
}

.cell.active-cell {
  background-color: #1eadb5;
}
</style>
