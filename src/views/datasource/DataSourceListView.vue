<template>
  <div class="flex flex-row">
    <router-link class="ml-auto btn" to="/datasource/add">
      <ChPlus class="mr-1" />
      {{ $t('add_datasource') }}
    </router-link>
  </div>
  <table class="table w-full">
    <thead>
      <tr>
        <th>ID</th>
        <th>{{ $t('name') }}</th>
        <th>{{ $t('type') }}</th>
        <th>{{ $t('action') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d in data" :key="d.id">
        <th>{{ d.id }}</th>
        <td>{{ d.name }}</td>
        <td>
          <div class="tooltip tooltip-right" :data-tip="d.type">
            <DataSourceTypeIcon :type="d.type" />
          </div>
        </td>
        <td class="flex gap-1">
          <button class="btn btn-primary btn-sm">
            <BxSolidEditAlt />
          </button>
          <button class="btn btn-error btn-sm" @click="deleteDataSource(d.id)">
            <ReDeleteBin7Line />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-center">
    <div class="btn-group grid grid-cols-2">
      <button class="btn btn-outline">{{ $t('previous') }}</button>
      <button class="btn btn-outline">{{ $t('next') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDataSources } from '@/apis/datasource'
import DataSourceTypeIcon from '@/components/datasource/DataSourceTypeIcon.vue'
import * as datasource from '@/apis/datasource'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
let ret = await getDataSources(10, 0)
const data = ret.data
const deleteDataSource = async (id: number) => {
  await datasource.deleteDataSource(id)
  toast.success(t('success.delete_datasource'))
}
</script>
