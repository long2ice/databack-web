<template>
  <div class="navbar bg-neutral text-neutral-content">
    <div class="flex-1">
      <router-link class="btn btn-ghost normal-case text-xl" to="/">Databack</router-link>
    </div>
    <div class="flex-none">
      <button class="btn btn-ghost btn-circle">
        <label class="swap-rotate swap">
          <input type="checkbox" data-toggle-theme="light,dark" />
          <MdOutlinedWbSunny class="text-xl swap-off" />
          <CoMoon class="text-xl swap-on" />
        </label>
      </button>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <HiLanguage class="text-xl" />
        </label>
        <ul tabindex="0" class="menu dropdown-content mt-3 p-3 shadow bg-neutral rounded-box">
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
        class="btn btn-ghost btn-circle"
        href="https://github.com/long2ice/databack"
        target="_blank"
      >
        <AkGithubFill class="text-xl" />
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { themeChange } from 'theme-change'
import { onMounted } from 'vue'
import { useLanguage } from '@/stores/language'
import { useI18n } from 'vue-i18n'
const language = useLanguage()
const i18n = useI18n()
i18n.locale.value = language.language
language.$subscribe((mutation, state) => {
  i18n.locale.value = state.language
})
onMounted(() => {
  themeChange(false)
})
</script>
