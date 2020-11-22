<template>
  <span>Current page:</span>
  <input v-model.lazy="currentPage" type="number" :min="1" :max="totalPageSize" />
  <br />

  <span>Per page size:</span>
  <input v-model.lazy="perPageSize" type="number" :min="1" />
  <br />

  <span>Customize total size:</span>
  <input v-model.lazy="totalSize" type="number" :min="1" />
  <br />

  <p>{{ currentStartSize }} / {{ currentEndSize }} of {{ totalSize }}</p>
  <p>Current page size: {{ currentPerPageSize }}</p>

  <div class="pagination">
    <span class="page first" :class="{ disabled: isFirstPage }" @click="goTo(firstPage)"></span>
    <span class="page prev" :class="{ disabled: hasPrevPage === false }" @click="goTo(prevPage)"></span>

    <template v-for="page of leftPageRange" :key="'left-' + page">
      <span class="page" :class="{ current: currentPage === page, disabled: page === '...' }" @click="goTo(page)">
        {{ page }}
      </span>
    </template>

    <template v-for="page of middlePageRange" :key="'middle' + page">
      <span class="page" :class="{ current: currentPage === page, disabled: page === '...' }" @click="goTo(page)">
        {{ page }}
      </span>
    </template>

    <template v-for="page of rightPageRange" :key="'right' + page">
      <span class="page" :class="{ current: currentPage === page, disabled: page === '...' }" @click="goTo(page)">
        {{ page }}
      </span>
    </template>

    <span class="page next" :class="{ disabled: hasNextPage === false }" @click="goTo(nextPage)"></span>
    <span class="page last" :class="{ disabled: isLastPage }" @click="goTo(lastPage)"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect } from 'vue'
import { createRange } from '../../src/util'
import { usePagination, guaranteePageSizeInPageSizes, isValidPageSize } from '../../src/pagination/index'

export default defineComponent({
  name: 'example-1',

  setup() {
    const perPageSizes = [10, 20, 30, 40]

    const {
      pageRange,
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
    } = usePagination({ currentPage: ref(1), perPageSize: ref(10), totalSize: ref(100) })

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
      leftPageRange,
      middlePageRange,
      rightPageRange,
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
.page {
  padding: 0 4px;
  background: #fff;
  vertical-align: top;
  display: inline-block;
  font-size: 13px;
  min-width: 30px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  border-radius: 2px;
  user-select: none;
}

.page:first-child {
  margin: 0;
}

.page.first:before {
  content: '<<';
}

.page.prev::before {
  content: '<';
}

.page.current {
  cursor: default;
  color: #fff;
  background-color: #409eff;
}

.page.next::before {
  content: '>';
}

.page.last::before {
  content: '>>';
}

.page.disabled {
  pointer-events: none;
  color: #c0c4cc;
  cursor: not-allowed;
}

input {
  margin-left: 5px;
  padding: 0 4px;
  font-size: 13px;
  height: 24px;
  width: 50px;
  line-height: 24px;
}

.per-page {
  padding: 0 4px;
  font-size: 13px;
  height: 28px;
  width: 90px;
}
</style>
