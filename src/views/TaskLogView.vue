<template>
  <div class="flex flex-row gap-2">
    <select class="select-bordered select" v-model="search.data_source_id" @keyup.enter="initData">
      <option selected :value="undefined">{{ t('select_datasource') }}</option>
      <option v-for="d in data_sources" :value="d.id" :key="d.id">{{ d.name }}</option>
    </select>
    <select class="select-bordered select" v-model="search.storage_id" @keyup.enter="initData">
      <option selected :value="undefined">{{ t('select_storage') }}</option>
      <option v-for="s in storages" :value="s.id" :key="s.id">{{ s.name }}</option>
    </select>
    <select class="select-bordered select" v-model="search.status" @keyup.enter="initData">
      <option selected :value="undefined">{{ t('status') }}</option>
      <option value="success">SUCCESS</option>
      <option value="failed">FAILED</option>
      <option value="running">RUNNING</option>
    </select>
    <button class="btn-primary btn" @click="initData">{{ t('search') }}</button>
    <button class="btn-warning btn" @click="onReset">{{ t('reset') }}</button>
  </div>
  <DataTable
    :data="data.data"
    :total="data.total"
    :fields="fields"
    :actions="actions"
    :onDelete="onDelete"
  />
  <input type="checkbox" class="modal-toggle" v-model="restoreState.isOpen" />
  <div class="modal">
    <div class="modal-box relative">
      <button
        class="btn-sm btn-circle btn absolute right-2 top-2"
        @click="restoreState.isOpen = false"
      >
        ✕
      </button>
      <h3 class="text-lg font-bold">{{ $t('restore') }}</h3>
      <div class="flex flex-col">
        <div class="tabs">
          <a
            class="tab-bordered tab"
            @click="restoreState.restore_type = 'local'"
            :class="{
              'tab-active': restoreState.restore_type == 'local'
            }"
            >{{ $t('local') }}</a
          >
          <a
            class="tab-bordered tab"
            @click="restoreState.restore_type = 'ssh'"
            :class="{
              'tab-active': restoreState.restore_type == 'ssh'
            }"
            >SSH</a
          >
          <a
            class="tab-bordered tab"
            @click="restoreState.restore_type = 'mysql'"
            :class="{
              'tab-active': restoreState.restore_type == 'mysql'
            }"
            v-if="restoreState.data_source_type == 'mysql'"
            >{{ $t('mysql') }}</a
          >
          <a
            class="tab-bordered tab"
            @click="restoreState.restore_type = 'postgres'"
            :class="{
              'tab-active': restoreState.restore_type == 'postgres'
            }"
            v-if="restoreState.data_source_type == 'postgres'"
            >{{ $t('postgres') }}</a
          >
        </div>
        <RestoreMySQLOptions
          v-if="restoreState.data_source_type == 'mysql' && restoreState.restore_type == 'mysql'"
          ref="optionsRef"
        />
        <RestorePostgreSQLOptions
          v-if="
            restoreState.data_source_type == 'postgres' && restoreState.restore_type == 'postgres'
          "
          ref="optionsRef"
        />
        <RestoreLocalOptions ref="optionsRef" v-if="restoreState.restore_type == 'local'" />
        <RestoreSSHOptions ref="optionsRef" v-if="restoreState.restore_type == 'ssh'" />
      </div>
      <div class="modal-action">
        <label
          class="btn"
          :class="{
            disabled: isSubmitting
          }"
          @click="onSubmit"
          >{{ $t('submit') }}</label
        >
      </div>
    </div>
  </div>
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
import * as task_log from '@/apis/tasklog'
import * as restore from '@/apis/restore'
import { useI18n } from 'vue-i18n'
import { parseDate } from '@/utils/date'
import { h, reactive, ref, watch } from 'vue'
import type { DataSourceType, TaskLogResponse, TaskLogsResponse } from '@/types/responses'
import { getDataSourcesBasic } from '@/apis/datasource'
import { getStoragesBasic } from '@/apis/storage'
import { toast } from 'vue3-toastify'
import { formatFileSize } from '@/utils/file'
import { createConfirmDialog } from 'vuejs-confirm-dialog'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { useForm } from 'vee-validate'
import type { TableField } from '@/types/common'
import TaskStatus from '@/components/TaskStatus.vue'
import TaskLogActions from '@/components/action/TaskLogActions.vue'
const { t, d } = useI18n()
const pager = reactive({ limit: 10, offset: 0 })
const search = reactive({
  data_source_id: undefined,
  storage_id: undefined,
  status: undefined
})
const actions = (props: { data: TaskLogResponse }) => {
  return h(TaskLogActions, {
    onRestore,
    data: props.data
  })
}
const onRestore = (data: TaskLogResponse) => {
  restoreState.isOpen = true
  restoreState.data_source_type = data.data_source_type
  restoreState.restore_type = data.data_source_type
  restoreState.id = data.id
}

const dialog = createConfirmDialog(ConfirmModal)
const onDelete = async (ids: number[]) => {
  const { isCanceled } = await dialog.reveal({
    title: t('confirm.delete_task_log'),
    msg: t('confirm.delete_task_log_msg')
  })
  if (isCanceled) {
    return
  }
  await task_log.deleteTaskLogs(ids)
  toast.success(t('success.delete_task_log'))
  await initData()
}
const fields: TableField[] = [
  {
    field: 'id',
    label: 'ID',
    sortable: true
  },
  {
    field: 'task_id',
    label: t('task_id'),
    sortable: true
  },
  {
    field: 'data_source_name',
    label: t('datasource')
  },
  {
    field: 'storage_name',
    label: t('storage')
  },
  {
    field: 'status',
    label: t('status'),
    formatter: (row, column, cellValue) => {
      return h(TaskStatus, { status: cellValue })
    }
  },
  {
    field: 'is_deleted',
    label: t('is_valid'),
    formatter: (row, column, cellValue) => {
      return () => (!cellValue ? '✅' : '❌')
    }
  },
  {
    field: 'path',
    label: t('path'),
    truncate: true
  },
  {
    field: 'size',
    label: t('size'),
    formatter: (row, column, cellValue) => {
      return () => formatFileSize(cellValue)
    }
  },
  {
    field: 'message',
    label: t('message'),
    truncate: true
  },
  {
    field: 'start_at',
    label: t('start_at'),
    formatter: (row, column, cellValue) => {
      return () => d(parseDate(cellValue), 'long')
    },
    defaultHidden: true
  },
  {
    field: 'end_at',
    label: t('end_at'),
    formatter: (row, column, cellValue) => {
      return () => cellValue && d(parseDate(cellValue), 'long')
    },
    defaultHidden: true
  }
]
const data = reactive<TaskLogsResponse>({
  total: 0,
  data: []
})
const data_sources = await getDataSourcesBasic()
const storages = await getStoragesBasic()
const initData = async () => {
  const ret = await task_log.getTaskLogs(
    pager.limit,
    pager.offset,
    search.data_source_id,
    search.storage_id,
    undefined,
    search.status
  )
  data.total = ret.total
  data.data = ret.data
}
const optionsRef = ref()
const restoreState = reactive<{
  isOpen: boolean
  data_source_type: DataSourceType | undefined
  restore_type: DataSourceType | undefined
  id: number
}>({
  isOpen: false,
  data_source_type: undefined,
  restore_type: undefined,
  id: 0
})
await initData()
watch(pager, async () => {
  await initData()
})
const onReset = () => {
  search.data_source_id = undefined
  search.storage_id = undefined
}
const { handleSubmit, isSubmitting } = useForm()
const onSubmit = handleSubmit(async () => {
  const options = optionsRef.value.getOptions()
  await restore.restoreTaskLog(restoreState.id, restoreState.restore_type!, options)
  restoreState.isOpen = false
  toast.success(t('success.restore_task_log'))
})
</script>
