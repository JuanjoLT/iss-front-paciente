<template>
  <div class="fullscreen-wrapper">
    <div class="login-container">
      <img src="@/assets/logo-uoh.png" alt="Logo UOH" class="logo" />

      <h1>Bienvenid@</h1>
      <h2>Inicia tu sesión</h2>
      <p>Por favor, ingresa tu RUT y contraseña para acceder al sistema de monitoreo.</p>

      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label for="rut">RUT</label>
          <input
            id="rut"
            v-model="rut"
            type="text"
            placeholder="12.345.678-9"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const rut = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

watch(rut, (nuevo, anterior) => {
  if (nuevo.length >= anterior.length) {
    rut.value = formatRut(nuevo)
  }
})

async function handleLogin() {
  if (!validateRut(rut.value)) {
    errorMessage.value = 'RUT inválido'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  try {
    const response = await axios.get('http://localhost:3001/usuarios', {
      params: {
        rut: rut.value,
        password: password.value
      }
    })

    if (response.data.length > 0) {
      const usuario = response.data[0]
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuario))
      router.push('/dashboard') // o '/panel' si así está en tus rutas
    } else {
      errorMessage.value = 'Credenciales incorrectas'
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Error de conexión con el servidor'
  }
}

const irARegistro = () => {
  router.push('/register')
}

function validateRut(rut: string): boolean {
  return /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/.test(rut)
}

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
/* En Login.vue, modifica estas clases: */
.fullscreen-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Elimina el fondo del gradiente (ya está en App.vue) */
  animation: fadeIn 1s ease-in-out;
}

.login-container {
  width: 100%;
  max-width: 420px;
  padding: 32px;
  background: #ffffffee;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
  backdrop-filter: blur(10px);
  animation: slideUp 0.8s ease-out;
}

/* Opcional: Si usas un div padre como body o wrapper */
body, html {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
}

.logo {
  width: 140px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

h1 {
  font-size: 2rem;
  margin-bottom: 8px;
  color: #1a770e;
  font-weight: 700;
}

h2 {
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: #1fd74d;
}

p {
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

input {
  width: 94%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #cfbfbf;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #b2b7ba;
}

input:focus {
  border-color: #0077c2;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 119, 194, 0.2);
}

button {
  width: 100%;
  padding: 12px;
  background: #4bc72f;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #077807;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.error {
  color: #d32f2f;
  font-weight: bold;
  margin-top: 12px;
  animation: shake 0.5s ease-in-out;
}

.registro-opcion {
  margin-top: 24px;
}

.btn-registro {
  background: transparent;
  border: 2px solid #009320;
  color: #04970b;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-registro:hover {
  background: #077807;
  color: #fff;
  transform: translateY(-2px);
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes shake {
  0% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}
</style>