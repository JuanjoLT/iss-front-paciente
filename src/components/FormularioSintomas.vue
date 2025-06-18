<template>
  <div class="formulario-sintomas">
    <h2>Formulario de Síntomas</h2>

    <div class="acciones-globales">
      <button type="button" @click="seleccionarTodos">Seleccionar todos</button>
      <button type="button" @click="limpiarTodos">Limpiar todos</button>
    </div>

    <form @submit.prevent="submitForm">
      <table class="tabla-sintomas">
        <thead>
          <tr>
            <th>Seleccionar</th>
            <th>Síntoma</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(estado, nombre) in sintomas" :key="nombre">
            <td><input type="checkbox" v-model="estado.activo" /></td>
            <td>{{ formatearNombre(nombre) }}</td>
            <td>
              <template v-if="estado.activo">
                <select
                  v-if="estado.tipo === 'nivel'"
                  v-model="estado.valor"
                  required
                >
                  <option value="Leve">Leve</option>
                  <option value="Moderado">Moderado</option>
                  <option value="Grave">Grave</option>
                </select>

                <input
                  v-else-if="estado.tipo === 'numerico'"
                  type="number"
                  v-model="estado.valor"
                  placeholder="Ingresa valor"
                  required
                />
              </template>
            </td>
          </tr>
        </tbody>
      </table>

      <button type="submit">Enviar Síntomas</button>
    </form>

    <HistorialSintomas />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import HistorialSintomas from './HistorialSintomas.vue'
import sintomas from '@/components/mocks/data/sintomas.js'


const formatearNombre = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())

const seleccionarTodos = () => {
  for (const clave in sintomas.value) {
    sintomas.value[clave].activo = true
  }
}

const limpiarTodos = () => {
  for (const clave in sintomas.value) {
    sintomas.value[clave].activo = false
    sintomas.value[clave].valor =
      sintomas.value[clave].tipo === 'nivel' ? 'Leve' : ''
  }
}

const submitForm = async () => {
  const sintomasReportados: Record<string, string> = {}

  for (const clave in sintomas.value) {
    const sintoma = sintomas.value[clave]
    if (sintoma.activo && sintoma.valor !== '') {
      sintomasReportados[clave] = sintoma.valor
    }
  }

  const nuevoRegistro = {
    fecha: new Date().toLocaleString(),
    sintomas: sintomasReportados
  }

  try {
    await axios.post('http://localhost:3001/registros', nuevoRegistro)
    limpiarTodos()
  } catch (error) {
    console.error('Error al guardar síntomas:', error)
  }
}
</script>

<style scoped>
.formulario-sintomas {
  background-color: #f1f8e9;
  border-radius: 1rem;
  margin-top: 1rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
  width: 100%;
  max-width: 600px;
  min-width: 280px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

@media (max-width: 650px) {
  .formulario-sintomas {
    padding: 1rem;
    max-width: 98vw;
  }
}

h2 {
  color: #2e7d32;
  margin-bottom: 1.5rem;
  text-align: center;
}

.acciones-globales {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.acciones-globales button {
  background-color: #a5d6a7;
  color: #1b5e20;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.acciones-globales button:hover {
  background-color: #81c784;
}

.tabla-sintomas {
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

.tabla-sintomas th,
.tabla-sintomas td {
  border: 1px solid #c8e6c9;
  padding: 0.75rem;
  text-align: left;
}

.tabla-sintomas th {
  background-color: #a5d6a7;
  color: #1b5e20;
}

.tabla-sintomas td select,
.tabla-sintomas td input[type='number'] {
  width: 100%;
  padding: 0.3rem;
  border-radius: 0.3rem;
  border: 1px solid #a5d6a7;
}

button[type='submit'] {
  background-color: #4caf50;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  display: block;
  margin: 0 auto;
}

button[type='submit']:hover {
  background-color: #388e3c;
}
</style>

<!-- test -->