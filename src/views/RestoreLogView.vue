<template>
  <div class="flex flex-row gap-2">
    <select class="select-bordered select" v-model="search.status" @keyup.enter="initData">
      <option selected :value="undefined">{{ t('status') }}</option>
      <option value="success">SUCCESS</option>
      <option value="failed">FAILED</option>
      <option value="running">RUNNING</option>
    </select>
    <button class="btn-primary btn" @click="initData">{{ t('search') }}</button>
    <button class="btn-warning btn" @click="onReset">{{ t('reset') }}</button>
  </div>
  <DataTable :data="data.data" :total="data.total" :fields="fields" :onDelete="onDelete" />
  <div class="flex items-center justify-center">
    <div class="btn-group grid grid-cols-2">
      <button
        class="btn-outline btn"
        @click="pager.offset -= pager.limit"
        :disabled="pager.offset == 0"
      >
        {{ $t('previous') }}
      </button>
      <button
        class="btn-outline btn"
        @click="pager.offset += pager.limit"
        :disabled="pager.offset + pager.limit >= data.total"
      >
        {{ $t('next') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as restore from '@/apis/restore'
import { useI18n } from 'vue-i18n'
import { parseDate } from '@/utils/date'
import { h, reactive, watch } from 'vue'
import type { RestoresResponse } from '@/types/responses'
import { toast } from 'vue3-toastify'
import { createConfirmDialog } from 'vuejs-confirm-dialog'
import ConfirmModal from '@/components/ConfirmModal.vue'
import type { TableField } from '@/types/common'
import TaskStatus from '@/components/TaskStatus.vue'

const { t, d } = useI18n()
const pager = reactive({ limit: 10, offset: 0 })
const search = reactive({
  status: undefined
})
const data = reactive<RestoresResponse>({
  total: 0,
  data: []
})
const fields: TableField[] = [
  {
    field: 'id',
    label: 'ID',
    sortable: true
  },
  {
    field: 'task_log_id',
    label: t('task_log_id'),
    sortable: true
  },
  {
    field: 'restore_type',
    label: t('restore_type')
  },
  {
    field: 'status',
    label: t('status'),
    formatter: (row, column, cellValue) => {
      return () =>
        h(TaskStatus, {
          status: cellValue
        })
    }
  },
  {
    field: 'message',
    label: t('message'),
    truncate: true
  },
  {
    field: 'options',
    label: t('options'),
    truncate: true
  },
  {
    field: 'start_at',
    label: t('start_at'),
    formatter: (row, column, cellValue) => {
      return () => d(parseDate(cellValue), 'long')
    }
  },
  {
    field: 'end_at',
    label: t('end_at'),
    formatter: (row, column, cellValue) => {
      return () => cellValue && d(parseDate(cellValue), 'long')
    }
  },
  {
    field: 'created_at',
    label: t('created_at'),
    defaultHidden: true,
    formatter: (row, column, cellValue) => {
      return () => d(parseDate(cellValue), 'long')
    }
  },
  {
    field: 'updated_at',
    label: t('updated_at'),
    defaultHidden: true,
    formatter: (row, column, cellValue) => {
      return () => d(parseDate(cellValue), 'long')
    }
  }
]
const initData = async () => {
  const ret = await restore.getRestoreLogs(pager.limit, pager.offset, search.status)
  data.total = ret.total
  data.data = ret.data
}
const dialog = createConfirmDialog(ConfirmModal)
await initData()
watch(pager, async () => {
  await initData()
})
const onReset = () => {
  search.status = undefined
}

const onDelete = async (ids: number[]) => {
  const { isCanceled } = await dialog.reveal({
    title: t('confirm.delete_restore_log')
  })
  if (isCanceled) {
    return
  }
  await restore.deleteRestoreLogs(ids)
  toast.success(t('success.delete_restore_log'))
  await initData()
}
</script>
