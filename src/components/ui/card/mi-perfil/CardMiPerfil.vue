<template>
  <!-- Muestra la tarjeta solo si 'show' es true -->
  <div v-if="show" :class="$style.card">
    <h2 :class="$style.header">Perfil del Paciente</h2>
    <div :class="$style.body">
      <p :class="$style.field">
        <span :class="$style.label">Nombre:</span> {{ paciente.nombre }}
      </p>
      <p :class="$style.field">
        <span :class="$style.label">RUT:</span> {{ paciente.rut }}
      </p>
      <p :class="$style.field">
        <span :class="$style.label">Email:</span> {{ paciente.email }}
      </p>
      <p :class="$style.field">
        <span :class="$style.label">Género:</span> {{ paciente.genero }}
      </p>
      <p :class="$style.field">
        <span :class="$style.label">Fecha de Nacimiento:</span>
        {{ paciente.fechaNacimiento }}
      </p>
      <p :class="$style.field">
        <span :class="$style.label">Teléfono:</span> {{ paciente.telefono }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Paciente {
  nombre: string;
  rut: string;
  email: string;
  genero: string;
  fechaNacimiento: string;
  telefono: string;
}

const { paciente, show } = defineProps<{
  paciente: Paciente;
  show: boolean;
}>();
</script>

<style module src="./CardMiPerfil.module.scss" lang="scss" />
