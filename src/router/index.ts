import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/datasource',
      component: () => import('@/views/datasource/DataSourceView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/datasource/DataSourceListView.vue')
        },
        {
          path: 'add',
          component: () => import('@/views/datasource/AddDataSourceView.vue')
        }
      ]
    },
    {
      path: '/storage',
      component: () => import('@/views/StorageView.vue')
    },
    {
      path: '/task',
      component: () => import('@/views/TaskView.vue')
    },
    {
      path: '/tasklog',
      component: () => import('@/views/TaskLogView.vue')
    }
  ]
})

export default router
