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
      component: () => import('@/examples/pagination/index.vue'),
    },
    {
      name: 'tags',
      path: '/tags',
      component: () => import('@/examples/tags/index.vue'),
    },
  ],
})
