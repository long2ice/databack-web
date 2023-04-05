<template>
  <div class="flex flex-row gap-2">
    <select class="select-bordered select" v-model="search.data_source_id">
      <option selected :value="undefined">{{ t('select_datasource') }}</option>
      <option v-for="d in data_sources" :value="d.id" :key="d.id">{{ d.name }}</option>
    </select>
    <select class="select-bordered select" v-model="search.storage_id">
      <option selected :value="undefined">{{ t('select_storage') }}</option>
      <option v-for="s in storages" :value="s.id" :key="s.id">{{ s.name }}</option>
    </select>
    <button class="btn-primary btn" @click="initData">{{ t('search') }}</button>
    <button class="btn-warning btn" @click="onReset">{{ t('reset') }}</button>
  </div>
  <table class="table w-full">
    <thead>
      <tr>
        <th>ID</th>
        <th>{{ $t('task_id') }}</th>
        <td>{{ $t('status') }}</td>
        <td>{{ $t('is_valid') }}</td>
        <td>{{ $t('path') }}</td>
        <td>{{ $t('size') }}</td>
        <td>{{ $t('message') }}</td>
        <td>{{ $t('start_at') }}</td>
        <td>{{ $t('end_at') }}</td>
        <th>{{ $t('action') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d in data.data" :key="d.id">
        <td>{{ d.id }}</td>
        <td>{{ d.task_id }}</td>
        <td><TaskStatus :status="d.status" /></td>
        <td>{{ !d.is_deleted ? '✅' : '❌' }}</td>
        <td>
          <div class="message w-48" @click="clipboardHandler(d.path)">
            {{ d.path }}
          </div>
          <span class="message-tooltip">{{ d.path }}</span>
        </td>
        <td>{{ formatFileSize(d.size) }}</td>
        <td>
          <div class="message max-w-sm" @click="clipboardHandler(d.message)">
            {{ d.message }}
          </div>
          <span class="message-tooltip">{{ d.message }}</span>
        </td>
        <td>{{ $d(parseDate(d.start_at), 'long') }}</td>
        <td>{{ d.end_at && $d(parseDate(d.end_at), 'long') }}</td>
        <td class="flex gap-1">
          <button class="btn-error btn-sm btn" @click="deleteTaskLog(d.id)">
            <ReDeleteBin7Line />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
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
import { useI18n } from 'vue-i18n'
import { parseDate } from '@/utils/date'
import { reactive, watch } from 'vue'
import type { TaskLogsResponse } from '@/types/responses'
import { getDataSourcesBasic } from '@/apis/datasource'
import { getStoragesBasic } from '@/apis/storage'
import { toast } from 'vue3-toastify'
import { Clipboard } from 'v-clipboard'
import { formatFileSize } from '@/utils/file'
import * as storage from '@/apis/storage'
import { createConfirmDialog } from 'vuejs-confirm-dialog'
import ConfirmModal from '@/components/ConfirmModal.vue'

const { t } = useI18n()
const pager = reactive({ limit: 10, offset: 0 })
const search = reactive({
  data_source_id: undefined,
  storage_id: undefined
})
const data = reactive<TaskLogsResponse>({
  total: 0,
  data: []
})
const data_sources = await getDataSourcesBasic()
const storages = await getStoragesBasic()
const initData = async () => {
  const ret = await task_log.getTaskLogs(pager.limit, pager.offset)
  data.total = ret.total
  data.data = ret.data
}
const dialog = createConfirmDialog(ConfirmModal)
await initData()
watch(pager, async () => {
  await initData()
})
const onReset = () => {
  search.data_source_id = undefined
  search.storage_id = undefined
}
const clipboardHandler = async (message: string) => {
  await Clipboard.copy(message)
  toast.success(t('copied'))
}
const deleteTaskLog = async (id: number) => {
  const { isCanceled } = await dialog.reveal({
    title: t('confirm.delete_task_log'),
    msg: t('confirm.delete_task_log_msg'),
    open: true
  })
  if (isCanceled) {
    return
  }
  await task_log.deleteTaskLog(id)
  toast.success(t('success.delete_task_log'))
  await initData()
}
</script>
<style scoped>
.message-tooltip {
  @apply absolute max-w-2xl whitespace-pre-line break-all rounded-lg border bg-neutral p-4 text-neutral-content;
  visibility: hidden;
}
.message {
  @apply cursor-pointer truncate;
}
.message:hover + .message-tooltip {
  visibility: visible;
}
</style>
