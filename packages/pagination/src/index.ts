import { reactive, computed, toRefs } from 'vue'

import type { Ref, ToRefs } from 'vue'

/**
 * @public
 */
export interface UsePaginationParams {
  /**
   * Current page number
   */
  currentPage: Ref<number>

  /**
   * Maximum size of each page
   */
  perPageSize: Ref<number>

  /**
   * Total size of items
   */
  totalSize: Ref<number>
}

/**
 * @public
 */
export interface UsePaginationReturnType {
  /**
   * Current page number
   */
  currentPage: number

  /**
   * Maximum size of each page
   */
  perPageSize: number

  /**
   * Total size of items
   */
  totalSize: number

  /**
   * Size of current page
   * @example
   * If perPageSize is 10, currentPage is 5, and totalSize is 52
   * ```
   * console.log(currentSize) // 10 (41~50)
   * ```
   * @example
   * If perPageSize is 10, currentPage is 6, and totalSize is 52
   * ```
   * console.log(currentSize) // 2 (51~52)
   * ```
   */
  readonly currentSize: number

  /**
   * Total page numbers
   * @example
   * If perPageSize is 10, and totalSize is 50
   * ```
   * console.log(totalPage) // 5
   * ```
   * @example
   * If perPageSize is 10, and totalSize is 51
   * ```
   * console.log(totalPage) // 6
   * ```
   */
  readonly totalPage: number

  /**
   * A range from 1 to the totalPage
   * @example
   * If perPageSize is 10 and totalSize is 50:
   * ```
   * console.log(pageRange) // [1, 2, 3, 4, 5]
   * ```
   */
  readonly pageRange: number[]

  /**
   * 1-indexed of first item of current page
   * @example
   * If perPageSize is 10, currentPage is 5, and totalSize is 50
   * ```
   * console.log(currentStartSize) // 41 (41~50)
   * ```
   */
  readonly currentStartSize: number

  /**
   * 1-indexed of last item of current page
   * @example
   * If perPageSize is 10, currentPage is 5, and totalSize is 52
   * ```
   * console.log(currentEndSize) // 50 (41~50)
   * ```
   * @example
   * If perPageSize is 10, currentPage is 6, and totalSize is 52
   * ```
   * console.log(currentEndSize) // 52
   * ```
   */
  readonly currentEndSize: number

  /**
   * Whether current page is equals to first page
   */
  readonly isFirstPage: boolean

  /**
   * Always be 1
   */
  readonly firstPage: number

  /**
   * Whether current page is equals to last page
   */
  readonly isLastPage: boolean

  /**
   * Equals to totalPage
   */
  readonly lastPage: number

  /**
   * Whether current page is not equals to first page
   */
  readonly hasPrevPage: boolean

  /**
   * The previous number of current page
   */
  readonly prevPage: number

  /**
   * Whether current page is not equals to last page
   */
  readonly hasNextPage: boolean

  /**
   * The next number of current page
   */
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
    currentSize: computed(() => state.currentEndSize - state.currentStartSize + 1),
    totalPage: computed(() => calcTotalPageSize(perPageSize.value, totalSize.value)),
    pageRange: computed(() => createRange(state.totalPage)),

    currentStartSize: computed(() => state.prevPage * state.perPageSize + 1),
    currentEndSize: computed(() => (state.isLastPage ? state.totalSize : state.currentPage * state.perPageSize)),

    isFirstPage: computed(() => state.firstPage === state.currentPage),
    firstPage: 1,
    isLastPage: computed(() => state.lastPage === state.currentPage),
    lastPage: computed(() => state.totalPage),

    hasPrevPage: computed(() => state.currentPage > 1),
    prevPage: computed(() => currentPage.value - 1),
    hasNextPage: computed(() => state.lastPage > state.currentPage),
    nextPage: computed(() => currentPage.value + 1),
  })

  return toRefs(state)
}

/**
 * Modify currentPage if it is considered invalid
 * @public
 */
export function useGuaranteePageSize(currentPage: Ref<number>, totalPage: Ref<number>) {
  if (currentPage.value < 1) currentPage.value = 1
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value
  if (Number.isInteger(currentPage.value) === false) currentPage.value = 1
}

/**
 * @public
 */
export function validatePageNumber(name: string, number: unknown) {
  if (Number.isInteger(number) === false) throw TypeError(`\`${name}\` must be an integer.`)

  if (Number.isSafeInteger(number) === false) throw RangeError(`\`${name}\` must be a safe integer.`)

  if ((number as number) <= 0) throw RangeError(`\`${name}\` must greater than 0.`)
}

/**
 * @public
 */
export function calcTotalPageSize(perPageSize: number, totalSize: number) {
  return Math.ceil(totalSize / perPageSize)
}

/**
 * @public
 */
export function isValidPageSize(currentPage: Ref<number>, totalPage: Ref<number>) {
  return Number.isInteger(currentPage.value) && currentPage.value >= 1 && currentPage.value <= totalPage.value
}

/**
 * @public
 */
export function createRange(last: number, first = 1) {
  return Array(last - first + 1)
    .fill(null)
    .map((_, index) => index + first)
}
