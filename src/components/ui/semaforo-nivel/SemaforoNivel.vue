<template>
  <div :class="$style.semaforo">
    <h2 :class="$style.header">
      Estado de Salud
      <span :class="$style.icono">{{ icono }}</span>
    </h2>

    <div
      :class="[$style.circulo, $style[colorSemaforo]]"
      aria-hidden="true"
    ></div>
    <p :class="$style.mensaje" role="status">{{ mensaje }}</p>
  </div>
</template>

<style module src="./SemaforoNivel.module.scss" lang="scss"/>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import style from "./SemaforoNivel.module.scss";

interface Props {
  sintomas: {
    [key: string]: string;
  };
}

const props = defineProps<Props>();

const puntaje = computed(() => {
  let total = 0;

  for (const [clave, valor] of Object.entries(props.sintomas)) {
    const valorNumerico = parseFloat(valor);

    if (!isNaN(valorNumerico)) {
      // Síntomas numéricos
      if (clave.includes("temperatura")) {
        if (valorNumerico >= 38.0) total += 3;
        else if (valorNumerico >= 37.0) total += 2;
        else total += 1;
      } else if (clave.includes("saturacion")) {
        if (valorNumerico < 90) total += 3;
        else if (valorNumerico < 95) total += 2;
        else total += 1;
      } else if (clave.includes("frecuencia")) {
        if (valorNumerico >= 120 || valorNumerico <= 40) total += 3;
        else if (valorNumerico >= 100 || valorNumerico <= 50) total += 2;
        else total += 1;
      } else {
        total += 1; // Valor numérico desconocido, leve por defecto
      }
    } else {
      // Síntomas tipo nivel
      if (valor === "Leve") total += 1;
      else if (valor === "Moderado") total += 2;
      else if (valor === "Grave") total += 3;
    }
  }

  return total;
});

const colorSemaforo = computed(() => {
  if (puntaje.value <= 4) return "verde";
  if (puntaje.value <= 8) return "amarillo";
  return "rojo";
});

const mensaje = computed(() => {
  switch (colorSemaforo.value) {
    case "verde":
      return "Estado leve. Continúe monitoreando su salud.";
    case "amarillo":
      return "Estado moderado. Manténgase alerta a los síntomas.";
    case "rojo":
      return "Estado grave. Se recomienda contactar asistencia médica.";
    default:
      return "";
  }
});

const icono = computed(() => {
  switch (colorSemaforo.value) {
    case "verde":
      return "🟢";
    case "amarillo":
      return "🟡";
    case "rojo":
      return "🔴";
    default:
      return "";
  }
});
</script>
  