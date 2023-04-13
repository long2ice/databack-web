<template>
  <div class="flex items-center gap-4">
    <template v-if="selected.length > 0 && onDelete">
      <div>{{ $t('rows_selected', { num: selected.length }) }}</div>
      <button class="btn-error btn-sm btn" @click="deleteSelected">
        {{ $t('delete_selected') }}
      </button>
    </template>
    <div class="dropdown dropdown-end ml-auto">
      <label tabindex="0" class="btn-sm btn m-1">{{ $t('columns') }}</label>
      <ul
        tabindex="0"
        class="dropdown-content flex w-32 flex-col gap-2 rounded-md bg-base-100 p-4 shadow"
      >
        <li v-for="field in fields" class="flex items-center gap-2" :key="field.field">
          <input
            type="checkbox"
            class="checkbox checkbox-sm"
            v-model="columns"
            :value="field.field"
          />
          <span class="text-sm">{{ field.label }}</span>
        </li>
      </ul>
    </div>
  </div>
  <table class="table w-full">
    <thead>
      <tr>
        <th v-if="onDelete">
          <input type="checkbox" class="checkbox" v-model="selectAll" />
        </th>
        <th v-for="field in realFields" :key="field.field">{{ field.label }}</th>
        <th v-if="actions">{{ $t('action') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d in data" :key="d.id" class="hover">
        <th v-if="onDelete">
          <input type="checkbox" class="checkbox" v-model="selected" :value="d.id" />
        </th>
        <td v-for="(field, index) in realFields" :key="field.field">
          <template v-if="field.truncate">
            <div class="message max-w-xs" @click="clipboardHandler(d[field.field])">
              {{ d[field.field] }}
            </div>
            <span class="message-tooltip">{{ d[field.field] }}</span>
          </template>
          <Component
            v-else-if="field.formatter"
            :is="field.formatter(d, field.field, d[field.field], index)"
          >
          </Component>
          <template v-else>
            {{ d[field.field] }}
          </template>
        </td>
        <th v-if="actions" class="flex gap-1">
          <Component :is="actions" :data="d" />
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { TableField } from '@/types/common'
import { Clipboard } from 'v-clipboard'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import type { Component } from 'vue'
import { computed, ref, watch } from 'vue'
const { t } = useI18n()
const props = defineProps<{
  data: Record<string, any>[]
  fields: TableField[]
  actions?: Component
  onDelete?: (ids: number[]) => void
}>()
const selected = ref<number[]>([])
const selectAll = ref(false)
watch(selectAll, (val) => {
  if (val) {
    selected.value = props.data.map((d) => d.id)
  } else {
    selected.value = []
  }
})
watch(selected, (val) => {
  selectAll.value = val.length === props.data.length
})
const clipboardHandler = async (message: string) => {
  await Clipboard.copy(message)
  toast.success(t('copied'))
}
const columns = ref(props.fields.map((f) => !f.defaultHidden && f.field))
const realFields = computed(() => {
  return props.fields.filter((f) => columns.value.includes(f.field))
})
const deleteSelected = async () => {
  await props.onDelete?.(selected.value)
  selected.value = []
}
</script>

<style scoped></style>
