<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/SidebarNav.vue'
</script>
<template>
  <Suspense>
    <div class="flex flex-row">
    <Sidebar />
    <RouterView />
  </div>
  </Suspense>
</template>
