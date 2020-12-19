import { reactive, computed, toRefs } from 'vue'
import { createRange } from '../util'

import type { Ref, ToRefs } from 'vue'

/**
 * @public
 */
export interface UsePaginationParams {
  currentPage: Ref<number>
  perPageSize: Ref<number>
  totalSize: Ref<number>
}

/**
 * @public
 */
export interface UsePaginationReturnType {
  currentPage: number
  perPageSize: number
  totalSize: number
  readonly currentPerPageSize: number
  readonly totalPageSize: number
  readonly pageRange: number[]

  readonly currentStartSize: number
  readonly currentEndSize: number

  readonly isFirstPage: boolean
  readonly firstPage: number
  readonly isLastPage: boolean
  readonly lastPage: number

  readonly hasPrevPage: boolean
  readonly prevPage: number
  readonly hasNextPage: boolean
  readonly nextPage: number
}

/**
 * @public
 */
export function usePagination({
  currentPage,
  perPageSize,
  totalSize,
}: UsePaginationParams): ToRefs<UsePaginationReturnType> {
  validatePageNumber('currentPage', currentPage.value)
  validatePageNumber('perPageSize', perPageSize.value)
  validatePageNumber('totalSize', totalSize.value)

  const state: UsePaginationReturnType = reactive({
    currentPage,
    perPageSize,
    totalSize,
    currentPerPageSize: computed(() => state.currentEndSize - state.currentStartSize + 1),
    totalPageSize: computed(() => calcTotalPageSize(perPageSize.value, totalSize.value)),
    pageRange: computed(() => createRange(state.totalPageSize)),

    currentStartSize: computed(() => state.prevPage * state.perPageSize + 1),
    currentEndSize: computed(() => (state.isLastPage ? state.totalSize : state.currentPage * state.perPageSize)),

    isFirstPage: computed(() => state.firstPage === state.currentPage),
    firstPage: 1,
    isLastPage: computed(() => state.lastPage === state.currentPage),
    lastPage: computed(() => state.totalPageSize),

    hasPrevPage: computed(() => state.currentPage > 1),
    prevPage: computed(() => currentPage.value - 1),
    hasNextPage: computed(() => state.lastPage > state.currentPage),
    nextPage: computed(() => currentPage.value + 1),
  })

  return toRefs(state)
}

export function useGuaranteePageSize(currentPage: Ref<number>, totalPageSize: Ref<number>) {
  if (currentPage.value < 1) currentPage.value = 1
  if (currentPage.value > totalPageSize.value) currentPage.value = totalPageSize.value
  if (Number.isInteger(currentPage.value) === false) currentPage.value = 1
}

export function validatePageNumber(name: string, number: unknown) {
  if (Number.isInteger(number) === false) throw TypeError(`\`${name}\` must be an integer.`)

  if (Number.isSafeInteger(number) === false) throw RangeError(`\`${name}\` must be a safe integer.`)

  if ((number as number) <= 0) throw RangeError(`\`${name}\` must greater than 0.`)
}

export function calcTotalPageSize(perPageSize: number, totalSize: number) {
  return Math.ceil(totalSize / perPageSize)
}

export function isValidPageSize(currentPage: Ref<number>, totalPageSize: Ref<number>) {
  return Number.isInteger(currentPage.value) && currentPage.value >= 1 && currentPage.value <= totalPageSize.value
}
