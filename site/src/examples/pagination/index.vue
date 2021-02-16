<template>
  <package-info />

  <h3>Example</h3>
  <h4>
    Element
    <source-code-link path="pagination/Element.vue" />
  </h4>
  <element-example></element-example>

  <h4>
    Vuetify
    <source-code-link path="pagination/Vuetify.vue" />
  </h4>
  <vuetify-example></vuetify-example>

  <h4>
    Ant design
    <source-code-link path="pagination/AntDesign.vue" />
  </h4>
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
