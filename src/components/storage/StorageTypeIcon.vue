<template>
  <FaBandsAws v-if="type === 's3'" class="text-5xl" />
  <CaVolumeBlockStorage v-else-if="type === 'local'" class="text-5xl" />
  <CaVirtualMachine v-else-if="type === 'ssh'" class="text-5xl" />
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import type { StorageType } from '@/types/responses'

const props = defineProps<{
  type: StorageType
}>()
const type = toRef(props, 'type')
</script>

<style scoped></style>
