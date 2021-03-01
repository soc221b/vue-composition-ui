import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory('vue-composition-ui'),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('./views/Home.vue'),
    },
    {
      name: 'pagination',
      path: '/pagination',
      component: () => import('./examples/pagination/Index.vue'),
    },
    {
      name: 'tags',
      path: '/tags',
      component: () => import('./examples/tags/Index.vue'),
    },
    {
      name: 'time',
      path: '/time',
      component: () => import('./examples/time/Index.vue'),
    },
  ],
})
