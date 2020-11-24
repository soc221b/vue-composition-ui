<template>
  <h1>Element</h1>
  <element-example></element-example>
  <h1>Vuetify</h1>
  <vuetify-example></vuetify-example>
  <h1>Ant design</h1>
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
