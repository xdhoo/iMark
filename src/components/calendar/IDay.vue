<template>
  <div
    :class="['cell', !day && 'null-cell', isActive && 'active-cell', type && `active-${type}`]"
    :style="[cellStyle]"
  >
    <img
      v-if="isActive"
      alt="swim"
      class="icon"
      :src="getImgUrl()"
      :width="imgSize"
      :height="imgSize"
    />
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

const imgSize = computed(() => (props.size ?? 16) - (props.type === 'tennis' ? 9 : 6))
const isActive = computed(() => !!props.type)

const getImgUrl = () => {
  return new URL(`/src/assets/${props.type}.svg`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
.cell {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 4px;
  background-color: #e7e7e7;
  display: flex;
  align-items: center;
  justify-content: center;

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

.cell.active-cell.active-tennis {
  background-color: #53b51e;
}
</style>
