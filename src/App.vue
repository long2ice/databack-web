<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/SidebarNav.vue'
import NavBar from '@/components/NavBar.vue'
</script>
<template>
  <NavBar />
  <Suspense>
    <div class="flex flex-row">
      <Sidebar />
      <RouterView />
    </div>
  </Suspense>
</template>
