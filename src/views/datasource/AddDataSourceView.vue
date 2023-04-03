<template>
  <h3 class="text-lg font-bold">{{ $t('add_datasource') }}</h3>
  <div class="tabs">
    <button
      class="tab tab-bordered"
      :class="{
        'tab-active': type == 'mysql'
      }"
      @click="type = 'mysql'"
    >
      <DeMysqlOriginal class="mr-2 text-lg" />
      MySQL
    </button>
    <button
      class="tab tab-bordered"
      :class="{
        'tab-active': type == 'postgres'
      }"
      @click="type = 'postgres'"
    >
      <DePostgresqlOriginal class="mr-2 text-lg" />
      PostgreSQL
    </button>
    <button
      class="tab tab-bordered"
      :class="{
        'tab-active': type == 'local'
      }"
      @click="type = 'local'"
    >
      <CaVolumeBlockStorage class="mr-2 text-lg" />
      {{ $t('local') }}
    </button>
    <button
      class="tab tab-bordered"
      :class="{
        'tab-active': type == 'ssh'
      }"
      @click="type = 'ssh'"
    >
      <CaVirtualMachine class="mr-2 text-lg" />
      SSH
    </button>
  </div>
  <div class="flex flex-col">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('name') }}</span>
      </label>
      <input
        type="text"
        v-model="name"
        :placeholder="$t('name_placeholder')"
        class="input input-bordered w-full"
      />
      <label class="label">
        <span class="label-text-alt text-red-500">{{ errorMessage }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('options') }}</span>
      </label>
      <div class="p-4 border rounded">
        <LocalOptions v-if="type == 'local'" ref="optionsRef" />
        <SSHOptions v-else-if="type == 'ssh'" ref="optionsRef" />
        <MySQLOptions v-else-if="type == 'mysql'" ref="optionsRef" />
        <PostgreSQLOptions v-else-if="type == 'postgres'" ref="optionsRef" />
      </div>
    </div>
    <div class="btn-group mt-4">
      <button class="btn" :disabled="isSubmitting" @click="addDataSource">{{ $t('save') }}</button>
      <button class="btn btn-primary" @click="$router.back()">{{ $t('back') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LocalOptions from '@/components/datasource/LocalOptions.vue'
import PostgreSQLOptions from '@/components/datasource/PostgreSQLOptions.vue'
import MySQLOptions from '@/components/datasource/MySQLOptions.vue'
import SSHOptions from '@/components/datasource/SSHOptions.vue'
import * as yup from 'yup'
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { createDataSource } from '@/apis/datasource'
import type { DataSourceType } from '@/types/responses'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const type = ref<DataSourceType>('mysql')
const { t } = useI18n()
const { handleSubmit, isSubmitting } = useForm()
const { value: name, errorMessage } = useField('name', yup.string().required(t('name_required')))
const optionsRef = ref()
const router = useRouter()
const addDataSource = handleSubmit(async (values) => {
  const { name } = values
  const options = optionsRef.value.options
  await createDataSource(name, type.value, options)
  toast.success(t('success.add_datasource_success'))
  await router.back()
})
</script>
