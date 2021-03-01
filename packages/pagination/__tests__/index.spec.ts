import { ref } from 'vue'
import { usePagination } from '../src'

it('should keep reactivity', () => {
  const originalCurrentPage = ref(1)
  const originalPerPageSize = ref(10)
  const originalTotalSize = ref(42)

  const { currentPage, perPageSize, totalSize } = usePagination({
    currentPage: originalCurrentPage,
    perPageSize: originalPerPageSize,
    totalSize: originalTotalSize,
  })

  expect(currentPage.value).toBe(1)
  expect(perPageSize.value).toBe(10)
  expect(totalSize.value).toBe(42)

  originalCurrentPage.value = 10
  originalPerPageSize.value = 100
  originalTotalSize.value = 420
  expect(currentPage.value).toBe(10)
  expect(perPageSize.value).toBe(100)
  expect(totalSize.value).toBe(420)

  currentPage.value = 1
  perPageSize.value = 10
  totalSize.value = 42
  expect(originalCurrentPage.value).toBe(1)
  expect(originalPerPageSize.value).toBe(10)
  expect(originalTotalSize.value).toBe(42)
})
