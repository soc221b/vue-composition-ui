import type { Ref } from 'vue'

/**
 * @public
 */
export type MaybeRef<T> = Ref<T> | T
