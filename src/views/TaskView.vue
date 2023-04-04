<template>
  <div class="flex flex-row gap-2">
    <input
      type="text"
      :placeholder="t('search_placeholder')"
      class="input-bordered input"
      v-model="name"
      @keyup.enter="initData"
    />
    <button class="btn-primary btn" @click="initData">{{ t('search') }}</button>
    <button class="btn-warning btn" @click="onReset">{{ t('reset') }}</button>
    <label for="form" class="btn ml-auto">
      <ChPlus class="mr-1" />
      {{ $t('add_task') }}
    </label>
    <input type="checkbox" id="form" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative">
        <label for="form" class="btn-sm btn-circle btn absolute right-2 top-2">✕</label>
        <h3 class="text-lg font-bold">{{ t('add_task') }}</h3>
        <div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">{{ t('name') }}</span>
            </label>
            <input type="text" class="input-bordered input" v-model="name" />
          </div>
          <div class="flex">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('compress') }}</span>
              </label>
              <input type="checkbox" checked="checked" class="checkbox-primary checkbox" />
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('enabled') }}</span>
              </label>
              <input type="checkbox" checked="checked" class="checkbox-primary checkbox" />
            </div>
          </div>
          <div class="flex gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">{{ t('keep_num') }}</span>
              </label>
              <input type="number" class="input-bordered input" v-model="name" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">{{ t('cron') }}</span>
              </label>
              <input type="text" class="input-bordered input" v-model="name" />
            </div>
          </div>
        </div>
        <div class="modal-action">
          <label for="form" class="btn">{{ $t('save') }}</label>
        </div>
      </div>
    </div>
  </div>
  <table class="table w-full">
    <thead>
      <tr>
        <th>ID</th>
        <th>{{ $t('name') }}</th>
        <th>{{ $t('compress') }}</th>
        <th>{{ $t('keep_num') }}</th>
        <th>{{ $t('enabled') }}</th>
        <th>{{ $t('cron') }}</th>
        <th>{{ $t('created_at') }}</th>
        <th>{{ $t('updated_at') }}</th>
        <th>{{ $t('action') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d in data.data" :key="d.id">
        <td>{{ d.id }}</td>
        <td>{{ d.name }}</td>
        <td>{{ d.compress }}</td>
        <td>{{ d.keep_num }}</td>
        <td>{{ d.enabled }}</td>
        <td>{{ d.cron }}</td>
        <td>{{ $d(parseDate(d.created_at), 'long') }}</td>
        <td>{{ $d(parseDate(d.updated_at), 'long') }}</td>
        <td class="flex gap-1">
          <router-link class="btn-primary btn-sm btn" :to="`/task/${d.id}/update`">
            <BxSolidEditAlt />
          </router-link>
          <button class="btn-error btn-sm btn" @click="deleteDataSource(d.id)">
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
import * as task from '@/apis/task'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import { parseDate } from '@/utils/date'
import { reactive, ref, watch } from 'vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { createConfirmDialog } from 'vuejs-confirm-dialog'
import type { TasksResponse } from '@/types/responses'

const dialog = createConfirmDialog(ConfirmModal)

const { t } = useI18n()
const pager = reactive({ limit: 10, offset: 0 })
const name = ref('')
const data = reactive<TasksResponse>({
  total: 0,
  data: []
})
const initData = async () => {
  const ret = await task.getTasks(pager.limit, pager.offset, name.value)
  data.total = ret.total
  data.data = ret.data
}
await initData()
watch(pager, async () => {
  await initData()
})
const onReset = () => {
  name.value = ''
}
const deleteDataSource = async (id: number) => {
  const { isCanceled } = await dialog.reveal({
    msg: t('confirm.delete_task')
  })
  if (isCanceled) {
    return
  }
  await task.deleteTask(id)
  toast.success(t('success.delete_task'))
  await initData()
}
</script>
