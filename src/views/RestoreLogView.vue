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
  <table class="table w-full">
    <thead>
      <tr>
        <th>ID</th>
        <th>{{ $t('task_log_id') }}</th>
        <td>{{ $t('status') }}</td>
        <td>{{ $t('message') }}</td>
        <td>{{ $t('options') }}</td>
        <td>{{ $t('start_at') }}</td>
        <td>{{ $t('end_at') }}</td>
        <th>{{ $t('action') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d in data.data" :key="d.id">
        <td>{{ d.id }}</td>
        <td>{{ d.task_log_id }}</td>
        <td><TaskStatus :status="d.status" /></td>
        <td>
          <div class="message max-w-sm" @click="clipboardHandler(d.message)">
            {{ d.message }}
          </div>
          <span class="message-tooltip">{{ d.message }}</span>
        </td>
        <td>
          <div class="message max-w-sm" @click="clipboardHandler(dict2str(d.options))">
            {{ dict2str(d.options) }}
          </div>
          <span class="message-tooltip">{{ dict2str(d.options) }}</span>
        </td>
        <td>{{ $d(parseDate(d.start_at), 'long') }}</td>
        <td>{{ d.end_at && $d(parseDate(d.end_at), 'long') }}</td>
        <td class="flex gap-1">
          <button class="btn-error btn-sm btn" @click="deleteRestoreLog(d.id)">
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
import * as restore from '@/apis/restore'
import { useI18n } from 'vue-i18n'
import { parseDate } from '@/utils/date'
import { reactive, watch } from 'vue'
import type { RestoresResponse } from '@/types/responses'
import { toast } from 'vue3-toastify'
import { Clipboard } from 'v-clipboard'
import { createConfirmDialog } from 'vuejs-confirm-dialog'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { dict2str } from '@/utils/options'

const { t } = useI18n()
const pager = reactive({ limit: 10, offset: 0 })
const search = reactive({
  status: undefined
})
const data = reactive<RestoresResponse>({
  total: 0,
  data: []
})

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
const clipboardHandler = async (message: string) => {
  await Clipboard.copy(message)
  toast.success(t('copied'))
}

const deleteRestoreLog = async (id: number) => {
  const { isCanceled } = await dialog.reveal({
    title: t('confirm.delete_restore_log'),
    open: true
  })
  if (isCanceled) {
    return
  }
  await restore.deleteRestoreLog(id)
  toast.success(t('success.delete_restore_log'))
  await initData()
}
</script>
