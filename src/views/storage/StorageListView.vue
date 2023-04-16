<template>
  <div class="flex flex-row gap-2">
    <input
      type="text"
      :placeholder="t('search_placeholder')"
      class="input-bordered input"
      v-model="name"
      @keyup.enter="initData"
    />
    <select @keyup.enter="initData" class="select-bordered select w-full max-w-xs" v-model="type">
      <option :value="undefined">{{ t('select_storage_type') }}</option>
      <option value="s3">S3</option>
      <option value="local">{{ t('local') }}</option>
      <option value="ssh">SSH</option>
    </select>
    <button class="btn-primary btn" @click="initData">{{ t('search') }}</button>
    <button class="btn-warning btn" @click="onReset">{{ t('reset') }}</button>
    <router-link class="btn ml-auto" to="/storage/add">
      <ChPlus class="mr-1" />
      {{ $t('add_storage') }}
    </router-link>
  </div>
  <DataTable
    :data="data.data"
    :total="data.total"
    :fields="fields"
    :actions="actions"
    :onDelete="onDelete"
    :onSort="onSort"
  />
  <div class="flex items-center justify-center">
    <div class="btn-group grid grid-cols-2">
      <button
        class="btn-outline btn"
        @click="query.offset -= query.limit"
        :disabled="query.offset == 0"
      >
        {{ $t('previous') }}
      </button>
      <button
        class="btn-outline btn"
        @click="query.offset += query.limit"
        :disabled="query.offset + query.limit >= data.total"
      >
        {{ $t('next') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as storage from '@/api/storage'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import { parseDate } from '@/utils/date'
import { h, reactive, ref, watch } from 'vue'
import type { StorageResponse, StoragesResponse, StorageType } from '@/types/responses'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { createConfirmDialog } from 'vuejs-confirm-dialog'
import type { TableField } from '@/types/common'
import StorageActions from '@/components/action/StorageActions.vue'
import type { Sort } from '@/types/common'
import { useTableState } from '@/stores/table'
import { useRoute } from 'vue-router'

const dialog = createConfirmDialog(ConfirmModal)

const { t, d } = useI18n()
const query = reactive({ limit: 10, offset: 0, sorts: useTableState().sorts[useRoute().path] })
const name = ref('')
const type = ref<StorageType | undefined>(undefined)
const data = reactive<StoragesResponse>({
  total: 0,
  data: []
})
const onSort = (fields: Sort[]) => {
  query.sorts = fields
}
const fields: TableField[] = [
  { field: 'id', label: 'ID', sortable: true },
  { field: 'name', label: t('name') },
  { field: 'type', label: t('type') },
  {
    field: 'path',
    label: t('path'),
    formatter: (row, column, cellValue) => {
      return () => (cellValue ? cellValue : t('root_path'))
    }
  },
  {
    field: 'created_at',
    label: t('created_at'),
    formatter: (row, column, cellValue) => {
      return () => cellValue && d(parseDate(cellValue), 'long')
    }
  },
  {
    field: 'updated_at',
    label: t('updated_at'),
    formatter: (row, column, cellValue) => {
      return () => cellValue && d(parseDate(cellValue), 'long')
    }
  }
]
const actions = (props: { data: StorageResponse }) => {
  return h(StorageActions, {
    data: props.data
  })
}
const initData = async () => {
  const ret = await storage.getStorages(
    query.limit,
    query.offset,
    name.value,
    type.value,
    query.sorts
  )
  data.total = ret.total
  data.data = ret.data
}
await initData()
watch(query, async () => {
  await initData()
})
const onReset = () => {
  name.value = ''
  type.value = undefined
}
const onDelete = async (ids: number[]): Promise<boolean> => {
  const { isCanceled } = await dialog.reveal({
    title: t('confirm.delete_storage'),
    msg: t('confirm.delete_storage_message')
  })
  if (isCanceled) {
    return false
  }
  await storage.deleteStorages(ids)
  toast.success(t('success.delete_storage'))
  await initData()
  return true
}
</script>
