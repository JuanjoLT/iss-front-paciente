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
      <p><strong>Email:</strong> {{ paciente.email }}</p>
      <p><strong>Género:</strong> {{ paciente.genero }}</p>
      <p><strong>Fecha de Nacimiento:</strong> {{ paciente.fechaNacimiento }}</p>
      <p><strong>Teléfono:</strong> {{ paciente.telefono }}</p>
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
  localStorage.removeItem('usuarioActual') // opcional, si usas localStorage para sesión
  router.push('/')
}
</script>

<style scoped>
.dashboard {
  /* max-width: 1000px; */
  /* margin: 100px auto;  */
  /* padding: 1rem; */
  font-family: 'Segoe UI', sans-serif;
  color: #054f1a;
}

h1 {
  text-align: center;
  color: #c8d9d9;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.acciones {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.acciones button {
  padding: 0.6rem 1.2rem;
  background-color: #afbcb3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.acciones button:hover {
  background-color: #077807;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 95, 26, 0.2);
}

.acciones .cerrar {
  background-color: #afbcb3;
}

.acciones .cerrar:hover {
  background-color: #077807;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(176, 0, 32, 0.2);
}

.perfil {
  background-color: #e8f5e9;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 5px solid #065e06;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.5s ease-in-out;
  margin-bottom: 2rem;
}

.perfil h2 {
  color: #065e06;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.perfil p {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #333;
}

.perfil strong {
  color: #065e06;
}

/* Animación */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style>
/* Fondo degradado global */
html, body {
  background: linear-gradient(135deg, #31918c 0%, #624a52 100%);
  font-family: 'Segoe UI', sans-serif;
}
</style>
