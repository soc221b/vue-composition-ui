<template>
  <Header></Header>

  <Aside></Aside>

  <main>
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './views/Header.vue'
import Aside from './views/Aside.vue'

export default defineComponent({
  components: {
    Header,
    Aside,
  },
})
</script>
