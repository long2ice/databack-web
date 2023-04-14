<template>
  <div class="flex flex-row gap-4">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('host') }}<span class="text-error">*</span></span>
      </label>
      <input type="text" class="input-bordered input" v-model="host" />
      <label class="label">
        <span class="label-text-alt text-error">{{ errorMessageHost }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('port') }}<span class="text-error">*</span></span>
      </label>
      <input type="number" class="input-bordered input" v-model="port" />
      <label class="label">
        <span class="label-text-alt text-error">{{ errorMessagePort }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('username') }}</span>
      </label>
      <input type="text" v-model="options.user" class="input-bordered input" />
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
      :placeholder="$t('redis_other_options_placeholder')"
    ></textarea>
    <label class="label">
      <span class="label-text-alt">
        {{ $t('redis_other_options_tips') }}
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
  user: string
} = reactive({
  password: defaultOptions['--password'] || '',
  otherOptions: dict2str(defaultOptions, ['--host', '--port', '--user', '--password']),
  user: defaultOptions['--user'] || ''
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

host.value = defaultOptions['--host'] || 'localhost'
port.value = defaultOptions['--port'] || '6379'
const otherOptionsDict = computed(() => {
  return str2dict(options.otherOptions)
})
const getOptions = () => {
  return {
    '--host': host.value,
    '--port': port.value,
    '--user': options.user,
    '--password': options.password,
    ...otherOptionsDict.value
  }
}
defineExpose({
  getOptions
})
</script>
