<template>
  <div :class="$style.profileView">
    <div :class="$style.cardContainer">
      <h2 class="text-center text-success mb-4">Perfil del paciente</h2>
      <hr />

      <CardMiPerfil
        v-if="paciente"
        :paciente="{
          ...paciente,
          fechaNacimientoFormateada: formatearFecha(paciente.fechaNacimiento)
        }"
        :show="true"
      />
      <div v-else class="text-center text-muted">Cargando perfil...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import CardMiPerfil from "@/components/ui/card/mi-perfil/CardMiPerfil.vue";
import $style from "./PerfilPaciente.module.scss";

interface Paciente {
  id: string;
  rut: string;
  nombre: string;
  email: string;
  genero: string;
  fechaNacimiento: string;
  telefono: string;
  rol: string;
  fechaNacimientoFormateada?: string; // opcional para pasar la fecha formateada
}

const paciente = ref<Paciente | null>(null);

const formatearFecha = (fechaISO: string) => {
  if (!fechaISO) return "";
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

onMounted(async () => {
  try {
    const id = localStorage.getItem("usuarioId"); // O la clave que estés usando
    if (!id) {
      console.error("ID de usuario no encontrado en la sesión.");
      return;
    }

    const resp = await axios.get(`http://localhost:3001/usuarios/${id}`);
    paciente.value = resp.data;
  } catch (error) {
    console.error("Error al cargar datos del paciente:", error);
  }
});
</script>
