import { reactive, computed, toRefs } from 'vue'
import { createRange } from '../util'

import type { Ref } from 'vue'

export const isValidNumber = (n: unknown) => {
  if (n === undefined) return true

  if (typeof n !== 'number') return false
  if (Object.is(n, NaN)) return false
  if (n > Number.MAX_SAFE_INTEGER) return false
  if (n <= 0) return false

  return true
}
export const calcTotalPageSize = (perPageSize: Ref<number>, totalSize: Ref<number>) => {
  return Math.ceil(totalSize.value / perPageSize.value)
}
export const guaranteePageSizeInPageSizes = (currentPage: Ref<number>, totalPageSize: Ref<number>) => {
  if (currentPage.value < 1) currentPage.value = 1
  if (currentPage.value > totalPageSize.value) currentPage.value = totalPageSize.value
  if (Object.is(currentPage.value, NaN)) currentPage.value = 1
}
export const isValidPageSize = (currentPage: Ref<number>, totalPageSize: Ref<number>) => {
  return (
    Object.is(currentPage.value, NaN) === false && currentPage.value >= 1 && currentPage.value <= totalPageSize.value
  )
}

export interface UsePaginationParams {
  currentPage: Ref<number>
  perPageSize: Ref<number>
  totalSize: Ref<number>
}

export const usePagination = ({ currentPage, perPageSize, totalSize }: UsePaginationParams) => {
  if (isValidNumber(currentPage.value) === false) throw Error('Invalid param: currentPage.')
  if (isValidNumber(perPageSize.value) === false) throw Error('Invalid param: perPageSize.')
  if (isValidNumber(totalSize.value) === false) throw Error('Invalid param: totalSize.')

  const state: {
    currentPage: number
    perPageSize: number
    totalSize: number
    readonly currentPerPageSize: number
    readonly totalPageSize: number
    readonly pages: number[]

    readonly firstPage: number
    readonly isFirst: boolean
    readonly isLast: boolean
    readonly lastPage: number

    readonly hasPrev: boolean
    readonly prevPage: number
    readonly hasNext: boolean
    readonly nextPage: number
  } = reactive({
    currentPage,
    perPageSize,
    totalSize,
    currentPerPageSize: computed(() =>
      state.isLast ? state.totalSize - (state.totalPageSize - 1) * state.perPageSize : state.perPageSize,
    ),
    totalPageSize: computed(() => calcTotalPageSize(perPageSize, totalSize)),
    pages: computed(() => createRange(state.totalPageSize)),

    firstPage: 1,
    isFirst: computed(() => state.currentPage === 1),
    isLast: computed(() => state.lastPage === state.currentPage),
    lastPage: computed(() => state.totalPageSize),

    hasPrev: computed(() => state.currentPage > 1),
    prevPage: computed(() => currentPage.value - 1),
    hasNext: computed(() => state.lastPage > state.currentPage),
    nextPage: computed(() => currentPage.value + 1),
  })

  const goTo = (page: number) => {
    state.currentPage = page
  }

  return {
    ...toRefs(state),
    goTo,
  }
}
