<template>
  <a :href="`https://github.com/js-cosmos/vue-composition-ui/blob/HEAD/site/src/examples/${path}`" target="_blank"> </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    path: {
      required: true,
      type: String,
    },
  },
})
</script>
