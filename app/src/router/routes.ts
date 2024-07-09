import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    { path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '/', component: () => import('pages/todoIndex.vue') },
        { path: '/help', component: () => import('pages/help-page.vue') },
        { path: '/test', component: () => import('pages/test-1.vue') },
      ]
    },
    {
      path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue'),
    }

  // Always leave this as last one,
  // but you can also remove it
  
];

export default routes;
