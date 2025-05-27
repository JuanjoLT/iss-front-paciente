<template>
  <div class="register-container">
    <h2>Crea tu cuenta</h2>
    <p>Por favor, completa los siguientes campos para registrarte.</p>

    <form @submit.prevent="handleRegister" class="form">
      <div class="form-group">
        <label for="rut">RUT:</label>
        <input id="rut" v-model="rut" type="text" placeholder="12.345.678-9" required />
      </div>

      <div class="form-group">
        <label for="nombre">Nombre completo:</label>
        <input id="nombre" v-model="nombre" type="text" placeholder="Tu nombre" required />
      </div>

      <div class="form-group">
        <label for="email">Correo electrónico:</label>
        <input id="email" v-model="email" type="email" placeholder="tucorreo@ejemplo.com" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input id="password" v-model="password" type="password" placeholder="••••••••" required />
      </div>

      <div class="form-group">
        <button type="submit">Registrarse</button>
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>

    <div class="volver-login">
      <p>¿Ya tienes cuenta?</p>
      <button @click="irAlLogin" class="btn-volver">Iniciar sesión</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const rut = ref('')
const nombre = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleRegister = () => {
  if (!validateRut(rut.value)) {
    errorMessage.value = 'RUT inválido'
    return
  }

  if (!validateEmail(email.value)) {
    errorMessage.value = 'Correo electrónico inválido'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  // Aquí podrías guardar en localStorage o llamar a una API
  // Simulación de registro exitoso:
  console.log('Usuario registrado:', { rut: rut.value, nombre: nombre.value, email: email.value })
  router.push('/login')
}

function irAlLogin() {
  router.push('/')
}

function validateRut(rut: string): boolean {
  return /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/.test(rut)
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
</script>

<style scoped>
.register-container {
  max-width: 420px;
  margin: 40px auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(188, 55, 55, 0.1);
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
}

h2 {
  margin-bottom: 0.5rem;
  color: #b93a36;
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
  background: #e35c55;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.3s ease;
}

button:hover {
  background: #aa2323;
}

.error {
  color: #d32f2f;
  margin-top: 8px;
  font-weight: bold;
}

.volver-login {
  margin-top: 20px;
  text-align: center;
}

.btn-volver {
  background: transparent;
  border: 1px solid #e02020;
  color: #aa2429;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-volver:hover {
  background: #b31818;
  color: white;
}
</style>
