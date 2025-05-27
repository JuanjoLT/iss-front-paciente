<template>
  <div class="dashboard">
    <h1>Monitoreo de Pacientes</h1>

    <!-- Contenedor de botones alineados a los extremos -->
    <div class="acciones">
      <button @click="mostrarPerfil = !mostrarPerfil">
        {{ mostrarPerfil ? 'Ocultar Perfil' : 'Ver Perfil' }}
      </button>
      <button class="cerrar" @click="cerrarSesion">Cerrar Sesión</button>
    </div>

    <!-- Perfil del paciente -->
    <div v-if="mostrarPerfil" class="perfil">
      <h2>Perfil del Paciente</h2>
      <p><strong>Nombre:</strong> {{ paciente.nombre }}</p>
      <p><strong>RUT:</strong> {{ paciente.rut }}</p>
      <p><strong>Edad:</strong> {{ paciente.edad }}</p>
      <p><strong>Correo:</strong> {{ paciente.correo }}</p>
    </div>

    <BotonPanico />
    <FormularioSintomas />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BotonPanico from '@/components/BotonPanico.vue'
import FormularioSintomas from '@/components/FormularioSintomas.vue'

const paciente = ref({
  nombre: 'Juan Pérez',
  rut: '12.345.678-9',
  edad: 45,
  correo: 'juan.perez@ejemplo.com'
})

const mostrarPerfil = ref(false)
const router = useRouter()

const cerrarSesion = () => {
  localStorage.removeItem('usuarioActual') // opcional
  router.push('/')
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}

.acciones {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 1.5rem;
}

.acciones button {
  padding: 0.5rem 1rem;
  background-color: #c21807;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.acciones button:hover {
  background-color: #a10c0c;
}

.perfil {
  background-color: #d56464;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
}
</style>
