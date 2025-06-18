import { ref } from "vue";

const sintomas = ref({
  tos: { activo: false, valor: "Leve", tipo: "nivel" },
  fiebre: { activo: false, valor: "Leve", tipo: "nivel" },
  temperatura: { activo: false, valor: "", tipo: "numerico" },
  frecuenciaCardiaca: { activo: false, valor: "", tipo: "numerico" },
  saturacionOxigeno: { activo: false, valor: "", tipo: "numerico" },
  dolorCabeza: { activo: false, valor: "Leve", tipo: "nivel" },
  dificultadRespirar: { activo: false, valor: "Leve", tipo: "nivel" },
  fatiga: { activo: false, valor: "Leve", tipo: "nivel" },
  escalofrios: { activo: false, valor: "Leve", tipo: "nivel" },
  congestionNasal: { activo: false, valor: "Leve", tipo: "nivel" },
  dolorGarganta: { activo: false, valor: "Leve", tipo: "nivel" },
  perdidaOlfato: { activo: false, valor: "Leve", tipo: "nivel" },
  perdidaGusto: { activo: false, valor: "Leve", tipo: "nivel" },
  nauseas: { activo: false, valor: "Leve", tipo: "nivel" },
  vomitos: { activo: false, valor: "Leve", tipo: "nivel" },
  diarrea: { activo: false, valor: "Leve", tipo: "nivel" },
  dolorPecho: { activo: false, valor: "Leve", tipo: "nivel" },
  sudoracionExcesiva: { activo: false, valor: "Leve", tipo: "nivel" },
  mareos: { activo: false, valor: "Leve", tipo: "nivel" },
  palpitaciones: { activo: false, valor: "Leve", tipo: "nivel" },
  dolorArticular: { activo: false, valor: "Leve", tipo: "nivel" },
  insomnio: { activo: false, valor: "Leve", tipo: "nivel" },
});

export default sintomas;
