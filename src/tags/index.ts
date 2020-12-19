import { Ref } from 'vue'

/**
 * @alpha
 */
export interface UseTagsParams {
  tags: Ref<any[]>
  allowDuplicate: boolean
  isSame?(a: unknown, b: unknown): boolean
}

/**
 * @alpha
 */
export const useTags = ({
  tags,
  allowDuplicate = false,
  isSame = (a: unknown, b: unknown) => a === b,
}: UseTagsParams) => {
  function isAlreadyExist(tag: unknown) {
    if (allowDuplicate) {
      return false
    } else {
      return tags.value.findIndex(t => isSame(t, tag)) !== -1
    }
  }

  function addTag(tag: unknown) {
    if (isAlreadyExist(tag)) return

    tags.value = tags.value.concat(tag)
  }

  function deleteTag(tag: unknown) {
    if (isAlreadyExist(tag) === false) return

    const foundIndex = tags.value.findIndex(t => isSame(t, tag))
    tags.value = tags.value.slice(0, foundIndex).concat(tags.value.slice(foundIndex + 1))
  }

  return {
    addTag,
    deleteTag,
  }
}
