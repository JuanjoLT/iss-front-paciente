<template>
  <div :class="$style.profileView">
    <div :class="$style.cardContainer">
      <h2 class="text-center text-success mb-4">Perfil del paciente</h2>
      <hr />

      <CardMiPerfil :paciente="paciente" :show="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CardMiPerfil from "@/components/ui/card/mi-perfil/CardMiPerfil.vue";
import $style from "./PerfilPaciente.module.scss";

const paciente = ref({
  nombre: "Juan Pérez",
  rut: "12.345.678-9",
  email: "juan.perez@ejemplo.com",
  genero: "Masculino",
  fechaNacimiento: "1978-04-12",
  telefono: "+56 9 1234 5678",
});
</script>
