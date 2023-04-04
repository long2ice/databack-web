<template>
  <ul class="menu w-56 border-r bg-base-100 p-2">
    <li>
      <router-link to="/" :class="{ active: currentRoute.path === '/' }">
        <AkHomeAlt1 />
        {{ $t('home') }}
      </router-link>
    </li>
    <li>
      <router-link
        to="/datasource"
        :class="{ active: currentRoute.path.startsWith('/datasource') }"
      >
        <FeDatabase />
        {{ $t('datasource') }}
      </router-link>
    </li>
    <li>
      <router-link to="/storage" :class="{ active: currentRoute.path.startsWith('/storage') }">
        <TiOutlineCloudStorage />
        {{ $t('storage') }}
      </router-link>
    </li>
    <li>
      <router-link to="/task" :class="{ active: currentRoute.path === '/task' }">
        <BsListTask />
        {{ $t('task') }}
      </router-link>
    </li>
    <li>
      <router-link to="/tasklog" :class="{ active: currentRoute.path === '/tasklog' }">
        <GlTaskDone />
        {{ $t('task_log') }}
      </router-link>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

const currentRoute = useRoute()
</script>
