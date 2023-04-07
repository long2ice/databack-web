<template>
  <div class="navbar bg-neutral text-neutral-content">
    <div class="flex-1">
      <router-link class="btn-ghost btn text-xl normal-case" to="/">Databack</router-link>
    </div>
    <div class="flex-none">
      <button class="btn-ghost btn-circle btn">
        <label class="swap-rotate swap">
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
