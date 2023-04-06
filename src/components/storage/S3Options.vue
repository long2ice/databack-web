<template>
  <div class="flex flex-row gap-4">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('access_key_id') }}</span>
      </label>
      <input type="text" class="input-bordered input" v-model="ak" />
      <label class="label">
        <span class="label-text-alt text-red-500">{{ errorMessageAK }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('secret_access_key') }}</span>
      </label>
      <input type="text" class="input-bordered input" v-model="sk" />
      <label class="label">
        <span class="label-text-alt text-red-500">{{ errorMessageSK }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('bucket_name') }}</span>
      </label>
      <input type="text" class="input-bordered input" v-model="bucket_name" />
      <label class="label">
        <span class="label-text-alt text-red-500">{{ errorMessageBucketName }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('region_name') }}</span>
      </label>
      <input type="text" v-model="options.region_name" class="input-bordered input" />
    </div>
  </div>
  <div class="flex flex-row gap-4">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('endpoint_url') }}</span>
      </label>
      <input type="text" class="input-bordered input" v-model="options.endpoint_url" />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('path') }}</span>
      </label>
      <input type="text" class="input-bordered input" v-model="options.path" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  defaultOptions: Record<string, any>
}>()
const defaultOptions = props.defaultOptions || {}
const options: {
  region_name: string
  endpoint_url: string
  path: string
} = reactive({
  region_name: defaultOptions['region_name'] || '',
  endpoint_url: defaultOptions['endpoint_url'] || '',
  path: defaultOptions['path'] || ''
})
const { t } = useI18n()
const { value: ak, errorMessage: errorMessageAK } = useField(
  'ak',
  yup.string().required(t('validate.ak_required'))
)
const { value: sk, errorMessage: errorMessageSK } = useField(
  'sk',
  yup.string().required(t('validate.sk_required'))
)
const { value: bucket_name, errorMessage: errorMessageBucketName } = useField(
  'bucket_name',
  yup.string().required(t('validate.bucket_name_required'))
)
ak.value = defaultOptions['access_key_id'] || ''
sk.value = defaultOptions['secret_access_key'] || ''
bucket_name.value = defaultOptions['bucket_name'] || ''
const getOptions = () => {
  return {
    access_key_id: ak.value,
    secret_access_key: sk.value,
    bucket_name: bucket_name.value,
    region_name: options.region_name,
    endpoint_url: options.endpoint_url,
    path: options.path
  }
}
defineExpose({
  getOptions
})
</script>
