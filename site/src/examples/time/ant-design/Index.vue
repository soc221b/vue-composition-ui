<template>
<div class="wrapper">
  <input ref="inputRef" v-model="modelValue" @focus="onFocus" @blur="onBlur" @change="onChange" />
</div>

<div v-show="isFocusing" @click="onFocusPopup" class="combobox">
  <Select :dayjsModelValue="dayjsModelValue" :range="hourRange" type="hour" @change="onClickHour" />
  <Select :dayjsModelValue="dayjsModelValue" :range="minuteRange" type="minute" @change="onClickMinute" />
  <Select :dayjsModelValue="dayjsModelValue" :range="secondRange" type="second" @change="onClickSecond" />
</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useHourRange, useMinuteRange, useSecondRange, useNormalizeInput } from '@vue-composition-ui/time'
import Select from './Select.vue'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default defineComponent({
  components: {
    Select
  },
  setup() {
    const inputRef = ref()
    const modelValue = ref(new Date().toISOString().slice(11, 19))
    const dayjsModelValue = computed<Dayjs>({
      set(value) {
        modelValue.value = value.toISOString().slice(11, 19)
      },
      get() {
        return dayjs()
          .utc()
          .hour(parseInt(modelValue.value.slice(0, 2)))
          .minute(parseInt(modelValue.value.slice(3, 5)))
          .second(parseInt(modelValue.value.slice(6, 8)))
      },
    })

    const isFocusing = ref(false)
    const shouldBlurOnNextTick = ref(false)
    const onFocus = () => {
      isFocusing.value = true
    }
    const onFocusPopup = () => {
      shouldBlurOnNextTick.value = false
      isFocusing.value = true
    }
    const onBlur = async () => {
      shouldBlurOnNextTick.value = true
      setTimeout(() => {
        if (shouldBlurOnNextTick.value) {
          isFocusing.value = false
        } else {
          inputRef.value.focus()
        }
      }, 100)
    }

    const onChange = useNormalizeInput(modelValue)

    const hourRange = useHourRange()
    const minuteRange = useMinuteRange()
    const secondRange = useSecondRange()

    const onClickHour = (hour: number) => {
      dayjsModelValue.value = dayjsModelValue.value.hour(hour)
    }
    const onClickMinute = (minute: number) => {
      dayjsModelValue.value = dayjsModelValue.value.minute(minute)
    }
    const onClickSecond = (second: number) => {
      dayjsModelValue.value = dayjsModelValue.value.second(second)
    }

    return {
      inputRef,
      modelValue,
      dayjsModelValue,
      onChange,

      hourRange,
      onClickHour,
      minuteRange,
      onClickMinute,
      secondRange,
      onClickSecond,

      isFocusing,
      onFocus,
      onFocusPopup,
      onBlur,
    }
  },
})
</script>

<style scoped>
.combobox {
  border-radius: 4px;
  border: 1px solid #eee;
  display: inline-flex;
  flex-direction: row;
}

.select:not(:first-child) {
  border-left: 1px solid #eee;
}

input {
  width: calc(56px * 3 + 4px);
}

input:focus {
  outline: none;
}
</style>
