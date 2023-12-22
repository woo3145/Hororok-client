import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./pages/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./pages/Register.vue'),
  },
  {
    path: '/users/:userId',
    name: 'UserProfile',
    component: () => import('./pages/UserProfile.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
