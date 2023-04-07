<template>
  <div class="flex flex-col items-center border-r">
    <ul
      class="menu bg-base-100"
      :class="{
        'w-fit': sidebar.close,
        'w-56': !sidebar.close
      }"
    >
      <li>
        <router-link
          to="/"
          :class="{
            active: currentRoute.path === '/'
          }"
        >
          <AkHomeAlt1 class="text-2xl" />
          <span v-show="!sidebar.close">{{ $t('home') }}</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/datasource"
          :class="{
            active: currentRoute.path.startsWith('/datasource')
          }"
        >
          <FeDatabase class="text-2xl" />
          <span v-show="!sidebar.close">{{ $t('datasource') }}</span>
        </router-link>
      </li>
      <li>
        <router-link to="/storage" :class="{ active: currentRoute.path.startsWith('/storage') }">
          <TiOutlineCloudStorage class="text-2xl" />
          <span v-show="!sidebar.close">{{ $t('storage') }}</span>
        </router-link>
      </li>
      <li>
        <router-link to="/task" :class="{ active: currentRoute.path === '/task' }">
          <BsListTask class="text-2xl" />
          <span v-show="!sidebar.close">{{ $t('task') }}</span>
        </router-link>
      </li>
      <li>
        <router-link to="/tasklog" :class="{ active: currentRoute.path === '/tasklog' }">
          <GlTaskDone class="text-2xl" />
          <span v-show="!sidebar.close">{{ $t('task_log') }}</span>
        </router-link>
      </li>
    </ul>
    <div
      class="mt-auto flex w-full cursor-pointer justify-center bg-base-300 py-4"
      @click="sidebar.close = !sidebar.close"
    >
      <GlCollapseLeft
        class="text-2xl"
        :class="{
          'rotate-180 transform': sidebar.close
        }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSidebarClose } from '@/stores/sidebar'

const currentRoute = useRoute()
const sidebar = useSidebarClose()
</script>
