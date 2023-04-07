<template>
  <div class="flex flex-row gap-4">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('host') }}<span class="text-red-500">*</span></span>
      </label>
      <input type="text" class="input-bordered input" v-model="host" />
      <label class="label">
        <span class="label-text-alt text-red-500">{{ errorMessageHost }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('port') }}<span class="text-red-500">*</span></span>
      </label>
      <input type="number" class="input-bordered input" v-model="port" />
      <label class="label">
        <span class="label-text-alt text-red-500">{{ errorMessagePort }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('username') }}<span class="text-red-500">*</span></span>
      </label>
      <input type="text" v-model="username" class="input-bordered input" />
      <label class="label">
        <span class="label-text-alt text-red-500">{{ errorMessageUsername }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('password') }}</span>
      </label>
      <input type="text" class="input-bordered input" v-model="options.password" />
    </div>
  </div>
  <div class="form-control">
    <label class="label">
      <span class="label-text">{{ $t('other_options') }}</span>
    </label>
    <textarea
      class="textarea-bordered textarea h-24"
      v-model="options.otherOptions"
      :placeholder="$t('mysql_other_options_placeholder')"
    ></textarea>
    <label class="label">
      <span class="label-text-alt">
        {{ $t('mysql_other_options_tips') }}
        <a
          class="link-primary link"
          href="https://dev.mysql.com/doc/refman/8.0/en/mysqlpump.html"
          target="_blank"
          >https://dev.mysql.com/doc/refman/8.0/en/mysqlpump.html</a
        >
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { dict2str, str2dict } from '@/utils/options'
import { useField } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
const props = defineProps<{
  defaultOptions: Record<string, any>
}>()
const defaultOptions = props.defaultOptions || {}
const options: {
  password: string
  otherOptions: string
} = reactive({
  password: defaultOptions['--password'] || '',
  otherOptions: dict2str(defaultOptions, ['--host', '--port', '--user', '--password'])
})
const { t } = useI18n()
const { value: host, errorMessage: errorMessageHost } = useField(
  'host',
  yup.string().required(t('validate.host_required'))
)
const { value: port, errorMessage: errorMessagePort } = useField(
  'port',
  yup.number().required(t('validate.port_required'))
)
const { value: username, errorMessage: errorMessageUsername } = useField(
  'username',
  yup.string().required(t('validate.username_required'))
)
host.value = defaultOptions['--host'] || 'localhost'
port.value = defaultOptions['--port'] || '3306'
username.value = defaultOptions['--user'] || 'root'
const otherOptionsDict = computed(() => {
  return str2dict(options.otherOptions)
})
const getOptions = () => {
  return {
    '--host': host.value,
    '--port': port.value,
    '--user': username.value,
    '--password': options.password,
    ...otherOptionsDict.value
  }
}
defineExpose({
  getOptions
})
</script>
