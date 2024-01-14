import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/HomePage.vue') },
      {
        path: 'home',
        component: () => import('pages/HomePage.vue'),
        name: 'home',
      },
      {
        path: 'projects',
        component: () => import('pages/ProjectsPage.vue'),
        name: 'projects',
      },
      {
        path: 'agence',
        component: () => import('pages/AgencePage.vue'),
        name: 'agence',
      },
      {
        path: 'contact',
        component: () => import('pages/ContactPage.vue'),
        name: 'contact',
      },
      {
        path: 'expertise',
        component: () => import('pages/ExpertisePage.vue'),
        name: 'expertise',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
