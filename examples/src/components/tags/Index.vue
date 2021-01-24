<template>
  <h2 id="tag">tag</h2>

  <h3>element</h3>
  <element-example></element-example>

  <h3>ant design</h3>
  <ant-design-example></ant-design-example>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ElementExample from './element/Index.vue'
import AntDesignExample from './AntDesign.vue'

export default defineComponent({
  name: 'tag',
  components: {
    ElementExample,
    AntDesignExample,
  },
})
</script>
