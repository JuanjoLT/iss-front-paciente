// store/paciente.ts
import { defineStore } from 'pinia'

export const usePacienteStore = defineStore('paciente', {
  state: () => ({
    nombre: '',
    rut: '',
    sintomasDiarios: {} as Record<string, number>,
    puntajeTotal: 0,
    semaforo: 'Verde',
  }),

  actions: {
    calcularSemaforo() {
      const total = Object.values(this.sintomasDiarios).reduce((acc, val) => acc + val, 0)
      this.puntajeTotal = total

      if (total < 20) this.semaforo = 'Verde'
      else if (total < 50) this.semaforo = 'Amarillo'
      else this.semaforo = 'Rojo'
    },

    actualizarSintomas(nuevos: Record<string, number>) {
      this.sintomasDiarios = nuevos
      this.calcularSemaforo()
    }
  },
})
