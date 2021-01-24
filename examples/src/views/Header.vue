<template>
  <header>
    <h1 id="logo">Vue Composition UI</h1>

    <div id="links">
      <template v-for="link of links" :key="link.href">
        <a :href="link.href" :target="link.target">{{ link.label }}</a>
      </template>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',

  setup() {
    const links = [
      {
        label: 'API reference',
        href: 'https://js-cosmos.github.io/vue-composition-ui/',
        target: '_blank',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/js-cosmos/vue-composition-ui',
        target: '_blank',
      },
    ]
    return {
      links,
    }
  },
})
</script>

<style scoped>
header {
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: auto;
  grid-template-areas: 'logo links';
  vertical-align: middle;
}

#logo {
  display: inline-block;
  grid-area: logo;
}

#links {
  grid-area: links;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#links > a {
  display: block;
  color: black !important;
}

#links > a[target='_blank']::after {
  margin-left: 4px;
  content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
}

#links > a:not(:last-child) {
  margin-right: 16px;
}
</style>
