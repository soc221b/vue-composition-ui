<template>
  <div class="select">
    <ul>
      <template v-for="value of range" :key="value">
        <li :class="{ selected: dayjsModelValue[type]() === value }" @click="() => onChange(value)">{{ value }}</li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Dayjs } from 'dayjs'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    range: {
      required: true,
      type: Array as PropType<number[]>
    },
    type: {
      required: true,
      type: String as PropType<'hour' | 'minute' | 'second'>,
    },
    dayjsModelValue: {
      required: true,
      type: Object as PropType<Dayjs>
    }
  },
  emits: ['change'],
  setup (_, { emit }) {
    const onChange = (value: number) => emit('change', value)

    return {
      onChange
    }
  }
})
</script>

<style scoped>

ul {
  list-style-type: none;
  list-style-position: inside;
  padding: 0;
  margin: 0;
  height: calc(32px * 6);
  line-height: calc(32px * 6);
  overflow-y: auto;
  width: 56px;
  user-select: none;
}

li {
  width: 100%;
  height: 32px;
  margin: 0;
  padding: 0 0 0 12px;
  line-height: 32px;
  text-align: left;
  list-style: none;
  cursor: pointer;
}

li:hover {
  background-color: #e6f7ff;
}

li.selected {
  background-color: #eee;
}
</style>