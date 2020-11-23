import { Ref, watchEffect } from 'vue'
import { noop } from '../util'

export interface Checkbox {
  checked: boolean
  indeterminate?: boolean
  disabled?: boolean
}

export interface UseCheckboxParams {
  modelValue: Ref<Checkbox>
  onChange?: (checkbox: Ref<Checkbox>) => {}
}

export function useCheckbox({ modelValue, onChange = noop }: UseCheckboxParams) {
  watchEffect(() => {
    onChange(modelValue)
  })

  return {
    modelValue,
  }
}

// useCheckbox({
//   modelValue: ref({
//     checked: true,
//     indeterminate: false,
//     disabled: true,
//   })
// })
