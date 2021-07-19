import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('src/layouts/mainLayout/MainLayout.vue'),
    children: [
      { path: '/menu-list', component: () => import('src/pages/MenuList.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  
];

export default routes;
