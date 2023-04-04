<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
defineProps({
  msg: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div class="my-modal" @click.self="emit('cancel')">
    <div class="modal-box">
      <p>{{ msg }}</p>
      <div class="modal-action">
        <button class="btn-primary btn" @click="emit('confirm')">
          {{ t('confirm_title') }}
        </button>
        <button class="btn" @click="emit('cancel')">{{ t('cancel') }}</button>
      </div>
    </div>
  </div>
</template>

<style>
.my-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #cecece89;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
}
</style>
