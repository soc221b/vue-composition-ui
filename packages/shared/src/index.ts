import { computed, unref } from 'vue'

import type { Ref } from 'vue'
import type { MaybeRef } from './types'

export * from './types'

/**
 * @public
 */
export function createRange(start: MaybeRef<number>, end: MaybeRef<number>): Ref<number[]> {
  return computed(() => {
    const start_ = unref(start)
    const end_ = unref(end)
    const diff = computed(() => Math.max(start_, end_) - Math.min(start_, end_))
    const range = computed(() =>
      Array(diff.value)
        .fill(null)
        .map((_, index) => index),
    )

    return start <= end ? range.value.map(n => n + start_) : range.value.reverse().map(n => n + end_ + 1)
  })
}

/**
 * @public
 */
export function rotate<T extends any>(arr: MaybeRef<T[]>, step: MaybeRef<number>): Ref<T[]> {
  return computed(() => {
    const arr_ = unref(arr)
    const step_ = unref(step)
    return arr_.slice(step_).concat(arr_.slice(0, step_))
  })
}
