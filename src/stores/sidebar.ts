import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

export const useSidebarClose = defineStore(
  'sidebar_close',
  (): { close: Ref<boolean> } => {
    const close = ref<boolean>(false)
    return {
      close
    }
  },
  { persist: true }
)
