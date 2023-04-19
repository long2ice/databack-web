<template>
  <div class="flex flex-row gap-2">
    <input
      type="text"
      class="input-bordered input"
      :placeholder="$t('admin_search_placeholder')"
      v-model="query.search"
      @keyup.enter="initData"
    />
    <select class="select-bordered select" v-model="query.is_superuser" @keyup.enter="initData">
      <option selected :value="undefined">{{ t('is_superuser') }}</option>
      <option value="false">YES</option>
      <option value="true">NO</option>
    </select>
    <select class="select-bordered select" v-model="query.is_active" @keyup.enter="initData">
      <option selected :value="undefined">{{ t('is_active') }}</option>
      <option value="false">YES</option>
      <option value="true">NO</option>
    </select>
    <button class="btn-primary btn" @click="initData">{{ t('search') }}</button>
    <button class="btn-warning btn" @click="onReset">{{ t('reset') }}</button>
  </div>
  <DataTable
    :data="data.data"
    :total="data.total"
    :fields="fields"
    :onSort="onSort"
    :actions="actions"
    :onDelete="auth.admin.is_superuser ? onDelete : undefined"
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
import { useI18n } from 'vue-i18n'
import { parseDate } from '@/utils/date'
import { h, reactive, watch } from 'vue'
import type { AdminResponse, AdminsResponse } from '@/types/responses'
import * as api from '@/api/admin'
import type { Sort, TableField } from '@/types/common'
import AdminActions from '@/components/action/AdminActions.vue'
import { toast } from 'vue3-toastify'
import { createConfirmDialog } from 'vuejs-confirm-dialog'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { useAuth } from '@/stores/auth'
const auth = useAuth()
const actions = (props: { data: AdminResponse }) => {
  return h(AdminActions, {
    onEdit,
    data: props.data
  })
}
const onEdit = (data: AdminResponse) => {
  console.log('edit', data)
}
const { t, d } = useI18n()
const query = reactive({
  limit: 10,
  offset: 0,
  sorts: [] as Sort[],
  is_superuser: undefined,
  is_active: undefined,
  search: undefined
})

const onSort = (fields: Sort[]) => {
  query.sorts = fields
}
const fields: TableField[] = [
  {
    field: 'id',
    label: 'ID',
    sortable: true
  },
  {
    field: 'email',
    label: 'Email'
  },
  {
    field: 'nickname',
    label: t('nickname')
  },
  {
    field: 'last_login_at',
    label: t('last_login_at'),
    formatter: (row, column, cellValue) => {
      return () => cellValue && d(parseDate(cellValue), 'long')
    }
  },
  {
    field: 'is_superuser',
    label: t('is_superuser'),
    formatter: (row, column, cellValue) => {
      return () => (cellValue ? '✅' : '❌')
    }
  },
  {
    field: 'is_active',
    label: t('is_active'),
    formatter: (row, column, cellValue) => {
      return () => (cellValue ? '✅' : '❌')
    }
  },
  {
    field: 'created_at',
    label: t('created_at'),
    formatter: (row, column, cellValue) => {
      return () => d(parseDate(cellValue), 'long')
    }
  },
  {
    field: 'created_at',
    label: t('created_at'),
    formatter: (row, column, cellValue) => {
      return () => cellValue && d(parseDate(cellValue), 'long')
    }
  }
]
const data = reactive<AdminsResponse>({
  total: 0,
  data: []
})
const initData = async () => {
  const ret = await api.getAdmin(
    query.limit,
    query.offset,
    query.sorts,
    query.is_superuser,
    query.is_active,
    query.search
  )
  data.total = ret.total
  data.data = ret.data
}

await initData()
watch(query, async () => {
  await initData()
})
const onReset = () => {
  query.is_superuser = undefined
  query.is_active = undefined
  query.search = undefined
}
const dialog = createConfirmDialog(ConfirmModal)
const onDelete = async (ids: number[]): Promise<boolean> => {
  const { isCanceled } = await dialog.reveal({
    title: t('confirm.delete_admin')
  })
  if (isCanceled) {
    return false
  }
  await api.deleteAdmins(ids)
  toast.success(t('success.delete_admin'))
  await initData()
  return true
}
</script>
