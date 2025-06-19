<template>
  <div id="app">
    <!-- Muestra solo si mostrarLayout es true -->
    <Header v-if="mostrarLayout" />

    <main class="main-content">
      <router-view />
    </main>

    <!-- Muestra solo si mostrarLayout es true -->
    <Footer v-if="mostrarLayout" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/ui/footer/Footer.vue";

const route = useRoute();

const mostrarLayout = computed(() => {
  const ruta = route.path.toLowerCase();
  return ruta !== "/" && ruta !== "/register";
});
</script>
