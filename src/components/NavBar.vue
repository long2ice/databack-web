<template>
  <div class="navbar bg-neutral text-neutral-content">
    <div class="flex-1">
      <router-link class="btn-ghost btn text-xl normal-case" to="/">Databack</router-link>
    </div>
    <div class="flex-none">
      <button class="btn-ghost btn-circle btn">
        <label class="swap swap-rotate">
          <input type="checkbox" data-toggle-theme="light,dark" />
          <MdOutlinedWbSunny class="swap-off text-xl" />
          <CoMoon class="swap-on text-xl" />
        </label>
      </button>
      <div class="dropdown-end dropdown">
        <label tabindex="0" class="btn-ghost btn-circle btn">
          <HiLanguage class="text-xl" />
        </label>
        <ul tabindex="0" class="dropdown-content menu rounded-box mt-3 bg-neutral p-3 shadow">
          <li>
            <button @click="language.language = 'en-US'">
              <span class="text-lg">🇺🇸</span>English
            </button>
          </li>
          <li>
            <button @click="language.language = 'zh-CN'">
              <span class="text-lg">🇨🇳</span>中文
            </button>
          </li>
        </ul>
      </div>
      <a
        class="btn-ghost btn-circle btn"
        href="https://github.com/long2ice/databack"
        target="_blank"
      >
        <AkGithubFill class="text-xl" />
      </a>
      <div class="dropdown-end dropdown dropdown-bottom" v-if="auth.admin.id">
        <div tabindex="0" class="flex cursor-pointer flex-col items-center">
          <div class="text-sm">{{ auth.admin.nickname }}</div>
          <div
            class="badge text-sm"
            :class="{
              'badge-primary': auth.admin.is_superuser,
              'badge-secondary': !auth.admin.is_superuser
            }"
          >
            {{ auth.admin.is_superuser ? $t('super_admin') : $t('admin') }}
          </div>
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box w-36 bg-base-100 p-2 text-neutral-900 shadow"
        >
          <li>
            <a @click="sign_out"><AkSignOut class="text-xl" />{{ $t('sign_out') }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { themeChange } from 'theme-change'
import { useLanguage } from '@/stores/language'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useAuth } from '@/stores/auth'
import { onMounted } from 'vue'
const language = useLanguage()
const i18n = useI18n()
i18n.locale.value = language.language
language.$subscribe((mutation, state) => {
  i18n.locale.value = state.language
})
const router = useRouter()
const auth = useAuth()
onMounted(() => {
  themeChange(false)
})
const sign_out = async () => {
  auth.sign_out()
  toast.success(i18n.t('success.sign_out'))
  await router.push('/login')
}
</script>
