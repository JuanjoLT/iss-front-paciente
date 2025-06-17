<template>
  <div class="semaforo">
    <h2>
      Estado de Salud
      <span class="icono">{{ icono }}</span>
    </h2>

    <div class="circulo" :class="colorSemaforo" aria-hidden="true"></div>
    <p class="mensaje" role="status">{{ mensaje }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

interface Props {
  sintomas: {
    [key: string]: string
  }
}

const props = defineProps<Props>()

const puntaje = computed(() => {
  let total = 0

  for (const [clave, valor] of Object.entries(props.sintomas)) {
    const valorNumerico = parseFloat(valor)

    if (!isNaN(valorNumerico)) {
      // Síntomas numéricos
      if (clave.includes('temperatura')) {
        if (valorNumerico >= 38.0) total += 3
        else if (valorNumerico >= 37.0) total += 2
        else total += 1
      } else if (clave.includes('saturacion')) {
        if (valorNumerico < 90) total += 3
        else if (valorNumerico < 95) total += 2
        else total += 1
      } else if (clave.includes('frecuencia')) {
        if (valorNumerico >= 120 || valorNumerico <= 40) total += 3
        else if (valorNumerico >= 100 || valorNumerico <= 50) total += 2
        else total += 1
      } else {
        total += 1 // Valor numérico desconocido, leve por defecto
      }
    } else {
      // Síntomas tipo nivel
      if (valor === 'Leve') total += 1
      else if (valor === 'Moderado') total += 2
      else if (valor === 'Grave') total += 3
    }
  }

  return total
})

const colorSemaforo = computed(() => {
  if (puntaje.value <= 4) return 'verde'
  if (puntaje.value <= 8) return 'amarillo'
  return 'rojo'
})

const mensaje = computed(() => {
  switch (colorSemaforo.value) {
    case 'verde':
      return 'Estado leve. Continúe monitoreando su salud.'
    case 'amarillo':
      return 'Estado moderado. Manténgase alerta a los síntomas.'
    case 'rojo':
      return 'Estado grave. Se recomienda contactar asistencia médica.'
    default:
      return ''
  }
})

const icono = computed(() => {
  switch (colorSemaforo.value) {
    case 'verde':
      return '🟢'
    case 'amarillo':
      return '🟡'
    case 'rojo':
      return '🔴'
    default:
      return ''
  }
})
</script>

<style scoped>
.semaforo {
  max-width: 400px;
  margin: 2rem auto;
  text-align: center;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: #e8f5e9;
  border: 1px solid #a5d6a7;
  box-shadow: 0 2px 6px rgba(0, 128, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.icono {
  font-size: 1.5rem;
}

.circulo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 1rem auto;
  border: 3px solid #ccc;
}

.verde {
  background-color: #81c784;
}

.amarillo {
  background-color: #fff176;
}

.rojo {
  background-color: #e57373;
}

.mensaje {
  font-weight: bold;
  font-size: 1.1rem;
  color: #2e7d32;
}
</style>
