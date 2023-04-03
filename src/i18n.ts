import { createI18n } from 'vue-i18n'
import en from '@/locales/en-US'
import zh from '@/locales/zh-CN'

export const i18n = createI18n({
  messages: {
    'en-US': en,
    'zh-CN': zh
  },
  fallbackLocale: 'en-US',
  legacy: false
})
