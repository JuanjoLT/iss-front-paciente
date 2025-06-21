<!-- src/components/ui/header/Header.vue -->
<template>
  <header :class="$style.headerContainer">
    <div :class="$style.innerWrapper">
      <!-- Breadcrumb -->
      <nav :class="$style.breadcrumb" aria-label="breadcrumb">
        <RouterLink to="/dashboard" :class="$style.breadcrumbLink">
          Monitoreo
        </RouterLink>
        <span :class="$style.breadcrumbSeparator">/</span>
        <span :class="$style.breadcrumbCurrent">{{ currentLabel }}</span>
      </nav>

      <!-- Botón de Pánico -->
      <BotonPanico />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import BotonPanico from "@/components/ui/botones/boton-panico/BotonPanico.vue";

const route = useRoute();

// Mapea rutas a etiquetas legibles
const labelMap: Record<string, string> = {
  "/dashboard": "Monitoreo",
  "/historial": "Historial",
  "/perfil-paciente": "Perfil Paciente",
  // agrega más si tienes otras rutas…
};

const currentLabel = computed(() => {
  // Si la ruta tiene params, podrías mostrar un ID o texto distinto:
  return labelMap[route.path] || "Página";
});
</script>
<style module src="./Header.module.scss" lang="scss" />
