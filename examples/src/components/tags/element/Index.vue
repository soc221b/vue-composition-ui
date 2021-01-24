<template>
  <template v-for="tag of tags" :key="tag.label">
    <element-tag :label="tag.label" :type="tag.type" :size="tag.size" :close="() => remove(tag)"></element-tag>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ElementTag, { Type, Size } from './Tag.vue'
import { useTags } from '@vue-composition-ui/tags'

interface Tag {
  label: String
  type?: Type
  size?: Size
}

export default defineComponent({
  name: 'element',
  components: {
    ElementTag,
  },

  setup() {
    const tags = ref<Tag[]>([
      { label: 'Tag 1', size: 'large' },
      { label: 'Tag 2', type: 'success' },
      { label: 'Tag 3', type: 'info', size: 'medium' },
      { label: 'Tag 4', type: 'warning', size: 'small' },
      { label: 'Tag 5', type: 'danger', size: 'mini' },
    ])
    const { remove } = useTags(tags)

    return {
      tags,
      remove,
    }
  },
})
</script>
