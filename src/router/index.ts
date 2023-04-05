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
          component: () => import('@/views/datasource/AddUpdateDataSourceView.vue')
        },
        {
          path: ':id/update',
          name: 'updateDataSource',
          component: () => import('@/views/datasource/AddUpdateDataSourceView.vue')
        }
      ]
    },
    {
      path: '/storage',
      component: () => import('@/views/storage/StorageView.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/storage/StorageListView.vue')
        },
        {
          path: 'add',
          component: () => import('@/views/storage/AddUpdateStorageView.vue')
        },
        {
          path: ':id/update',
          name: 'updateStorage',
          component: () => import('@/views/storage/AddUpdateStorageView.vue')
        }
      ]
    },
    {
      path: '/task',
      component: () => import('@/views/TaskView.vue')
    },
    {
      path: '/tasklog',
      component: () => import('@/views/TaskLogView.vue')
    },
    {
      path: '/404',
      component: () => import('@/views/NotFoundView.vue')
    },
    { path: '/:pathMatch(.*)', redirect: '/404' }
  ]
})

export default router
