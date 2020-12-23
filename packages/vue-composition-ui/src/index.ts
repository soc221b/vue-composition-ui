// TODO: use `export * as name from path` syntax
import {
  usePagination,
  useGuaranteePageSize,
  validatePageNumber,
  calcTotalPageSize,
  isValidPageSize,
  createRange,
} from '../../../packages/pagination/src'
import { useTags } from '../../../packages/tags/src'

/**
 * @public
 */
const pagination = {
  usePagination,
  useGuaranteePageSize,
  validatePageNumber,
  calcTotalPageSize,
  isValidPageSize,
  createRange,
}

/**
 * @alpha
 */
const tags = {
  useTags,
}

export { pagination, tags }

export type {
  usePagination,
  useGuaranteePageSize,
  validatePageNumber,
  calcTotalPageSize,
  isValidPageSize,
  createRange,
  UsePaginationParams,
  UsePaginationReturnType,
} from '../../../packages/pagination/src'
export type { UseTagsParams, useTags } from '../../../packages/tags/src'
