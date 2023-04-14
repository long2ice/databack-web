<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>
<template>
  <div class="flex min-h-screen flex-col">
    <NavBar />
    <div class="flex flex-1">
      <Sidebar />
      <Suspense>
        <div class="flex w-full flex-col">
          <div class="flex w-full flex-col gap-2 p-4">
            <RouterView />
          </div>
          <Footer class="mt-auto" />
        </div>
      </Suspense>
    </div>
  </div>
  <DialogsWrapper />
</template>
