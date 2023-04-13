<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/SidebarNav.vue'
import NavBar from '@/components/NavBar.vue'
</script>
<template>
  <div class="flex min-h-screen flex-col">
    <NavBar />
    <div class="flex flex-1">
      <Sidebar />
      <Suspense>
        <div class="flex w-full flex-col gap-2 p-4">
          <RouterView />
        </div>
      </Suspense>
    </div>
  </div>
  <DialogsWrapper />
</template>
