<template>
  <div class="flex flex-row gap-4">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text"><span class="text-error">*</span>{{ $t('access_key_id') }}</span>
      </label>
      <input type="text" class="input-bordered input" v-model="ak" />
      <label class="label">
        <span class="label-text-alt text-error">{{ errorMessageAK }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text"><span class="text-error">*</span>{{ $t('secret_access_key') }}</span>
      </label>
      <input type="text" class="input-bordered input" v-model="sk" />
      <label class="label">
        <span class="label-text-alt text-error">{{ errorMessageSK }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text"><span class="text-error">*</span>{{ $t('bucket_name') }}</span>
      </label>
      <input type="text" class="input-bordered input" v-model="bucket_name" />
      <label class="label">
        <span class="label-text-alt text-error">{{ errorMessageBucketName }}</span>
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
        <span class="label-text">{{ $t('access_style') }}</span>
      </label>
      <select class="select select-bordered w-full" v-model="options.access_style">
        <option>auto</option>
        <option>path</option>
        <option>virtual</option>
      </select>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('endpoint_url') }}</span>
      </label>
      <input type="text" class="input-bordered input" v-model="options.endpoint_url" />
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
  path: string,
  access_style: string
} = reactive({
  region_name: defaultOptions['region_name'] || '',
  endpoint_url: defaultOptions['endpoint_url'] || '',
  path: defaultOptions['path'] || '',
  access_style: defaultOptions['access_style'] || 'auto'
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
    path: options.path,
    access_style: options.access_style
  }
}
defineExpose({
  getOptions
})
</script>
