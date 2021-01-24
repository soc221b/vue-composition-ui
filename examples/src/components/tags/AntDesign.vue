<template>
  <template v-for="tag of tagsWithNewTag" :key="tag.label">
    <div class="tag" :class="{ closable: tag.closable, editable: tag.editable }">
      <template v-if="tag.editable">
        <template v-if="isEditing">
          <input
            ref="input"
            v-model="editingTag"
            @keyup.esc="cancelEdit"
            @keyup.enter="doneEdit"
            @blur="isEditing = false"
            class="label"
          />
        </template>
        <template v-else>
          <div @click="isEditing = true" class="label">{{ tag.label }}</div>
        </template>
      </template>
      <template v-else>
        <div @class="label">{{ tag.label }}</div>
      </template>

      <button v-if="tag.closable" class="close" @click="remove(tag)">x</button>
    </div>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watchEffect } from 'vue'
import { useTags } from '@vue-composition-ui/tags'

interface Tag {
  label: string
  closable: boolean
  editable: boolean
}

export default defineComponent({
  setup() {
    const tags = ref<Tag[]>([
      { label: 'Unremovable', closable: false, editable: false },
      { label: 'Tag1', closable: true, editable: false },
      { label: 'Tag2', closable: true, editable: false },
    ])
    const tagsWithNewTag = computed(() => tags.value.concat({ label: '+ New tag', closable: false, editable: true }))
    const { add, remove, has } = useTags(tags)

    const input = ref()
    const editingTag = ref('')
    const isEditing = ref(false)
    watchEffect(async () => {
      if (isEditing.value) {
        await nextTick()
        input.value.focus()
      }
    })
    const cancelEdit = () => {
      isEditing.value = false
    }
    const doneEdit = () => {
      if (editingTag.value) {
        add({ label: editingTag.value, closable: true, editable: false })
      }
      editingTag.value = ''
    }

    return {
      tagsWithNewTag,
      add,
      remove,
      has,
      input,
      editingTag,
      isEditing,
      cancelEdit,
      doneEdit,
    }
  },
})
</script>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 2px 4px;
  height: 20px;
}

.tag:not(:first-child) {
  margin-left: 4px;
}

.tag.editable {
  border-style: dashed;
}

.tag .label {
  display: inline-block;
  width: fit-content;
}

.tag input.label {
  border: none;
  outline: none;
}

.tag .close {
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
}
</style>
