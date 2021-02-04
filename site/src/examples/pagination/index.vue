<template>
  <h2>Pagination</h2>

  <h3>
    Element
    <source-code-link path="pagination/Element.vue" />
  </h3>
  <element-example></element-example>

  <h3>
    Vuetify
    <source-code-link path="pagination/Vuetify.vue" />
  </h3>
  <vuetify-example></vuetify-example>

  <h3>
    Ant design
    <source-code-link path="pagination/AntDesign.vue" />
  </h3>
  <ant-design-example></ant-design-example>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ElementExample from './Element.vue'
import VuetifyExample from './Vuetify.vue'
import AntDesignExample from './AntDesign.vue'

export default defineComponent({
  components: {
    ElementExample,
    VuetifyExample,
    AntDesignExample,
  },
})
</script>
