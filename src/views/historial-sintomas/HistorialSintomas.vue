<template>
  <div :class="$style.wrapper">
    <div :class="$style.cardContainer">
      <h2 class="text-center text-success mb-4">Historial de Síntomas</h2>

      <div v-if="!registroHoy" class="alert alert-warning text-center">
        No has registrado tus síntomas hoy. Recuerda hacerlo diariamente.
      </div>

      <!-- <b-button
        v-if="historial.length"
        variant="success"
        class="d-block mx-auto mb-3"
        @click="borrarHistorial"
      >
        Borrar historial
      </b-button> -->

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
          <ul :class="$style.sintomaLista">
            <li
              v-for="(valor, nombre) in row.item.sintomas"
              :key="nombre"
              :class="$style.sintomaItem"
            >
              <span :class="$style.sintomaNombre">{{
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
import SemaforoAlerta from "@ui/semaforo-nivel/SemaforoNivel.vue";


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

  // Ordenamos por fecha (más reciente primero)
  historial.value = resp.data.sort((a: RegistroSintomas, b: RegistroSintomas) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return fechaA.getTime() - fechaB.getTime(); // ascendente
  });

  const hoy = new Date();
  const diaHoy = hoy.getDate();
  const mesHoy = hoy.getMonth() + 1;
  const anioHoy = hoy.getFullYear();

  registroHoy.value = historial.value.some((r) => {
    const partesFecha = r.fecha.split(",")[0].split("/");
    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10);
    const anio = parseInt(partesFecha[2], 10);

    return dia === diaHoy && mes === mesHoy && anio === anioHoy;
  });
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
