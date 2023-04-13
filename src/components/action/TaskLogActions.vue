<template>
  <button
    class="btn-primary btn-sm btn"
    @click="onRestore(data)"
    :class="{
      'btn-disabled': data.is_deleted || data.status != 'success'
    }"
  >
    <MdTwotoneRestore />
  </button>
  <button class="btn-error btn-sm btn" @click="onDelete([data.id])">
    <ReDeleteBin7Line />
  </button>
</template>

<script setup lang="ts">
import type { TaskLogResponse } from '@/types/responses'

defineProps<{
  data: TaskLogResponse
  onRestore: (data: TaskLogResponse) => void
  onDelete: (ids: number[]) => void
}>()
</script>

<style scoped></style>
