<template>
  <span>{{ currentStartSize }}-{{ currentEndSize }} of {{ totalSize }} items</span>

  <ul class="ant-pagination">
    <li
      class="ant-pagination-prev"
      :class="{ 'ant-pagination-disabled': hasPrevPage === false }"
      @click="goTo(prevPage)"
    >
      <a>Previous</a>
    </li>

    <template v-for="page of pageRange" :key="'right' + page">
      <li v-if="page === 'jumpPrev'" class="ant-pagination-jump-prev" @click="goTo(currentPage - 5)">
        <a>•••</a>
      </li>
      <li v-else-if="page === 'jumpNext'" class="ant-pagination-jump-next" @click="goTo(currentPage + 5)">
        <a>•••</a>
      </li>
      <li
        v-else
        class="ant-pagination-item"
        :class="{ 'ant-pagination-item-active': currentPage === page }"
        @click="goTo(page)"
      >
        <a>{{ page }}</a>
      </li>
    </template>

    <li
      class="ant-pagination-next"
      :class="{ 'ant-pagination-disabled': hasNextPage === false }"
      @click="goTo(nextPage)"
    >
      <a>Next</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'
import { createRange } from '../../src/util'
import { usePagination, useGuaranteePageSize } from '../../src/pagination/index'

export default defineComponent({
  name: 'example-1',

  setup() {
    const perPageSizes = [10, 20, 30, 40]

    const {
      currentPage,
      perPageSize,
      totalPageSize,
      totalSize,
      currentPerPageSize,
      currentStartSize,
      currentEndSize,
      hasPrevPage,
      hasNextPage,
      isFirstPage,
      isLastPage,
      firstPage,
      lastPage,
      prevPage,
      nextPage,
    } = usePagination({ currentPage: ref(1), perPageSize: ref(10), totalSize: ref(500) })

    const leftPageRange = computed(() => {
      if (totalPageSize.value <= 7) return []
      else if (currentPage.value <= 3) return createRange(4)
      else if (currentPage.value <= 4) return createRange(5)
      else return [1, 'jumpPrev']
    })

    const middlePageRange = computed(() => {
      if (totalPageSize.value <= 7) return createRange(totalPageSize.value)
      else if (currentPage.value <= 4) return []
      else if (totalPageSize.value - currentPage.value <= 3) return []
      else return createRange(currentPage.value + 1, currentPage.value - 1)
    })

    const rightPageRange = computed(() => {
      if (totalPageSize.value <= 7) return []
      else if (totalPageSize.value - currentPage.value <= 2)
        return createRange(totalPageSize.value, totalPageSize.value - 3)
      else if (totalPageSize.value - currentPage.value <= 3)
        return createRange(totalPageSize.value, totalPageSize.value - 4)
      else return ['jumpNext', totalPageSize.value]
    })

    const pageRange = computed(() => leftPageRange.value.concat(middlePageRange.value, rightPageRange.value))

    watchEffect(() => {
      if (typeof currentPage.value === 'string') {
        currentPage.value = parseInt(currentPage.value, 10)
      }
      if ((currentPage.value as unknown) === '') {
        currentPage.value = 1
      }
      useGuaranteePageSize(currentPage, totalPageSize)
    })

    watchEffect(() => {
      if (typeof perPageSize.value === 'string') {
        perPageSize.value = parseInt(perPageSize.value, 10)
      }
      if ((perPageSize.value as unknown) === '') {
        perPageSize.value = 1
      }
    })

    watchEffect(() => {
      if (typeof totalSize.value === 'string') {
        totalSize.value = parseInt(totalSize.value, 10)
      }
      if ((totalSize.value as unknown) === '') {
        totalSize.value = 1
      }
    })

    const goTo = (page: number) => {
      currentPage.value = page
    }

    return {
      pageRange,
      hasPrevPage,
      hasNextPage,
      isFirstPage,
      isLastPage,
      goTo,
      firstPage,
      lastPage,
      prevPage,
      nextPage,
      totalPageSize,

      perPageSizes,
      currentPage,
      currentPerPageSize,
      perPageSize,
      currentStartSize,
      currentEndSize,

      totalSize,
    }
  },
})
</script>

<style scoped>
.ant-pagination {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  font-feature-settings: 'tnum';
  user-select: none;
}

.ant-pagination-disabled {
  color: rgba(0, 0, 0, 0.25);
  border-color: #d9d9d9;
  cursor: not-allowed;
}

.ant-pagination-item {
  min-width: 32px;
  font-family: Arial;
  text-align: center;
  list-style: none;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: 0;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.ant-pagination-item-active {
  font-weight: 500;
  background: #fff;
  border-color: #1890ff;
}

.ant-pagination-jump-prev > a,
.ant-pagination-jump-next > a {
  top: 1.5px;
  position: relative;
}

.ant-pagination-item,
.ant-pagination-jump-prev,
.ant-pagination-jump-next {
  display: inline-block;
  height: 32px;
  margin-right: 8px;
  line-height: 30px;
  vertical-align: middle;
  cursor: pointer;
}

.ant-pagination-prev {
  margin-right: 8px;
}

.ant-pagination-prev,
.ant-pagination-next {
  display: inline-block;
  min-width: 32px;
  height: 32px;
  color: rgba(0, 0, 0, 0.65);
  font-family: Arial;
  line-height: 32px;
  text-align: center;
  vertical-align: middle;
  list-style: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.ant-pagination-prev > a,
.ant-pagination-next > a {
  top: -1.5px;
  position: relative;
}
</style>
