<template>
  <package-info />

  <h3>Example</h3>
  <h4>
    Ant design
    <source-code-link path="time/AntDesign.vue" />
  </h4>
  <ant-design-example></ant-design-example>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AntDesignExample from './ant-design/Index.vue'

export default defineComponent({
  components: {
    AntDesignExample,
  },
})
</script>
