import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import DashboardPaciente from '@/views/DashboardPaciente.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'DashboardPaciente',
    component: DashboardPaciente
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
