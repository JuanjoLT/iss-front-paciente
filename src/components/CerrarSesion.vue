<template>
  <div class="flex justify-end mb-4">
    <button
      @click="cerrarSesion"
      class="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
    >
      🔓 Cerrar Sesión
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const cerrarSesion = (): void => {
  // Limpia cualquier token o estado de sesión
  localStorage.removeItem('token')

  // Redirige al login
  router.push('/login')
}
</script>
