<template>
  <div class="flex flex-row gap-2">
    <input
      type="text"
      :placeholder="t('search_placeholder')"
      class="input-bordered input"
      v-model="query.name"
      @keyup.enter="initData"
    />
    <select class="select-bordered select" v-model="query.data_source_id">
      <option selected :value="undefined">{{ t('select_datasource') }}</option>
      <option v-for="d in data_sources" :value="d.id" :key="d.id">{{ d.name }}</option>
    </select>
    <select class="select-bordered select" v-model="query.storage_id">
      <option selected :value="undefined">{{ t('select_storage') }}</option>
      <option v-for="s in storages" :value="s.id" :key="s.id">{{ s.name }}</option>
    </select>
    <select class="select-bordered select" v-model="query.enabled" @keyup.enter="initData">
      <option selected :value="undefined">{{ t('enabled') }}</option>
      <option value="true">YES</option>
      <option value="false">NO</option>
    </select>
    <select class="select-bordered select" v-model="query.compress" @keyup.enter="initData">
      <option selected :value="undefined">{{ t('compress') }}</option>
      <option value="true">YES</option>
      <option value="false">NO</option>
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
              <span class="label-text">{{ t('name') }}<span class="text-error">*</span></span>
            </label>
            <input
              type="text"
              class="input-bordered input"
              v-model="name"
              :placeholder="$t('name_placeholder')"
            />
            <label class="label">
              <span class="label-text-alt text-error">{{ errorMessageName }}</span>
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
                <span class="label-text">{{ t('keep_num') }}<span class="text-error">*</span></span>
              </label>
              <input type="number" class="input-bordered input" v-model="keep_num" />
              <label class="label">
                <span class="label-text-alt">{{ $t('keep_num_tips') }}</span>
              </label>
              <label class="label">
                <span class="label-text-alt text-error">{{ errorMessageKeepNum }}</span>
              </label>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text"
                  >{{ t('keep_days') }}<span class="text-error">*</span></span
                >
              </label>
              <input type="number" class="input-bordered input" v-model="keep_days" />
              <label class="label">
                <span class="label-text-alt">{{ $t('keep_days_tips') }}</span>
              </label>
              <label class="label">
                <span class="label-text-alt text-error">{{ errorMessageKeepDays }}</span>
              </label>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('sub_path') }}</span>
              </label>
              <input type="text" class="input-bordered input" v-model="form.sub_path" />
              <label class="label">
                <span class="label-text-alt">{{ t('sub_path_tips') }}</span>
              </label>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">{{ t('cron') }}</span>
              </label>
              <input
                type="text"
                placeholder="0 * * * *"
                class="input-bordered input"
                v-model="form.cron"
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
            </div>
          </div>
        </div>
        <div class="modal-action">
          <label
            class="btn"
            :class="{
              loading: isSubmitting
            }"
            @click="onSubmit"
            >{{ $t('save') }}</label
          >
        </div>
      </div>
    </div>
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
import * as task from '@/api/task'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import { parseDate } from '@/utils/date'
import { h, reactive, ref, watch } from 'vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { createConfirmDialog } from 'vuejs-confirm-dialog'
import type { TaskResponse, TasksResponse } from '@/types/responses'
import { getDataSourcesBasic } from '@/api/datasource'
import { getStoragesBasic } from '@/api/storage'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import type { Sort, TableField } from '@/types/common'
import TaskActions from '@/components/action/TaskActions.vue'
import { useTableState } from '@/stores/table'
import { useRoute } from 'vue-router'
const dialog = createConfirmDialog(ConfirmModal)

const { t, d } = useI18n()
const actions = (props: { data: TaskResponse }) => {
  return h(TaskActions, {
    onEdit,
    onTask,
    data: props.data
  })
}
const fields: TableField[] = [
  {
    field: 'id',
    label: 'ID',
    sortable: true
  },
  {
    field: 'name',
    label: t('name')
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
    field: 'compress',
    label: t('compress'),
    formatter: (row, column, cellValue) => {
      return () => (cellValue ? '✅' : '❌')
    }
  },
  {
    field: 'enabled',
    label: t('enabled'),
    formatter: (row, column, cellValue) => {
      return () => (cellValue ? '✅' : '❌')
    }
  },
  {
    field: 'sub_path',
    label: t('sub_path'),
    formatter: (row, column, cellValue) => {
      return () => (cellValue ? cellValue : t('root_path'))
    }
  },
  {
    field: 'keep_num',
    label: t('keep_num'),
    formatter: (row, column, cellValue) => {
      return () => (cellValue === 0 ? t('unlimited') : cellValue)
    }
  },
  {
    field: 'keep_days',
    label: t('keep_days'),
    formatter: (row, column, cellValue) => {
      return () => (cellValue === 0 ? t('unlimited') : cellValue)
    }
  },
  {
    field: 'cron',
    label: t('cron'),
    formatter: (row, column, cellValue) => {
      return () => (cellValue ? h('span', { class: 'badge' }, cellValue) : t('manual'))
    }
  },
  {
    field: 'next_run_at',
    label: t('next_run_at'),
    defaultHidden: true,
    formatter: (row, column, cellValue) => {
      return () => cellValue && d(parseDate(cellValue), 'long')
    }
  },
  {
    field: 'created_at',
    label: t('created_at'),
    defaultHidden: true,
    formatter: (row, column, cellValue) => {
      return () => cellValue && d(parseDate(cellValue), 'long')
    }
  },
  {
    field: 'updated_at',
    label: t('updated_at'),
    defaultHidden: true,
    formatter: (row, column, cellValue) => {
      return () => cellValue && d(parseDate(cellValue), 'long')
    }
  }
]
const query = reactive({
  name: '',
  data_source_id: undefined,
  storage_id: undefined,
  compress: undefined,
  enabled: undefined,
  sorts: useTableState().sorts[useRoute().path],
  limit: 10,
  offset: 0
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
  data_source_id: data_sources.length > 0 ? data_sources[0].id : undefined,
  storage_id: storages.length > 0 ? storages[0].id : undefined,
  compress: true,
  enabled: true,
  sub_path: '',
  title: t('create_task'),
  id: 0,
  cron: ''
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

const { value: keep_num, errorMessage: errorMessageKeepNum } = useField(
  'keep_num',
  yup.number().moreThan(-1, t('validate.keep_num_more_than_zero'))
)
const { value: keep_days, errorMessage: errorMessageKeepDays } = useField(
  'keep_days',
  yup.number().moreThan(-1, t('validate.keep_days_more_than_zero'))
)
keep_num.value = 0
keep_days.value = 0
const onSubmit = handleSubmit(async (values) => {
  if (isUpdate.value) {
    await task.updateTask(
      form.id,
      values.name,
      form.storage_id!,
      form.data_source_id!,
      form.compress,
      values.keep_num,
      values.keep_days,
      form.enabled,
      form.sub_path,
      form.cron
    )
    toast.success(t('success.update_task'))
  } else {
    await task.createTask(
      values.name,
      form.storage_id!,
      form.data_source_id!,
      form.compress,
      values.keep_num,
      values.keep_days,
      form.enabled,
      form.sub_path,
      form.cron
    )
    toast.success(t('success.create_task'))
  }
  isCreateUpdateTaskOpen.value = false
  await initData()
})
const initData = async () => {
  const ret = await task.getTasks(
    query.limit,
    query.offset,
    query.compress,
    query.enabled,
    query.name,
    query.data_source_id,
    query.storage_id,
    query.sorts
  )
  data.total = ret.total
  data.data = ret.data
}
const onSort = (fields: Sort[]) => {
  query.sorts = fields
}
await initData()
watch(query, async () => {
  await initData()
})
const onReset = () => {
  query.name = ''
  query.data_source_id = undefined
  query.storage_id = undefined
}
const onDelete = async (ids: number[]): Promise<boolean> => {
  const { isCanceled } = await dialog.reveal({
    title: t('confirm.delete_task')
  })
  if (isCanceled) {
    return false
  }
  await task.deleteTasks(ids)
  toast.success(t('success.delete_task'))
  await initData()
  return true
}
const handleCreateTask = () => {
  isCreateUpdateTaskOpen.value = true
  isUpdate.value = false
  form.data_source_id = data_sources.length > 0 ? data_sources[0].id : undefined
  form.storage_id = storages.length > 0 ? storages[0].id : undefined
  form.compress = true
  form.enabled = true
  form.sub_path = ''
  name.value = ''
  form.cron = ''
  keep_num.value = 0
  keep_days.value = 0
}
const onEdit = async (d: TaskResponse) => {
  isCreateUpdateTaskOpen.value = true
  isUpdate.value = true
  form.data_source_id = d.data_source_id
  form.id = d.id
  form.storage_id = d.storage_id
  form.compress = d.compress
  form.enabled = d.enabled
  name.value = d.name
  form.cron = d.cron
  form.sub_path = d.sub_path
  keep_num.value = d.keep_num
  keep_days.value = d.keep_days
}
const onTask = async (id: number) => {
  await task.runTask(id)
  toast.success(t('success.run_task'))
}
</script>
