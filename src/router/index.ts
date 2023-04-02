import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/datasource',
      name: 'datasource',
      component: () => import('@/views/DataSourceView.vue')
    },
    {
      path: '/storage',
      name: 'storage',
      component: () => import('@/views/StorageView.vue')
    },
    {
      path: '/task',
      name: 'task',
      component: () => import('@/views/TaskView.vue')
    },
    {
      path: '/tasklog',
      name: 'tasklog',
      component: () => import('@/views/TaskLogView.vue')
    }
  ]
})

export default router
