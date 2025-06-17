<template>
  <div class="register-container">
    <h2>CREA TU CUENTA</h2>
    <p>POR FAVOR, COMPLETA LOS SIGUIENTES CAMPOS PARA REGISTRARSE.</p>

    <form @submit.prevent="handleRegister" class="form">
      <div class="form-group">
          <label for="rut">RUT</label>
          <input
  id="rut"
  v-model="rut"
  @input="formatearRut"
  type="text"
  placeholder="12.345.678-9"
  maxlength="12"
  required
/>

        </div>

      <div class="form-group">
        <label for="nombre">NOMBRE COMPLETO:</label>
        <input id="nombre" v-model="nombre" type="text" placeholder="Tu nombre" required />
      </div>

      <div class="form-group">
        <label for="email">CORREO ELECTRÓNICO:</label>
        <input id="email" v-model="email" type="email" placeholder="tucorreo@ejemplo.com" required />
      </div>

      <div class="form-group">
        <label for="password">CONTRASEÑA:</label>
        <input id="password" v-model="password" type="password" placeholder="••••••••" required />
      </div>

      <div class="form-group">
        <label for="genero">GÉNERO:</label>
        <select id="genero" v-model="genero" required>
          <option value="" disabled selected>Selecciona una opción</option>
          <option value="femenino">Femenino</option>
          <option value="masculino">Masculino</option>
          <option value="otro">Otro</option>
          <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
        </select>
      </div>

      <div class="form-group">
        <label for="fechaNacimiento">FECHA DE NACIMIENTO:</label>
        <input id="fechaNacimiento" v-model="fechaNacimiento" type="date" required />
      </div>

      <div class="form-group">
        <label for="telefono">TELÉFONO:</label>
        <input id="telefono" v-model="telefono" type="tel" placeholder="+56912345678" required />
      </div>

   

      <div class="form-group">
        <button type="submit">REGISTRARSE</button>
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>

    <div class="volver-login">
      <p>¿YA TIENES CUENTA?</p>
      <button @click="irAlLogin" class="btn-volver">INICIAR SESIÓN</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { ref } from 'vue'

const rut = ref('')

const formatearRut = () => {
  let valor = rut.value.replace(/\./g, '').replace(/-/g, '').replace(/[^\dkK]/g, '').toUpperCase()

  if (valor.length <= 1) {
    rut.value = valor
    return
  }

  const cuerpo = valor.slice(0, -1)
  const dv = valor.slice(-1)

  let cuerpoFormateado = ''
  let contador = 0

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    cuerpoFormateado = cuerpo[i] + cuerpoFormateado
    contador++
    if (contador === 3 && i !== 0) {
      cuerpoFormateado = '.' + cuerpoFormateado
      contador = 0
    }
  }

  rut.value = `${cuerpoFormateado}-${dv}`
}


const nombre = ref('')
const email = ref('')
const password = ref('')
const genero = ref('')
const fechaNacimiento = ref('')
const telefono = ref('')
const rol = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleRegister = async () => {
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

  if (!telefono.value.startsWith('+')) {
    errorMessage.value = 'El teléfono debe comenzar con el código del país (ej: +56)'
    return
  }

  const userData = {
    rut: rut.value,
    nombre: nombre.value,
    email: email.value,
    password: password.value,
    genero: genero.value,
    fechaNacimiento: fechaNacimiento.value,
    telefono: telefono.value,
    rol: rol.value
  }

  try {
    const response = await fetch('http://localhost:3001/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) throw new Error('Error al registrar usuario')

    console.log('Usuario guardado en JSON Server')
    router.push('/')
  } catch (error) {
    console.error('Error:', error)
    errorMessage.value = 'Error al guardar los datos'
  }
}

const irAlLogin = () => {
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
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

h2 {
  margin-bottom: 0.5rem;
  color: #065e06;
  font-weight: bold;
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
  color: #065e06;
}

input,
select {
  width: 94%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

input:focus,
select:focus {
  border-color: #007722;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 119, 34, 0.2);
}

button {
  width: 100%;
  padding: 10px;
  background: #007722;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

button:hover {
  background: #005f1a;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 119, 34, 0.2);
}

.error {
  color: #d32f2f;
  margin-top: 8px;
  font-weight: bold;
  animation: shake 0.5s ease-in-out;
}

.volver-login {
  margin-top: 20px;
  text-align: center;
}

.btn-volver {
  background: transparent;
  border: 1px solid #007722;
  color: #007722;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-volver:hover {
  background: #007722;
  color: #fff;
  transform: scale(1.05);
}
</style>
