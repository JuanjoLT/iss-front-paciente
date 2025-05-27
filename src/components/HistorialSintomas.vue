<template>
  <div class="historial">
    <h2>📝 Historial de Síntomas</h2>

    <p v-if="historial.length > 0" class="conteo">Total de registros: {{ historial.length }}</p>
    <button v-if="historial.length > 0" @click="borrarHistorial" class="btn-borrar">
      🗑 Borrar Historial
    </button>

    <div v-if="historial.length === 0" class="sin-registros">
      <p>No tienes registros anteriores.</p>
    </div>

    <div v-else>
      <ul class="registro-lista">
        <li v-for="(registro, index) in historial" :key="index" class="registro">
          <h3>{{ registro.fecha }}</h3>
          <div class="sintomas-lista">
            <p v-for="(valor, clave) in registro.sintomas" :key="clave">
              <strong>{{ clave }}:</strong> {{ valor }}
            </p>
          </div>
          <SemaforoAlerta :sintomas="registro.sintomas" />
        </li>
      </ul>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido">
        <p>✅ Registro guardado con éxito</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import SemaforoAlerta from './SemaforoAlerta.vue'

interface RegistroSintomas {
  fecha: string
  sintomas: {
    [key: string]: string
  }
}

// Props
const props = defineProps<{
  nuevoRegistro: RegistroSintomas | null
}>()

const historial = ref<RegistroSintomas[]>([])
const mostrarModal = ref(false)

onMounted(() => {
  const registrosGuardados = localStorage.getItem('historialSintomas')
  if (registrosGuardados) {
    historial.value = JSON.parse(registrosGuardados).sort(
      (a: RegistroSintomas, b: RegistroSintomas) =>
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    )
  }
})

// Detecta nuevo registro y lo muestra
watch(
  () => props.nuevoRegistro,
  (nuevo) => {
    if (nuevo) {
      historial.value.unshift(nuevo)
      mostrarModal.value = true
      setTimeout(() => {
        mostrarModal.value = false
      }, 3000)
    }
  }
)

const borrarHistorial = () => {
  if (confirm('¿Estás seguro de que deseas borrar todo el historial?')) {
    localStorage.removeItem('historialSintomas')
    historial.value = []
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.historial {
  font-family: 'Roboto', sans-serif;
  padding: 2rem;
  max-width: 700px;
  margin: 3rem auto;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  color: #333;
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #b20000;
}

.conteo {
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: #555;
}

.btn-borrar {
  background-color: #e53935;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  margin-bottom: 1.5rem;
}

.btn-borrar:hover {
  background-color: #c62828;
}

.sin-registros p {
  font-size: 1rem;
  color: #777;
}

.registro-lista {
  list-style: none;
  padding: 0;
  margin: 0;
}

.registro {
  background-color: #fcebea;
  border-left: 6px solid #e53935;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.2rem;
  text-align: left;
  transition: transform 0.2s ease;
}

.registro:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
}

h3 {
  font-size: 1.1rem;
  color: #d32f2f;
  margin-bottom: 0.6rem;
}

.sintomas-lista p {
  margin: 0.3rem 0;
  font-size: 0.95rem;
}

.sintomas-lista strong {
  color: #000;
}

/* Modal */
.modal {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #e0ffe0;
  color: #2e7d32;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  animation: aparecer 0.3s ease-out;
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
</style>
