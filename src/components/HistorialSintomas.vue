<template>
  <div class="historial">
    <h2>Historial de Síntomas</h2>

    <div v-if="!registroHoy" class="aviso-dia">
      <p>No has registrado tus síntomas hoy. Recuerda hacerlo diariamente.</p>
    </div>

    <button class="btn-borrar" @click="borrarHistorial" v-if="historial.length > 0">
      Borrar historial
    </button>

    <div v-if="historial.length === 0" class="sin-registros">
      <p>No tienes registros anteriores.</p>
    </div>

    <div v-else>
      <ul class="historial-lista">
        <li v-for="(registro, index) in historial" :key="registro.id" class="registro">
          <h3>{{ registro.fecha }}</h3>
          <table class="tabla-historial">
            <thead>
              <tr>
                <th>Síntoma</th>
                <th>Nivel</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(valor, nombre) in registro.sintomas" :key="nombre">
                <td>{{ formatearNombre(nombre) }}</td>
                <td>{{ valor }}</td>
              </tr>
            </tbody>
          </table>
          <SemaforoAlerta :sintomas="registro.sintomas" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SemaforoAlerta from './SemaforoAlerta.vue'

interface RegistroSintomas {
  id: number
  fecha: string
  sintomas: {
    [key: string]: string
  }
}

const historial = ref<RegistroSintomas[]>([])
const registroHoy = ref(false)

const formatearNombre = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3001/registros')
    historial.value = response.data

    const hoy = new Date().toLocaleDateString()

    registroHoy.value = historial.value.some(registro => {
      const fechaRegistro = new Date(registro.fecha).toLocaleDateString()
      return fechaRegistro === hoy
    })
  } catch (error) {
    console.error('Error al cargar historial:', error)
  }
})

const borrarHistorial = async () => {
  try {
    for (const registro of historial.value) {
      await axios.delete(`http://localhost:3001/registros/${registro.id}`)
    }
    historial.value = []
    registroHoy.value = false
  } catch (error) {
    console.error('Error al borrar historial:', error)
  }
}
</script>

<style scoped>
.historial {
  padding: 1.5rem;
  margin-top: 2rem;
  background-color: #e8f5e9;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.1);
}

h2 {
  color: #2e7d32;
  margin-bottom: 1rem;
  text-align: center;
}

.aviso-dia {
  background-color: #fff3cd;
  color: #856404;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ffeeba;
  text-align: center;
}

.btn-borrar {
  background-color: #e53935;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0 auto 1rem;
  display: block;
}

.btn-borrar:hover {
  background-color: #c62828;
}

.sin-registros {
  color: #388e3c;
  font-style: italic;
  text-align: center;
}

.historial-lista {
  list-style: none;
  padding: 0;
  margin: 0;
}

.registro {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #c8e6c9;
  border-radius: 0.5rem;
  border: 1px solid #a5d6a7;
}

h3 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  color: #21cf2a;
  text-align: left;
}

.tabla-historial {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.tabla-historial th,
.tabla-historial td {
  border: 1px solid #a5d6a7;
  padding: 0.6rem;
  text-align: left;
}

.tabla-historial th {
  background-color: #a5d6a7;
  color: #1b5e20;
}
</style>
