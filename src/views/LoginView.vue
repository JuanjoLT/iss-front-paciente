<template>
  <div class="login">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="rut" placeholder="RUT" />
      <input type="password" v-model="password" placeholder="Contraseña" />
      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const rut = ref('')
const password = ref('')
const router = useRouter()

function handleLogin() {
  if (rut.value && password.value) {
    router.push('/panel')
  }
}
</script>
