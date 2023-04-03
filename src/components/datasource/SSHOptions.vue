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
  <div class="flex flex-row gap-4">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('private_key') }}</span>
      </label>
      <textarea v-model="private_key" class="textarea textarea-bordered h-24"></textarea>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('private_key_pass') }}</span>
      </label>
      <input type="text" v-model="private_key_pass" class="input input-bordered" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'

const options = reactive({
  host: 'localhost',
  port: '22',
  username: 'root',
  password: '',
  private_key: '',
  private_key_pass: ''
})
const { host, port, username, password, private_key, private_key_pass } = toRefs(options)
defineExpose({
  options: {
    host: host.value,
    port: port.value,
    username: username.value,
    password: password.value,
    private_key: private_key.value,
    private_key_pass: private_key_pass.value
  }
})
</script>
