<template>
  <div class="w-full flex flex-col p-4 gap-4">
    <div class="flex flex-row">
      <label class="ml-auto btn" for="create-datasource">
        <ChPlus class="mr-1" />
        {{ $t('add_datasource') }}</label
      >
      <input type="checkbox" id="create-datasource" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label for="create-datasource" class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕</label
          >
          <h3 class="text-lg font-bold">{{ $t('add_datasource') }}</h3>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">{{ $t('name') }}</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered w-full" />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">{{ $t('type') }}</span>
            </label>
            <select class="select select-bordered w-full">
              <option value="mysql">MySQL</option>
              <option value="postgres">PostgreSQL</option>
              <option value="local">{{ $t('local') }}</option>
              <option value="ssh">SSH</option>
            </select>
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">{{ $t('options') }}</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered w-full" />
          </div>
          <div class="modal-action">
            <label for="create-datasource" class="btn">{{ $t('save') }}</label>
          </div>
        </div>
      </div>
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
        <tr v-for="datasource in data" :key="datasource.id">
          <th>{{ datasource.id }}</th>
          <td>{{ datasource.name }}</td>
          <td>
            <div class="tooltip tooltip-right" :data-tip="datasource.type">
              <DataSourceTypeIcon :type="datasource.type" />
            </div>
          </td>
          <td class="flex gap-1">
            <button class="btn btn-primary btn-sm">
              <BxSolidEditAlt />
            </button>
            <button class="btn btn-error btn-sm">
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
