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
  <table class="table w-full">
    <thead>
      <tr>
        <th>ID</th>
        <th>{{ $t('name') }}</th>
        <th>{{ $t('type') }}</th>
        <th>{{ $t('created_at') }}</th>
        <th>{{ $t('updated_at') }}</th>
        <th>{{ $t('action') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d in data.data" :key="d.id">
        <td>{{ d.id }}</td>
        <td>{{ d.name }}</td>
        <td>
          <div class="tooltip tooltip-right" :data-tip="d.type">
            <StorageTypeIcon :type="d.type" />
          </div>
        </td>
        <td>{{ $d(parseDate(d.created_at), 'long') }}</td>
        <td>{{ $d(parseDate(d.updated_at), 'long') }}</td>
        <td class="flex gap-1">
          <router-link class="btn-primary btn-sm btn" :to="`/storage/${d.id}/update`">
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
import * as storage from '@/apis/storage'
import DataSourceTypeIcon from '@/components/datasource/DataSourceTypeIcon.vue'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import { parseDate } from '@/utils/date'
import { reactive, ref, watch } from 'vue'
import type { StoragesResponse, StorageType } from '@/types/responses'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { createConfirmDialog } from 'vuejs-confirm-dialog'

const dialog = createConfirmDialog(ConfirmModal)

const { t } = useI18n()
const pager = reactive({ limit: 10, offset: 0 })
const name = ref('')
const type = ref<StorageType | undefined>(undefined)
const data = reactive<StoragesResponse>({
  total: 0,
  data: []
})
const initData = async () => {
  const ret = await storage.getStorages(pager.limit, pager.offset, name.value, type.value)
  data.total = ret.total
  data.data = ret.data
}
await initData()
watch(pager, async () => {
  await initData()
})
const onReset = () => {
  name.value = ''
  type.value = undefined
}
const deleteDataSource = async (id: number) => {
  const { isCanceled } = await dialog.reveal({
    title: t('confirm.delete_storage'),
    open: true
  })
  if (isCanceled) {
    return
  }
  await storage.deleteStorage(id)
  toast.success(t('success.delete_storage'))
  await initData()
}
</script>
