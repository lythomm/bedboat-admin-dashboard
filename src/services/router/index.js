import { createRouter, createWebHistory } from 'vue-router';

import Home from '../../Views/Home.vue';
import Users from '../../Views/Users.vue';
import Settings from '../../Views/Settings.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/users', name: 'Users', component: Users },
  { path: '/settings', name: 'Settings', component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
