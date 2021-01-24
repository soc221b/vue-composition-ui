<template>
  <div>
    <h1>Renderless Component Library</h1>

    <p>Vue Composition UI is a highly customized UI solution based on Vue 3 reactivity API.</p>

    <br />
    <br />

    <p>
      Check out
      <a href="https://adamwathan.me/renderless-components-in-vuejs/" target="_blank"
        >Renderless Components in Vue.js - Adam Wathan</a
      >
      to see more about renderless components.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
