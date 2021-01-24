import { computed, Ref, ComputedRef } from 'vue'

/**
 * @alpha
 */
export function useTags<Tag>(tags: Ref<Tag[]>, isEqual = (a: Tag, b: Tag) => a === b) {
  const has: ComputedRef<(tag: Tag) => boolean> = computed(() => (tag: Tag) => {
    return tags.value.some(t => isEqual(t, tag))
  })

  function add(tag: Tag) {
    if (has.value(tag)) return

    tags.value = tags.value.concat(tag)
  }

  function remove(tag: Tag) {
    if (has.value(tag) === false) return

    const foundIndex = tags.value.findIndex(t => isEqual(t, tag))
    tags.value = tags.value.slice(0, foundIndex).concat(tags.value.slice(foundIndex + 1))
  }

  return {
    add,
    remove,
    has,
  }
}
