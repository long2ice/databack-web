<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
const { t } = useI18n()
const props = defineProps({
  msg: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  open: {
    type: Boolean
  }
})
const isModalOpen = ref(props.open)
const emit = defineEmits(['confirm', 'cancel'])
const onClick = (confirm: boolean) => {
  if (confirm) {
    emit('confirm')
  } else {
    emit('cancel')
  }
  isModalOpen.value = false
}
</script>

<template>
  <input type="checkbox" v-model="isModalOpen" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p>{{ msg }}</p>
      <div class="modal-action">
        <button class="btn-primary btn" @click="onClick(true)">
          {{ t('confirm_title') }}
        </button>
        <button class="btn" @click="onClick(false)">{{ t('cancel') }}</button>
      </div>
    </div>
  </div>
</template>
