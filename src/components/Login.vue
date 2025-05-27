<template>
  <div class="login-container">
    <h2>Bienvenid@</h2>
    <h2>Inicia Tu Sesión</h2>
    <p>Por favor, ingresa tu RUT y contraseña para acceder al sistema de monitoreo.</p>

    <form @submit.prevent="handleLogin" class="form">
      <div class="form-group">
        <label for="rut">RUT:</label>
        <input
          id="rut"
          v-model="rut"
          type="text"
          placeholder="12.345.678-9"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>

      <div class="form-group">
        <button type="submit">Ingresar</button>
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>

    <div class="registro-opcion">
      <p>¿No tienes cuenta?</p>
      <button @click="irARegistro" class="btn-registro">Regístrate</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const rut = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

// Observa el RUT y lo formatea automáticamente
watch(rut, (nuevoRut, anteriorRut) => {
  if (nuevoRut.length >= anteriorRut.length) {
    rut.value = formatRut(nuevoRut)
  }
})

const handleLogin = () => {
  if (!validateRut(rut.value)) {
    errorMessage.value = 'RUT inválido'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  // Simulamos login correcto
  if (rut.value === '12.345.678-9' && password.value === '123456') {
    router.push('/dashboard')
  } else {
    errorMessage.value = 'Credenciales incorrectas'
  }
}

const irARegistro = () => {
  router.push('/register')
}

// Valida formato básico de RUT
function validateRut(rut: string): boolean {
  return /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/.test(rut)
}

// Formatea el RUT como 12.345.678-9
function formatRut(rut: string): string {
  const limpio = rut.replace(/[^\dkK]/g, '').toUpperCase()

  if (limpio.length <= 1) return limpio

  const cuerpo = limpio.slice(0, -1)
  const dv = limpio.slice(-1)

  let formateado = ''
  for (let i = cuerpo.length; i > 0; i -= 3) {
    const inicio = Math.max(i - 3, 0)
    const grupo = cuerpo.slice(inicio, i)
    formateado = grupo + (formateado ? '.' + formateado : '')
  }

  return `${formateado}-${dv}`
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
  color: #333;
  text-align: center;
}

h2 {
  margin-bottom: 0.5rem;
  color: #d32f2f;
}

p {
  font-size: 0.95rem;
  color: #555;
}

.form-group {
  margin-bottom: 16px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
}

button {
  width: 100%;
  padding: 10px;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.3s ease;
}

button:hover {
  background: #c62828;
}

.error {
  color: #d32f2f;
  margin-top: 8px;
  font-weight: bold;
}

.registro-opcion {
  margin-top: 20px;
  text-align: center;
}

.btn-registro {
  background: transparent;
  border: 1px solid #e53935;
  color: #e53935;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-registro:hover {
  background: #e53935;
  color: white;
}
</style>
