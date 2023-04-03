<template>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text">{{ $t('local_path') }}</span>
    </label>
    <input type="text" class="input input-bordered" v-model="path" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const path = ref('')
defineExpose({
  options: {
    path: path.value
  }
})
</script>
