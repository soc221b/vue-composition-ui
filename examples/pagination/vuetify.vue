<template>
  <ul class="v-pagination theme--light">
    <li>
      <button
        @click="goTo(prevPage)"
        class="v-pagination__navigation"
        :class="{ 'v-pagination__navigation--disabled': hasPrevPage === false }"
      >
        {{ '<' }}
      </button>
    </li>

    <!-- use index as key to prevent transition trigger -->
    <template v-for="(page, index) of pageRange" :key="index">
      <li>
        <span v-if="page === '...'" class="v-pagination__more">...</span>
        <button
          v-else
          class="v-pagination__navigation v-pagination__item"
          :class="{
            'v-pagination__item--active primary': currentPage === page,
          }"
          @click="goTo(page)"
        >
          {{ page }}
        </button>
      </li>
    </template>

    <li>
      <button
        @click="goTo(nextPage)"
        class="v-pagination__navigation"
        :class="{ 'v-pagination__navigation--disabled': hasNextPage === false }"
      >
        {{ '>' }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'
import { createRange } from '../../src/util'
import { usePagination, guaranteePageSizeInPageSizes } from '../../src/pagination/index'

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
    } = usePagination({ currentPage: ref(1), perPageSize: ref(10), totalSize: ref(150) })

    const leftPageRange = computed(() => {
      if (totalPageSize.value <= 7) return []
      else if (currentPage.value <= 2) return createRange(3)
      else if (currentPage.value <= 3) return createRange(5)
      else if (totalPageSize.value - currentPage.value <= 1) return createRange(3)
      else if (totalPageSize.value - currentPage.value <= 2) return [1]
      else return [1, '...']
    })

    const middlePageRange = computed(() => {
      if (totalPageSize.value <= 7) return createRange(totalPageSize.value)
      else if (currentPage.value <= 3) return ['...']
      else if (totalPageSize.value - currentPage.value <= 2) return ['...']
      else return createRange(currentPage.value + 1, currentPage.value - 1)
    })

    const rightPageRange = computed(() => {
      if (totalPageSize.value <= 7) return []
      else if (currentPage.value <= 2) return createRange(totalPageSize.value, totalPageSize.value - 2)
      else if (currentPage.value <= 3) return [totalPageSize.value]
      else if (totalPageSize.value - currentPage.value <= 1)
        return createRange(totalPageSize.value, totalPageSize.value - 2)
      else if (totalPageSize.value - currentPage.value <= 2)
        return createRange(totalPageSize.value, totalPageSize.value - 4)
      else return ['...', totalPageSize.value]
    })

    const pageRange = computed(() => leftPageRange.value.concat(middlePageRange.value, rightPageRange.value))

    watchEffect(() => {
      if (typeof currentPage.value === 'string') {
        currentPage.value = parseInt(currentPage.value, 10)
      }
      if ((currentPage.value as unknown) === '') {
        currentPage.value = 1
      }
      guaranteePageSizeInPageSizes(currentPage, totalPageSize)
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
html {
  font-size: 16px;
}

.v-pagination {
  align-items: center;
  display: inline-flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-width: 100%;
  width: 100%;
  user-select: none;
}

.v-pagination .primary {
  background-color: #1867c0 !important;
  border-color: #1867c0 !important;
}

.v-pagination > li {
  align-items: center;
  display: flex;
}

.v-pagination__navigation {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 32px;
  width: 32px;
  margin: 0.3rem 10px;
}

.v-pagination__navigation--disabled {
  opacity: 0.6;
  pointer-events: none;
}

.theme--light.v-pagination .v-pagination__item {
  background: #fff;
  color: rgba(0, 0, 0, 0.87);
}

.v-pagination__item {
  background: transparent;
  border-radius: 4px;
  font-size: 1rem;
  height: 34px;
  margin: 0.3rem;
  min-width: 34px;
  padding: 0 5px;
  text-decoration: none;
  transition: 0.3s cubic-bezier(0, 0, 0.2, 1);
  width: auto;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.v-pagination__item--active {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}

.v-pagination__more {
  margin: 0.3rem;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  height: 32px;
  width: 32px;
}

.theme--light.v-pagination .v-pagination__item--active {
  color: #fff;
}

button {
  cursor: pointer;
  background-color: transparent;
  border-style: none;
}
</style>
