<template>
  <div class="check-container">
    <div @click="handleClick">SWIMMING POOL</div>
    <el-dialog v-model="dialogVisible" width="80%" :show-close="false">
      <template #header="{ titleId, titleClass }">
        <div class="i-dialog-header">
          <h4 :id="titleId" :class="titleClass">SWIMMING POOL LIST</h4>
        </div>
      </template>
      <div>
        <el-progress
          :percentage="percentage"
          :color="'#0b0b0b'"
          :stroke-width="8"
          :show-text="false"
        />
        <div class="list-block">
          <el-checkbox-group v-model="checked">
            <el-checkbox
              v-for="item in swimmingPoolList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
              size="large"
            />
          </el-checkbox-group>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
const swimmingPoolList = [
  { label: 'Swim Cap', value: 1 },
  { label: 'Goggles', value: 2 },
  { label: 'Swimsuit', value: 3 },
  { label: 'Slipper', value: 4 },
  { label: 'Kickboard', value: 5 },
  { label: 'Bath Towel', value: 6 },
  { label: 'Shower Gel', value: 7 },
  { label: 'Tissue', value: 8 }
]
const dialogVisible = ref(false)
const checked = ref([])

const handleClick = () => {
  dialogVisible.value = true
}
const percentage = computed(() => (checked.value.length / swimmingPoolList.length) * 100)
</script>

<style lang="scss" scoped>
.check-container {
  .i-dialog-header {
    h4 {
      font-size: 20px;
      font-weight: 600;
    }
  }
  :deep(.el-dialog) {
    --el-dialog-border-radius: 12px;
    padding: 22px;
  }
  .el-checkbox {
    display: flex;
    --el-checkbox-checked-text-color: #0b0b0b;
    --el-checkbox-checked-bg-color: #0b0b0b;
    --el-checkbox-checked-input-border-color: #0b0b0b;
    :deep(.el-checkbox__label) {
      font-size: 18px;
      font-weight: 600;
      padding-left: 14px;
    }
  }
  :deep(.el-checkbox.el-checkbox--large .el-checkbox__inner) {
    width: 24px;
    height: 24px;
  }
  :deep(.el-checkbox__inner:after) {
    border-width: 3px;
    height: 12px;
    left: 7px;
    top: 2px;
    width: 5px;
  }
  .list-block {
    margin-top: 16px;
  }
}
</style>
