import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory('vue-composition-ui'),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/Home.vue'),
    },
    {
      name: 'pagination',
      path: '/pagination',
      component: () => import('@/components/pagination/Index.vue'),
    },
    {
      name: 'tags',
      path: '/tags',
      component: () => import('@/components/tags/Index.vue'),
    },
  ],
})
