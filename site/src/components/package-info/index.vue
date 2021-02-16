<template>
  <h2>
    {{ packageName.charAt(0).toUpperCase() + packageName.slice(1) }}
  </h2>

  <a class="no-icon" :href="`https://www.npmjs.com/package/@vue-composition-ui/${packageName}`" target="_blank">
    <img :src="`https://img.shields.io/npm/v/@vue-composition-ui/${packageName}`" />
  </a>
  <a class="no-icon" :href="`https://bundlephobia.com/result?p=@vue-composition-ui/${packageName}`" target="_blank">
    <img :src="`https://img.shields.io/bundlephobia/min/@vue-composition-ui/${packageName}`" />
  </a>

  <h3>Installation</h3>

  <p>via npm</p>
  <p>
    <code>yarn add @vue-composition-ui/{{ packageName }}</code>
  </p>

  <p>via CDN</p>
  <p>
    <code> &lt;script src="https://unpkg.com/@vue-composition-ui/{{ packageName }}@latest">&lt;/script> </code>
  </p>

  <h3>
    API
    <a
      :href="`https://github.com/iendeavor/vue-composition-ui/blob/HEAD/api-reference/${packageName}.md`"
      target="_blank"
    >
    </a>
  </h3>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    return {
      packageName: computed(() => useRoute().path.split('/').pop()),
    }
  },
})
</script>
