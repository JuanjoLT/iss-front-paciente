<template>
  <div :class="$style.wrapper">
    <div :class="$style.cardContainer">
      <h2 class="text-center text-success mb-4">Historial de Síntomas</h2>

      <div v-if="!registroHoy" class="alert alert-warning text-center">
        No has registrado tus síntomas hoy. Recuerda hacerlo diariamente.
      </div>

      <b-button
        v-if="historial.length"
        variant="success"
        class="d-block mx-auto mb-3"
        @click="borrarHistorial"
      >
        Borrar historial
      </b-button>

      <div v-if="!historial.length" class="text-center text-muted">
        No tienes registros anteriores.
      </div>

      <b-table
        v-else
        :items="tablaItems"
        :fields="fields"
        responsive="sm"
        striped
        bordered
        small
      >
        <!-- Columna Síntomas: listamos clave:valor -->
        <template #cell(sintomas)="row">
          <ul :class="style.sintomaLista">
            <li
              v-for="(valor, nombre) in row.item.sintomas"
              :key="nombre"
              :class="style.sintomaItem"
            >
              <span :class="style.sintomaNombre">{{
                formatearNombre(nombre)
              }}</span
              >: {{ valor }}
            </li>
          </ul>
        </template>

        <!-- Columna Estado: renderizamos el SemaforoNivel -->
        <template #cell(estado)="row">
          <SemaforoAlerta :sintomas="row.item.sintomas" />
        </template>
      </b-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { BTable, BButton } from "bootstrap-vue-3";
import SemaforoAlerta from "@/components/ui/semaforo-nivel/SemaforoNivel.vue";
import style from "./HistorialSintomas.module.scss";

interface RegistroSintomas {
  id: number;
  fecha: string;
  sintomas: Record<string, string>;
}

const historial = ref<RegistroSintomas[]>([]);
const registroHoy = ref(false);

const formatearNombre = (str: string | number) => {
  const s = String(str);
  return s.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
};

onMounted(async () => {
  const resp = await axios.get("http://localhost:3001/registros");
  historial.value = resp.data;
  const hoy = new Date().toLocaleDateString();
  registroHoy.value = historial.value.some(
    (r) => new Date(r.fecha).toLocaleDateString() === hoy
  );
});

const borrarHistorial = async () => {
  for (const r of historial.value) {
    await axios.delete(`http://localhost:3001/registros/${r.id}`);
  }
  historial.value = [];
  registroHoy.value = false;
};

// Items y definición de columnas para <b-table>
const tablaItems = computed(() => historial.value);
const fields = [
  { key: "fecha", label: "Fecha" },
  { key: "sintomas", label: "Síntomas" },
  { key: "estado", label: "Estado" },
];
</script>

<style module src="./HistorialSintomas.module.scss" lang="scss" />
