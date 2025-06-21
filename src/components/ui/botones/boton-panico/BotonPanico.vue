<!-- src/components/ui/botones/boton-panico/BotonPanico.vue -->
<template>
  <div :class="$style.botonPanico">
    <button @click="activarPanico" :disabled="enviado" :class="$style.boton">
      🚨 BOTÓN DE PÁNICO
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

const enviado = ref(false);
const toast = useToast();

function activarPanico() {
  if (enviado.value) return;
  enviado.value = true;

  toast.success("¡Alerta enviada! Personal médico ha sido notificado.", {
    position: "top-right",
    duration: 8000,
    dismissible: true,
  });

  setTimeout(() => {
    enviado.value = false;
  }, 10000);
}
</script>

<style module src="./BotonPanico.module.scss" lang="scss" />
