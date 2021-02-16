<template>
  <package-info />

  <h3>Example</h3>
  <h4>
    Element
    <source-code-link path="tags/element/Index.vue" />
  </h4>
  <element-example></element-example>

  <h4>
    Ant design
    <source-code-link path="tags/AntDesign.vue" />
  </h4>
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
