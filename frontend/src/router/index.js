import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/mySnack',
      name: 'mySnack',
      component: () => import('../views/MySnackView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/MainView.vue')
    },
    {
      path: '/admin/branch',
      name: 'branch',
      component: () => import('../views/admin/BranchView.vue')
    },
    {
      path: '/admin/product',
      name: 'branch',
      component: () => import('../views/admin/ProductView.vue')
    }
  ]
})

export default router
