<template>
  <DeMysqlOriginalWordmark v-if="type === 'mysql'" class="text-5xl" />
  <DePostgresqlOriginalWordmark v-else-if="type === 'postgres'" class="text-5xl" />
  <CaVolumeBlockStorage v-else-if="type === 'local'" class="text-5xl" />
  <CaVirtualMachine v-else-if="type === 'ssh'" class="text-5xl" />
  <VsFolderTypeMongodb v-if="type === 'mongo'" class="text-5xl" />
  <DeRedisOriginal v-if="type === 'redis'" class="text-5xl" />
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import type { DataSourceType } from '@/types/responses'

const props = defineProps<{
  type: DataSourceType
}>()
const type = toRef(props, 'type')
</script>

<style scoped></style>
