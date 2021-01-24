<template>
  <h2>Tags</h2>

  <h3>
    <a
      href="https://github.com/js-cosmos/vue-composition-ui/blob/HEAD/examples/src/components/tags/element/Index.vue"
      target="_blank"
      >Element</a
    >
  </h3>
  <element-example></element-example>

  <h3>
    <a
      href="https://github.com/js-cosmos/vue-composition-ui/blob/HEAD/examples/src/components/tags/AntDesign.vue"
      target="_blank"
      >Ant design</a
    >
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
