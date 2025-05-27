import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import DashboardPaciente from '@/views/DashboardPaciente.vue'
import Register from '@/views/Register.vue'

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
  },
  {
  path: '/register',
  name: 'Register',
  component: Register
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
