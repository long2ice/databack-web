<template>
  <div class="flex flex-row gap-4">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('host') }}</span>
      </label>
      <input type="text" class="input input-bordered" v-model="host" />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('port') }}</span>
      </label>
      <input type="number" class="input input-bordered" v-model="port" />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('username') }}</span>
      </label>
      <input type="text" v-model="username" class="input input-bordered" />
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('password') }}</span>
      </label>
      <input type="text" class="input input-bordered" v-model="password" />
    </div>
  </div>
  <div class="form-control">
    <label class="label">
      <span class="label-text">{{ $t('other_options') }}</span>
    </label>
    <textarea
      class="textarea textarea-bordered h-24"
      v-model="otherOptions"
      :placeholder="$t('mysql_other_options_placeholder')"
    ></textarea>
    <label class="label">
      <span class="label-text-alt">
        {{ $t('mysql_other_options_tips') }}
        <a
          class="link link-primary"
          href="https://dev.mysql.com/doc/refman/8.0/en/mysqlpump.html"
          target="_blank"
          >https://dev.mysql.com/doc/refman/8.0/en/mysqlpump.html</a
        >
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, toRefs } from 'vue'

const options = reactive({
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '',
  otherOptions: ''
})
const { host, port, username, password, otherOptions } = toRefs(options)
const otherOptionsDict = computed(() => {
  const dict: Record<string, any> = {}
  otherOptions.value.split(' ').forEach((item) => {
    if (item.includes('=')) {
      const [key, value] = item.split('=')
      dict[key] = value
    } else if (item) {
      dict[item] = true
    }
  })
  return dict
})
defineExpose({
  options: {
    '--host': host.value,
    '--port': port.value,
    '--user': username.value,
    '--password': password.value,
    ...otherOptionsDict.value
  }
})
</script>
