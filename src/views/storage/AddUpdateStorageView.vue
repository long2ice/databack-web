<template>
  <h3 class="text-lg font-bold">{{ isUpdate ? $t('update_storage') : $t('add_storage') }}</h3>
  <div class="tabs">
    <button
      class="tab-bordered tab"
      :class="{
        'tab-active': type == 's3'
      }"
      @click="type = 's3'"
      v-if="(isUpdate && type == 's3') || !isUpdate"
    >
      <FaBandsAws class="mr-2 text-lg" />
      S3
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
  <div class="flex flex-col">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('name') }}</span>
      </label>
      <input
        type="text"
        v-model="name"
        :placeholder="$t('name_placeholder')"
        class="input-bordered input w-full"
      />
      <label class="label">
        <span class="label-text-alt text-red-500">{{ errorMessage }}</span>
      </label>
    </div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">{{ $t('options') }}</span>
      </label>
      <div class="rounded-lg border p-4">
        <LocalOptions v-if="type == 'local'" ref="optionsRef" :defaultOptions="options" />
        <SSHOptions v-else-if="type == 'ssh'" ref="optionsRef" :defaultOptions="options" />
        <S3Options v-else-if="type == 's3'" ref="optionsRef" :defaultOptions="options" />
      </div>
    </div>
    <div class="btn-group mt-4">
      <button class="btn-primary btn" :disabled="isSubmitting" @click="onSave">
        {{ $t('save') }}
      </button>
      <button class="btn" @click="$router.back()">{{ $t('back') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LocalOptions from '@/components/storage/LocalOptions.vue'
import SSHOptions from '@/components/storage/SSHOptions.vue'
import * as yup from 'yup'
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import type { StorageType } from '@/types/responses'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { createStorage, getStorage, updateStorage } from '@/apis/storage'
import S3Options from '@/components/storage/S3Options.vue'
const router = useRouter()
const isUpdate = router.currentRoute.value.name === 'updateStorage'
const type = ref<StorageType>('s3')
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
    await updateStorage(parseInt(id as string), name, type.value, options)
    toast.success(t('success.update_datasource'))
  } else {
    await createStorage(name, type.value, options)
    toast.success(t('success.add_datasource'))
  }
  await router.back()
})
let options = {}
if (isUpdate) {
  const { id } = router.currentRoute.value.params
  const storage = await getStorage(parseInt(id as string))
  type.value = storage.type
  name.value = storage.name
  options = storage.options
}
</script>
