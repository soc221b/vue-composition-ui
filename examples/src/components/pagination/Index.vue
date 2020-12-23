<template>
  <h2>pagination</h2>

  <h3>element</h3>
  <element-example></element-example>

  <h3>vuetify</h3>
  <vuetify-example></vuetify-example>

  <h3>ant design</h3>
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
