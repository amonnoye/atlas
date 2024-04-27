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
      {
        path: 'chiffre',
        component: () => import('pages/ChiffrePage.vue'),
        name: 'chiffre',
      },
      {
        path: 'equipe',
        component: () => import('pages/EquipePage.vue'),
        name: 'equipe',
      },
      {
        path: 'back',
        component: () => import('layouts/BackLayout.vue'),
        name: 'back',
        children: [
          {
            path: 'addproject',
            name: 'backaddproject',
            component: () => import('pages/admin/BackProjectPage.vue'),
          },
          {
            path: 'listproject',
            name: 'backlistproject',
            component: () => import('pages/admin/BackListProjectPage.vue'),
          },
          {
            path: 'editproject/:id',
            name: 'backeditproject',
            props: true,
            component: () => import('pages/admin/BackEditProjectPage.vue'),
          },
          {
            path: 'addpeople',
            name: 'backaddpeople',
            component: () => import('pages/admin/BackPeoplePage.vue'),
          },
          {
            path: 'editpeople',
            name: 'backeditpeople',
            component: () => import('pages/admin/BackEditPeoplePage.vue'),
          },
          {
            path: 'listpeople',
            name: 'backlistpeople',
            component: () => import('pages/admin/BackListPeoplePage.vue'),
          },
        ],
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
