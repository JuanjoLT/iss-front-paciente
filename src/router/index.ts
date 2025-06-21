// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "@/views/login/Login.vue";
import Register from "@/views/registro/Register.vue";
import MainLayout from "@/components/layouts/MainLayout.vue";
import MonitoreoPacientes from "@/views/monitoreo-pacientes/MonitoreoPacientes.vue";
import HistorialPaciente from "@/views/historial-sintomas/HistorialSintomas.vue";
import PerfilPaciente from "@/views/perfil-paciente/PerfilPaciente.vue";

// importa más vistas…
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/", // ruta vacía, pero con children
    component: MainLayout,
    children: [
      {
        path: "dashboard",
        name: "MonitoreoPacientes",
        component: MonitoreoPacientes,
      },
      {
        path: "perfil-paciente",
        name: "PerfilPaciente",
        component: PerfilPaciente,
      },

      {
        path: "historial",
        name: "HistorialPaciente",
        component: HistorialPaciente,
      },
      // …otras rutas bajo MainLayout
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
