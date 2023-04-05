<template>
  <div class="flex flex-row gap-2">
    <input
      type="text"
      :placeholder="t('search_placeholder')"
      class="input-bordered input"
      v-model="search.name"
      @keyup.enter="initData"
    />
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
    <button class="btn ml-auto" @click="handleCreateTask">
      <ChPlus class="mr-1" />
      {{ $t('create_task') }}
    </button>
    <input type="checkbox" class="modal-toggle" v-model="isCreateUpdateTaskOpen" />
    <div class="modal">
      <div class="modal-box relative">
        <button
          class="btn-sm btn-circle btn absolute right-2 top-2"
          @click="isCreateUpdateTaskOpen = false"
        >
          ✕
        </button>
        <h3 class="text-lg font-bold">{{ form.title }}</h3>
        <div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">{{ t('name') }}</span>
            </label>
            <input
              type="text"
              class="input-bordered input"
              v-model="name"
              :placeholder="$t('name_placeholder')"
            />
            <label class="label">
              <span class="label-text-alt text-red-500">{{ errorMessageName }}</span>
            </label>
          </div>
          <div class="flex gap-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('datasource') }}</span>
              </label>
              <select class="select-bordered select" v-model="form.data_source_id">
                <option v-for="d in data_sources" :value="d.id" :key="d.id">{{ d.name }}</option>
              </select>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('storage') }}</span>
              </label>
              <select class="select-bordered select" v-model="form.storage_id">
                <option v-for="s in storages" :value="s.id" :key="s.id">{{ s.name }}</option>
              </select>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('compress') }}</span>
              </label>
              <input
                type="checkbox"
                checked
                v-model="form.compress"
                class="checkbox-primary checkbox"
              />
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('enabled') }}</span>
              </label>
              <input
                type="checkbox"
                checked
                v-model="form.enabled"
                class="checkbox-primary checkbox"
              />
            </div>
          </div>
          <div class="flex gap-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('keep_num') }}</span>
              </label>
              <input
                type="number"
                class="input-bordered input"
                v-model="keep_num"
                :placeholder="$t('keep_num_placeholder')"
              />
              <label class="label">
                <span class="label-text-alt text-red-500">{{ errorMessageKeepNum }}</span>
              </label>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('keep_days') }}</span>
              </label>
              <input
                type="number"
                class="input-bordered input"
                v-model="keep_days"
                :placeholder="$t('keep_days_placeholder')"
              />
              <label class="label">
                <span class="label-text-alt text-red-500">{{ errorMessageKeepDays }}</span>
              </label>
            </div>
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">{{ t('cron') }}</span>
            </label>
            <input
              type="text"
              placeholder="0 * * * *"
              class="input-bordered input"
              v-model="cron"
            />
            <label class="label">
              <span class="label-text-alt"
                >{{ t('cron_tips') }}
                <a
                  class="link-primary link"
                  href="https://github.com/josiahcarlson/parse-crontab"
                  target="_blank"
                >
                  https://github.com/josiahcarlson/parse-crontab
                </a></span
              >
            </label>
            <label class="label">
              <span class="label-text-alt text-red-500">{{ errorMessageCron }}</span>
            </label>
          </div>
        </div>
        <div class="modal-action">
          <label
            class="btn"
            :class="{
              disabled: isSubmitting
            }"
            @click="onSubmit"
            >{{ $t('save') }}</label
          >
        </div>
      </div>
    </div>
  </div>
  <table class="table w-full">
    <thead>
      <tr>
        <th>ID</th>
        <th>{{ $t('name') }}</th>
        <th>{{ $t('datasource') }}</th>
        <th>{{ $t('storage') }}</th>
        <th>{{ $t('compress') }}</th>
        <th>{{ $t('enabled') }}</th>
        <th>{{ $t('keep_num') }}</th>
        <th>{{ $t('keep_days') }}</th>
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
        <td>{{ d.data_source_name }}</td>
        <td>{{ d.storage_name }}</td>
        <td>{{ d.compress ? '✅' : '❌' }}</td>
        <td>{{ d.enabled ? '✅' : '❌' }}</td>
        <td>{{ d.keep_num === 0 ? t('unlimited') : d.keep_num }}</td>
        <td>{{ d.keep_days === 0 ? t('unlimited') : d.keep_days }}</td>
        <td>
          <span class="badge">{{ d.cron }}</span>
        </td>
        <td>{{ $d(parseDate(d.created_at), 'long') }}</td>
        <td>{{ $d(parseDate(d.updated_at), 'long') }}</td>
        <td class="flex gap-1">
          <button class="btn-primary btn-sm btn" @click="handleEditTask(d)">
            <BxSolidEditAlt />
          </button>
          <button class="btn-error btn-sm btn" @click="deleteTask(d.id)">
            <ReDeleteBin7Line />
          </button>
          <button class="btn-accent btn-sm btn" @click="runTask(d.id)">
            <AkPlay />
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
import type { TaskResponse, TasksResponse } from '@/types/responses'
import { getDataSourcesBasic } from '@/apis/datasource'
import { getStoragesBasic } from '@/apis/storage'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
const dialog = createConfirmDialog(ConfirmModal)

const { t } = useI18n()
const pager = reactive({ limit: 10, offset: 0 })
const search = reactive({
  name: '',
  data_source_id: undefined,
  storage_id: undefined
})
const data = reactive<TasksResponse>({
  total: 0,
  data: []
})
const isCreateUpdateTaskOpen = ref(false)
const isUpdate = ref(false)
const data_sources = await getDataSourcesBasic()
const storages = await getStoragesBasic()
const form = reactive({
  data_source_id: data_sources[0].id,
  storage_id: storages[0].id,
  compress: true,
  enabled: true,
  title: t('create_task'),
  id: 0
})
watch(isUpdate, (val) => {
  if (!val) {
    form.title = t('create_task')
  } else {
    form.title = t('update_task')
  }
})
const { handleSubmit, isSubmitting } = useForm()
const { value: name, errorMessage: errorMessageName } = useField(
  'name',
  yup.string().required(t('validate.name_required'))
)
const { value: cron, errorMessage: errorMessageCron } = useField(
  'cron',
  yup.string().required(t('validate.cron_required'))
)
const { value: keep_num, errorMessage: errorMessageKeepNum } = useField(
  'keep_num',
  yup.number().moreThan(-1, t('validate.keep_num_more_than_zero'))
)
const { value: keep_days, errorMessage: errorMessageKeepDays } = useField(
  'keep_days',
  yup.number().moreThan(-1, t('validate.keep_days_more_than_zero'))
)
const onSubmit = handleSubmit(async (values) => {
  if (isUpdate.value) {
    await task.updateTask(
      form.id,
      values.name,
      form.storage_id,
      form.data_source_id,
      form.compress,
      values.keep_num,
      values.keep_days,
      form.enabled,
      values.cron
    )
    toast.success(t('success.update_task'))
  } else {
    await task.createTask(
      values.name,
      form.storage_id,
      form.data_source_id,
      form.compress,
      values.keep_num,
      values.keep_days,
      form.enabled,
      values.cron
    )
    toast.success(t('success.create_task'))
  }
  isCreateUpdateTaskOpen.value = false
  await initData()
})
const initData = async () => {
  const ret = await task.getTasks(
    pager.limit,
    pager.offset,
    search.name,
    search.data_source_id,
    search.storage_id
  )
  data.total = ret.total
  data.data = ret.data
}
await initData()
watch(pager, async () => {
  await initData()
})
const onReset = () => {
  search.name = ''
  search.data_source_id = undefined
  search.storage_id = undefined
}
const deleteTask = async (id: number) => {
  const { isCanceled } = await dialog.reveal({
    msg: t('confirm.delete_task'),
    open: true
  })
  if (isCanceled) {
    return
  }
  await task.deleteTask(id)
  toast.success(t('success.delete_task'))
  await initData()
}
const handleCreateTask = () => {
  isCreateUpdateTaskOpen.value = true
  isUpdate.value = false
}
const handleEditTask = async (d: TaskResponse) => {
  isCreateUpdateTaskOpen.value = true
  isUpdate.value = true
  form.data_source_id = d.data_source_id
  form.id = d.id
  form.storage_id = d.storage_id
  form.compress = d.compress
  form.enabled = d.enabled
  name.value = d.name
  cron.value = d.cron
  keep_num.value = d.keep_num
  keep_days.value = d.keep_days
}
const runTask = async (id: number) => {
  await task.runTask(id)
  toast.success(t('success.run_task'))
}
</script>
