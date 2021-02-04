<template>
  <div class="tag" :class="[type, size]">
    {{ label }}
    <span class="close" @click="close">✕</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export type Type = 'success' | 'info' | 'warning' | 'danger'
export type Size = 'large' | 'medium' | 'small' | 'mini'

export default defineComponent({
  name: 'element-tag',

  props: {
    label: {
      required: true,
      type: String,
    },
    close: {
      required: true,
      type: Function,
    },
    type: {
      default: undefined,
      type: String as PropType<Type>,
    },
    size: {
      default: undefined,
      type: String as PropType<Size>,
    },
  },
})
</script>

<style scoped>
.tag {
  display: inline-block;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  box-sizing: border-box;
  white-space: nowrap;
  color: #409eff;
  border: 1px solid #d9ecff;
  background-color: #ecf5ff;
}

.success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}

.info {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}

.warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}

.danger {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}

.large {
  height: 40px;
  line-height: 38px;
}

.medium {
  height: 28px;
  line-height: 26px;
}

.small {
  height: 24px;
  line-height: 22px;
}

.mini {
  height: 20px;
  line-height: 18px;
}

.close {
  margin-left: 4px;
  cursor: pointer;
  padding: 2px;
  border-radius: 50%;
  width: 14px;
  display: inline-flex;
  position: relative;
  vertical-align: middle;
  height: 14px;
  font-size: 10px;
  line-height: 1;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  top: -1px;
}

.tag .close:hover {
  color: #ecf5ff;
  background-color: #409eff;
}

.tag.success .close:hover {
  color: #f0f9eb;
  background-color: #67c23a;
}

.tag.info .close:hover {
  color: #f4f4f5;
  background-color: #909399;
}

.tag.warning .close:hover {
  color: #fdf6ec;
  background-color: #e6a23c;
}

.tag.danger .close:hover {
  color: #fef0f0;
  background-color: #f56c6c;
}
</style>
