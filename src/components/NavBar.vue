<template>
  <div class="navbar bg-neutral text-neutral-content">
    <div class="flex-1">
      <router-link class="btn btn-ghost normal-case text-xl" to="/">Databack</router-link>
    </div>
    <div class="flex-none">
      <li>
        <button>
          <label class="swap-rotate swap">
            <input type="checkbox" data-toggle-theme="light,dark" />
            <IoSunnyOutline size="1.5em" className="swap-off" />
            <IoMoonOutline size="1.5em" className="swap-on" />
          </label>
        </button>
      </li>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <HiLanguage class="text-2xl" />
        </label>
        <ul tabindex="0" class="menu dropdown-content mt-3 p-3 shadow bg-neutral rounded-box">
          <li>
            <a><span class="text-lg">🇺🇸</span>English</a>
          </li>
          <li>
            <a><span class="text-lg">🇨🇳</span>中文</a>
          </li>
        </ul>
      </div>
      <a
        class="btn btn-ghost btn-circle"
        href="https://github.com/long2ice/databack"
        target="_blank"
      >
        <AkGithubFill class="text-2xl" />
      </a>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
