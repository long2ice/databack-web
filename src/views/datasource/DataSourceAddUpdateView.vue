<template>
  <h3 class="text-lg font-bold">{{ isUpdate ? $t('update_datasource') : $t('add_datasource') }}</h3>
  <div class="tabs">
    <button
      class="tab-bordered tab"
      :class="{
        'tab-active': type == 'mysql'
      }"
      @click="type = 'mysql'"
      v-if="(isUpdate && type == 'mysql') || !isUpdate"
    >
      <DeMysqlOriginal class="mr-2 text-lg" />
      MySQL
    </button>
    <button
      class="tab-bordered tab"
      :class="{
        'tab-active': type == 'postgres'
      }"
      @click="type = 'postgres'"
      v-if="(isUpdate && type == 'postgres') || !isUpdate"
    >
      <DePostgresqlOriginal class="mr-2 text-lg" />
      PostgreSQL
    </button>
    <button
      class="tab-bordered tab"
      :class="{
        'tab-active': type == 'redis'
      }"
      @click="type = 'redis'"
      v-if="(isUpdate && type == 'redis') || !isUpdate"
    >
      <DeRedisOriginal class="mr-2 text-lg" />
      Redis
    </button>
    <button
      class="tab-bordered tab"
      :class="{
        'tab-active': type == 'mongo'
      }"
      @click="type = 'mongo'"
      v-if="(isUpdate && type == 'mongo') || !isUpdate"
    >
      <VsFolderTypeMongodb class="mr-2 text-lg" />
      MongoDB
    </button>
    <button
      class="tab-bordered tab"
      :class="{
        'tab-active': type == 'clickhouse'
      }"
      @click="type = 'clickhouse'"
      v-if="(isUpdate && type == 'clickhouse') || !isUpdate"
    >
      <SiClickhouse class="mr-2 text-lg text-yellow-500" />
      ClickHouse
    </button>
    <button
      class="tab-bordered tab"
      :class="{
        'tab-active': type == 'local'
      }"
      @click="type = 'local'"
      v-if="(isUpdate && type == 'local') || !isUpdate"
    >
      <CaVolumeBlockStorage class="mr-2 text-lg" />
      {{ $t('local') }}
    </button>
    <button
      class="tab-bordered tab"
      :class="{
        'tab-active': type == 'ssh'
      }"
      @click="type = 'ssh'"
      v-if="(isUpdate && type == 'ssh') || !isUpdate"
    >
      <CaVirtualMachine class="mr-2 text-lg" />
      SSH
    </button>
  </div>
  <div class="text-sm text-gray-500" v-if="type === 'mysql'">{{ t('mysql_datasource_desc') }}</div>
  <div class="text-sm text-gray-500" v-if="type === 'postgres'">
    {{ t('postgres_datasource_desc') }}
  </div>
  <div class="text-sm text-gray-500" v-if="type === 'local'">{{ t('local_datasource_desc') }}</div>
  <div class="text-sm text-gray-500" v-if="type === 'ssh'">{{ t('ssh_datasource_desc') }}</div>
  <div class="text-sm text-gray-500" v-if="type === 'redis'">{{ t('redis_datasource_desc') }}</div>
  <div class="text-sm text-gray-500" v-if="type === 'mongo'">{{ t('mongo_datasource_desc') }}</div>
  <div class="text-sm text-gray-500" v-if="type === 'clickhouse'">
    {{ t('clickhouse_datasource_desc') }}
  </div>
  <div class="flex flex-col">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text"><span class="text-error">*</span>{{ $t('name') }}</span>
      </label>
      <input
        type="text"
        v-model="name"
        :placeholder="$t('name_placeholder')"
        class="input-bordered input w-full"
      />
      <label class="label">
        <span class="label-text-alt text-error">{{ errorMessage }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('options') }}</span>
      </label>
      <div class="rounded-lg border p-4">
        <LocalOptions v-if="type == 'local'" ref="optionsRef" :defaultOptions="options" />
        <SSHOptions v-else-if="type == 'ssh'" ref="optionsRef" :defaultOptions="options" />
        <MySQLOptions v-else-if="type == 'mysql'" ref="optionsRef" :defaultOptions="options" />
        <PostgreSQLOptions
          v-else-if="type == 'postgres'"
          ref="optionsRef"
          :defaultOptions="options"
        />
        <RedisOptions v-else-if="type == 'redis'" ref="optionsRef" :defaultOptions="options" />
        <MongoOptions v-else-if="type == 'mongo'" ref="optionsRef" :defaultOptions="options" />
        <ClickHouseOptions
          v-else-if="type == 'clickhouse'"
          ref="optionsRef"
          :defaultOptions="options"
        />
      </div>
    </div>
    <div class="btn-group mt-4">
      <button
        class="btn-primary btn"
        :class="{
          loading: isSubmitting
        }"
        @click="onSave"
      >
        {{ $t('save') }}
      </button>
      <button class="btn" @click="$router.back()">{{ $t('back') }}</button>
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
import { createDataSource, getDataSource, updateDataSource } from '@/api/datasource'
import type { DataSourceType } from '@/types/responses'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
const router = useRouter()
const isUpdate = router.currentRoute.value.name === 'updateDataSource'
const type = ref<DataSourceType>('mysql')
const { t } = useI18n()
const { handleSubmit, isSubmitting } = useForm()
const { value: name, errorMessage } = useField(
  'name',
  yup.string().required(t('validate.name_required'))
)
const optionsRef = ref()
const onSave = handleSubmit(async (values) => {
  const { name } = values
  const options = optionsRef.value.getOptions()
  if (isUpdate) {
    const { id } = router.currentRoute.value.params
    await updateDataSource(parseInt(id as string), name, type.value, options)
    toast.success(t('success.update_datasource'))
  } else {
    await createDataSource(name, type.value, options)
    toast.success(t('success.add_datasource'))
  }
  await router.back()
})
let options = {}
if (isUpdate) {
  const { id } = router.currentRoute.value.params
  const dataSource = await getDataSource(parseInt(id as string))
  type.value = dataSource.type
  name.value = dataSource.name
  options = dataSource.options
}
</script>
