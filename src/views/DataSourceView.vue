<template>
  <div class="w-full flex flex-col p-4 gap-4">
    <div class="flex flex-row">
      <button class="ml-auto btn"><ChPlus class="mr-1" />增加数据源</button>
    </div>
    <table class="table w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>动作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="datasource in data" :key="datasource.id">
          <th>{{ datasource.id }}</th>
          <td>{{ datasource.name }}</td>
          <td>
            <div class="tooltip tooltip-right" :data-tip="datasource.type">
              <DataSourceTypeIcon :type="datasource.type" />
            </div>
          </td>
          <td class="flex gap-1">
            <button class="btn btn-sm"><BxDetail /></button>
            <button class="btn btn-sm"><BxSolidEditAlt /></button>
            <button class="btn btn-error btn-sm"><ReDeleteBin7Line /></button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center">
      <div class="btn-group grid grid-cols-2">
        <button class="btn btn-outline">Previous</button>
        <button class="btn btn-outline">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDatasources } from '@/apis/datasource'
import DataSourceTypeIcon from '@/components/DataSourceTypeIcon.vue'

const datasources = await getDatasources(10, 0)
const data = datasources.data
const total = datasources.total
</script>

<style scoped></style>
