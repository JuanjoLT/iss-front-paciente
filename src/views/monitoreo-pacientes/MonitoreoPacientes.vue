<!-- src/views/monitoreo-pacientes/MonitoreoPacientes.vue -->
<template>
  <div :class="$style.wrapper">
    <div :class="$style.cardContainer">
      <h2 class="text-center text-success mb-4">Formulario sintomas</h2>
      <hr />

      <TablaSintomas
        :sintomas="sintomas"
        @select-all="seleccionarTodos"
        @clear-all="limpiarTodos"
        @submit="submitForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import TablaSintomas from "@/components/ui/tablas/TablaSintomas.vue";
import sintomasData from "@/components/mocks/data/sintomas.js";
import $style from "./MonitoreoPacientes.module.scss";

interface Sintoma {
  activo: boolean;
  tipo: "nivel" | "numerico";
  valor: string;
}

const sintomas = ref<Record<string, Sintoma>>(sintomasData.value);

/** Marca todos como activos */
function seleccionarTodos() {
  Object.values(sintomas.value).forEach((s) => (s.activo = true));
}

/** Limpia todos y resetea valor */
function limpiarTodos() {
  Object.values(sintomas.value).forEach((s) => {
    s.activo = false;
    s.valor = s.tipo === "nivel" ? "Leve" : "";
  });
}

/** Envía al backend */
async function submitForm() {
  const report: Record<string, string> = {};
  for (const [clave, s] of Object.entries(sintomas.value)) {
    if (s.activo && s.valor) report[clave] = s.valor;
  }

  try {
    await axios.post("http://localhost:3001/registros", {
      fecha: new Date().toLocaleString(),
      sintomas: report,
    });
    limpiarTodos();
  } catch (e) {
    console.error("Error al guardar síntomas:", e);
  }
}
</script>
