import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

export const useColumns = defineStore(
  'columns',
  (): { columns: Ref<Record<string, string[]>> } => {
    const columns = ref<Record<string, string[]>>({})
    return {
      columns
    }
  },
  { persist: true }
)
