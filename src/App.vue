<template>
  <div id="app">
    <Header /> 

    <main class="main-content">
      <router-view />
    </main>

    <Footer /> 
  </div>
</template>

<script setup lang="ts">        
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 100vw;
  /* padding: 1rem; */
}
</style>
