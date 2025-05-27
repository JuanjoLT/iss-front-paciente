<template>
  <div class="formulario-sintomas">
    <h2>Formulario de Síntomas</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="tos">Tos</label>
        <select v-model="sintomas.tos" id="tos" required>
          <option value="leve">Leve</option>
          <option value="moderado">Moderado</option>
          <option value="grave">Grave</option>
        </select>
      </div>

      <div class="form-group">
        <label for="fiebre">Fiebre</label>
        <select v-model="sintomas.fiebre" id="fiebre" required>
          <option value="leve">Leve</option>
          <option value="moderado">Moderado</option>
          <option value="grave">Grave</option>
        </select>
      </div>

      <div class="form-group">
        <label for="dolorMuscular">Dolor Muscular</label>
        <select v-model="sintomas.dolorMuscular" id="dolorMuscular" required>
          <option value="leve">Leve</option>
          <option value="moderado">Moderado</option>
          <option value="grave">Grave</option>
        </select>
      </div>

      <button type="submit">Enviar Síntomas</button>
    </form>

    <HistorialSintomas />

    <!-- Modal de confirmación -->
    <div class="modal" v-if="mostrarModal">
      <div class="modal-contenido">
        <h3>✅ Registro exitoso</h3>
        <p>{{ mensajeAlerta }}</p>
        <button @click="cerrarModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HistorialSintomas from './HistorialSintomas.vue'

// Estado de los síntomas
const sintomas = ref({
  tos: 'leve',
  fiebre: 'leve',
  dolorMuscular: 'leve'
})

// Modal
const mostrarModal = ref(false)
const mensajeAlerta = ref('')

// Función para obtener nivel de alerta
const generarMensajeAlerta = () => {
  const niveles = Object.values(sintomas.value)
  if (niveles.includes('grave')) {
    return '⚠️ Algunos síntomas son graves. Se recomienda atención médica inmediata.'
  } else if (niveles.includes('moderado')) {
    return '🔔 Algunos síntomas son moderados. Se recomienda reposo y observación.'
  } else {
    return '🟢 Todos los síntomas son leves. Continúe monitoreando su salud.'
  }
}

// Enviar formulario
const submitForm = () => {
  const nuevoRegistro = {
    fecha: new Date().toLocaleDateString(),
    sintomas: { ...sintomas.value }
  }

  const historial = localStorage.getItem('historialSintomas')
  const historialParsed = historial ? JSON.parse(historial) : []
  historialParsed.push(nuevoRegistro)
  localStorage.setItem('historialSintomas', JSON.stringify(historialParsed))

  // Mensaje de alerta y mostrar modal
  mensajeAlerta.value = generarMensajeAlerta()
  mostrarModal.value = true

  // Reset form
  sintomas.value = {
    tos: 'leve',
    fiebre: 'leve',
    dolorMuscular: 'leve'
  }
}

// Cerrar modal
const cerrarModal = () => {
  mostrarModal.value = false
}
</script>

<style scoped>
.formulario-sintomas {
  background-color: #790c0c;
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 1rem;
  position: relative;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #fff;
}

select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #fe0000;
}

button {
  background-color: #c9ba18;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #d78111;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-contenido {
  background-color: #da5c5c;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.modal-contenido h3 {
  margin-bottom: 1rem;
  color: #180301;
}

.modal-contenido p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.modal-contenido button {
  background-color: #b40000;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
