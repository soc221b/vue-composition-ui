<template>
  <aside>
    <ul>
      <template v-for="route of routes" :key="route.name">
        <li>
          <b>
            <router-link :to="route">{{ route.name }}</router-link>
          </b>
        </li>
      </template>
    </ul>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Aside',

  setup() {
    const routes = useRouter()
      .getRoutes()
      .filter(route => route.name !== 'home')
    return {
      routes,
    }
  },
})
</script>

<style scoped>
ul {
  margin: 0;
  list-style-type: none;
  list-style-position: inside;
  padding: 0;
}

ul > li:not(:first-child) {
  margin-top: 16px;
}

ul > li a {
  color: black !important;
}
</style>
