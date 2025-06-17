<template>
  <div v-if="paciente">
    <h2>Ficha del Paciente</h2>
    <p><strong>Nombre:</strong> {{ paciente.nombre }}</p>
    <p><strong>RUT:</strong> {{ paciente.rut }}</p>
    <p><strong>Email:</strong> {{ paciente.email }}</p>
    <p><strong>Género:</strong> {{ paciente.genero }}</p>
    <p><strong>Fecha de Nacimiento:</strong> {{ paciente.fechaNacimiento }}</p>
    <p><strong>Teléfono:</strong> {{ paciente.telefono }}</p>
    <p><strong>Rol:</strong> {{ paciente.rol }}</p>
  </div>
  <div v-else>
    <p>Cargando datos del paciente...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Paciente = {
  id: string
  rut: string
  nombre: string
  email: string
  password: string
  genero: string
  fechaNacimiento: string
  telefono: string
  rol: string
}

const paciente = ref<Paciente | null>(null)

onMounted(async () => {
  // Obtener el RUT del usuario logueado (por ejemplo guardado en localStorage)
  const rutGuardado = localStorage.getItem('usuarioLogueado')

  if (rutGuardado) {
    try {
      // Asume que tienes un backend o json-server corriendo en esta URL
      const response = await fetch('http://localhost:3001/usuarios')
      const usuarios: Paciente[] = await response.json()

      // Buscar el usuario que coincida con el RUT guardado
      const encontrado = usuarios.find(u => u.rut === rutGuardado)

      if (encontrado) {
        paciente.value = encontrado
      }
    } catch (error) {
      console.error('Error al cargar los datos del paciente:', error)
    }
  }
})
</script>
