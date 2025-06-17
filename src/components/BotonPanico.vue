<template>
  <div class="boton-panico">
    <button @click="activarPanico" :disabled="enviado" class="boton">
      🚨 BOTÓN DE PÁNICO
    </button>
    <p v-if="enviado" class="mensaje">¡Alerta enviada! Personal médico ha sido notificado.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const enviado = ref(false)

function activarPanico() {
  console.warn('🚨 ¡Botón de pánico activado! Enviar notificación al backend o servicio médico.')
  enviado.value = true

  // Simulación de reseteo del botón tras 10 segundos
  setTimeout(() => {
    enviado.value = false
  }, 10000)
}
</script>

<style scoped>
.boton-panico {
  margin: 2rem auto;
  text-align: center;
}
.boton {
  padding: 1rem 2rem;
  background-color: rgb(251, 0, 0);
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
}
.boton-panico button:hover {
  background-color: #cd3544;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 95, 26, 0.2);
}
.boton:disabled {
  background-color: #670303;
  cursor: not-allowed;
}


.mensaje {
  margin-top: 1rem;
  color: #ff0000;
  font-weight: bold;
}
</style>
