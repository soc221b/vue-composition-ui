import { computed, unref } from 'vue'
import { createRange, rotate } from '@vue-composition-ui/shared'

import type { Ref } from 'vue'
import type { MaybeRef } from '@vue-composition-ui/shared'

/**
 * @public
 */
export function useHourRange(is24Hour: MaybeRef<boolean> = true): Ref<number[]> {
  return computed(() => {
    const is24Hour_ = unref(is24Hour)
    const rangeFor24Hour = createRange(0, 24)
    const rangeFor12Hour = rotate(createRange(1, 13), -1)
    return is24Hour_ ? rangeFor24Hour.value : rangeFor12Hour.value
  })
}

/**
 * @public
 */
export function useMinuteRange(): Ref<number[]> {
  return createRange(0, 60)
}

/**
 * @public
 */
export function useSecondRange(): Ref<number[]> {
  return createRange(0, 60)
}

/**
 * @public
 */
export function useInterval(range: MaybeRef<number[]>): Ref<number[]> {
  return computed(() => {
    return unref(range)
  })
}

const minuteRange = useMinuteRange().value
const secondRange = useSecondRange().value
export const useNormalizeInput = (() => {
  function normalize (n: string, range: number[]) {
    if (typeof n !== 'string') n = range[0] + ''
    if (isNaN(parseInt(n))) n = range[0] + ''
    if (parseInt(n) < range[0]) n = range[0] + ''
    if (parseInt(n) > range.slice(-1)[0]) n = range.slice(-1)[0] + ''
    return n.padStart(2, '0')
  }

  return (input: string, { is24Hour = true }: { is24Hour: MaybeRef<boolean> }) => {
    let [hour, minute, second] = input.split(':')
    hour = normalize(hour, useHourRange(unref(is24Hour)).value)
    minute = normalize(minute, minuteRange)
    second = normalize(second, secondRange)
    return [hour, minute, second].join(':')
  }
})()
