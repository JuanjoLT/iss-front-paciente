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

