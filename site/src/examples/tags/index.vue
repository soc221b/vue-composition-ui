<template>
  <h2>Tags</h2>

  <h3>
    Element
    <source-code-link path="tags/element/Index.vue" />
  </h3>
  <element-example></element-example>

  <h3>
    Ant design
    <source-code-link path="tags/AntDesign.vue" />
  </h3>
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
