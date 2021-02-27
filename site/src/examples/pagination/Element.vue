<template>
  <div class="el-pagination">
    <span class="el-pagination__total">Total: {{ totalSize }}</span>

    <select class="el-pagination__sizes" v-model.lazy="perPageSize">
      <option v-for="size of [100, 200, 300, 400]" :key="size" :value="size" :selected="perPageSize === size">
        {{ size }}/Page
      </option>
    </select>

    <button class="btn-prev" :disabled="hasPrevPage === false" @click="goTo(prevPage)">&lt;</button>
    <ul class="el-pager">
      <template v-for="page of pageRange" :key="page">
        <li class="number" :class="{ active: currentPage === page }" @click="goTo(page)">
          {{ page }}
        </li>
      </template>
    </ul>
    <button class="btn-next" :disabled="hasNextPage === false" @click="goTo(nextPage)">></button>

    <span>Go to</span>
    <input v-model.lazy="currentPage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { usePagination, useGuaranteePageSize } from '@vue-composition-ui/pagination'

export default defineComponent({
  setup() {
    const {
      pageRange,
      currentPage,
      perPageSize,
      totalPage,
      totalSize,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    } = usePagination({ currentPage: ref(1), perPageSize: ref(100), totalSize: ref(400) })

    watchEffect(() => {
      if (typeof currentPage.value === 'string') {
        currentPage.value = parseInt(currentPage.value, 10)
      }
      if ((currentPage.value as unknown) === '') {
        currentPage.value = 1
      }
      useGuaranteePageSize(currentPage, totalPage)
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
      goTo,
      prevPage,
      nextPage,
      totalPage,

      currentPage,
      perPageSize,

      totalSize,
    }
  },
})
</script>

<style scoped>
.el-pagination {
  display: inline-flex;
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
}

.el-pagination__total {
  margin-right: 10px;
  font-weight: 400;
  color: #606266;
}

.el-pagination button,
.el-pagination span:not([class*='suffix']) {
  display: inline-block;
  font-size: 13px;
  min-width: 25.5px;
  height: 28px;
  line-height: 28px;
  vertical-align: top;
  box-sizing: border-box;
}

.el-pagination__sizes {
  padding-right: 25px;
  border-radius: 3px;
}

.el-pagination button {
  border: none;
  padding: 0 6px;
  background: transparent;
  outline: none;
}

.el-pagination button:disabled {
  color: #c0c4cc;
  background-color: #fff;
  cursor: not-allowed;
}

.el-pagination .btn-next,
.el-pagination .btn-prev {
  background: 50% no-repeat;
  background-size: 16px;
  background-color: #fff;
  cursor: pointer;
  margin: 0;
  color: #303133;
}

.el-pager {
  user-select: none;
  list-style: none;
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  padding: 0;
  margin: 0;
}

.el-pager li {
  padding: 0 4px;
  background: #fff;
  vertical-align: top;
  display: inline-block;
  font-size: 13px;
  min-width: 25.5px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  margin: 0;
}

.el-pager li.active {
  color: #409eff;
  cursor: default;
}
</style>
