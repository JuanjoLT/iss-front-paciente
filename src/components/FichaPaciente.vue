<template>
  <div>
    <h2>Ficha del Paciente</h2>
    <p><strong>Nombre:</strong> {{ store.nombre }}</p>
    <p><strong>RUT:</strong> {{ store.rut }}</p>
    <p><strong>Último puntaje:</strong> {{ store.puntajeTotal }}</p>
  </div>
</template>

<script setup lang="ts">
import { usePacienteStore } from '@/store/paciente'

const store = usePacienteStore()
</script>
