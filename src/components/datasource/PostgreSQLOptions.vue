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
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('backup_program') }}</span>
      </label>
      <select class="select select-bordered" v-model="backup_program">
        <option>pg_dump</option>
        <option>pg_dumpall</option>
      </select>
    </div>
  </div>
  <div class="form-control">
    <label class="label">
      <span class="label-text">{{ $t('other_options') }}</span>
    </label>
    <textarea
      class="textarea textarea-bordered h-24"
      v-model="otherOptions"
      :placeholder="$t('postgresql_other_options_placeholder')"
    ></textarea>
    <label class="label">
      <span class="label-text-alt">
        {{ $t('postgresql_other_options_tips', { type: backup_program }) }}
        <a class="link link-primary" :href="refUrl" target="_blank">{{ refUrl }}</a>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, toRefs } from 'vue'

const options = reactive({
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: '',
  backup_program: 'pg_dump',
  otherOptions: ''
})

const { host, port, username, password, backup_program, otherOptions } = toRefs(options)
const refUrl = computed(() => {
  if (backup_program.value === 'pg_dump') {
    return 'https://www.postgresql.org/docs/current/app-pgdump.html'
  } else {
    return 'https://www.postgresql.org/docs/current/app-pg-dumpall.html'
  }
})
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
    '--username': username.value,
    '--password': password.value,
    ...otherOptionsDict.value
  }
})
</script>
