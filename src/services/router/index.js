import { createRouter, createWebHistory } from 'vue-router';

import Home from '../../Views/Home.vue';
import Users from '../../Views/Users.vue';
import Articles from '../../Views/Articles.vue';
import Boats from '../../Views/Boats.vue';

import Settings from '../../Views/Settings.vue';
import Login from '../../Views/Login.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/users', name: 'Users', component: Users },
  { path: '/boats', name: 'Boats', component: Boats },
  { path: '/articles', name: 'Articles', component: Articles },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Garde d'authentification
router.beforeEach((to, from, next) => {
  const session = localStorage.key(0);
  const token = session
    ? JSON.parse(localStorage.getItem(session)).access_token
    : null;
  const isLoginPage = to.name === 'Login';

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une autre page que /login
  if (!token && !isLoginPage) {
    return next({ name: 'Login' }); // Redirige vers la page de login
  }

  // Si l'utilisateur est déjà connecté et essaie d'accéder à /login, redirige vers la page d'accueil
  if (token && isLoginPage) {
    return next({ name: 'Home' }); // Redirige vers la page d'accueil
  }

  // Si tout est bon, continue la navigation
  next();
});

export default router;
