<!-- src/components/ui/botones/boton-panico/BotonPanico.vue -->
<template>
  <div :class="$style.botonPanico">
    <button @click="activarPanico" :disabled="enviado" :class="$style.boton">
      🚨 BOTÓN DE PÁNICO
    </button>
    <p v-if="enviado" :class="$style.mensaje">
      ¡Alerta enviada! Personal médico ha sido notificado.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const enviado = ref(false);

function activarPanico() {
  console.warn(
    "🚨 ¡Botón de pánico activado! Enviar notificación al backend o servicio médico."
  );
  enviado.value = true;

  // Simulación de reseteo del botón tras 10 segundos
  setTimeout(() => {
    enviado.value = false;
  }, 10000);
}
</script>

<style module src="./BotonPanico.module.scss" lang="scss" />
