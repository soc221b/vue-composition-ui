<template>
  <h1>vue-composition-ui-lib</h1>
  <pagination></pagination>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Pagination from './pagination/Index.vue'

export default defineComponent({
  components: {
    Pagination,
  },
})
</script>
