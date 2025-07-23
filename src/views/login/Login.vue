<template>
  <div :class="$style.fullscreenWrapper">
    <div :class="$style.loginContainer">
      <img src="@/assets/logo-uoh.png" alt="Logo UOH" :class="$style.logo" />

      <h1 :class="$style.titlePrimary">Bienvenid@</h1>
      <h2 :class="$style.titleSecondary">Inicia tu sesión</h2>
      <p :class="$style.description">
        Por favor, ingresa tu RUT y contraseña para acceder al sistema de
        monitoreo.
      </p>

      <form @submit.prevent="handleLogin">
        <div :class="$style.formGroup">
          <label for="rut">RUT</label>
          <input
            id="rut"
            v-model="rut"
            type="text"
            placeholder="12.345.678-9"
            required
          />
        </div>

        <div :class="$style.formGroup">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div :class="$style.formGroup">
          <button type="submit" :class="$style.buttonPrimary">Ingresar</button>
        </div>

        <p v-if="errorMessage" :class="$style.error">{{ errorMessage }}</p>
      </form>

      <div :class="$style.registroOpcion">
        <p>¿No tienes cuenta?</p>
        <button @click="irARegistro" :class="$style.btnRegistro">
          Regístrate
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";



const rut = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

watch(rut, (nuevo, anterior) => {
  if (nuevo.length >= anterior.length) {
    rut.value = formatRut(nuevo);
  }
});

async function handleLogin() {
  if (!validateRut(rut.value)) {
    errorMessage.value = "RUT inválido";
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = "La contraseña debe tener al menos 6 caracteres";
    return;
  }

  try {
    const response = await axios.get("http://localhost:3001/usuarios", {
      params: {
        rut: rut.value,
        password: password.value,
      },
    });

    if (response.data.length > 0) {
      const usuario = response.data[0];
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
      router.push("/dashboard"); // o '/panel' si así está en tus rutas
      localStorage.setItem("usuarioId", usuario.id);
    } else {
      errorMessage.value = "Credenciales incorrectas";
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = "Error de conexión con el servidor";
  }
}

const irARegistro = () => {
  router.push("/register");
};

function validateRut(rut: string): boolean {
  return /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/.test(rut);
}

function formatRut(rut: string): string {
  const limpio = rut.replace(/[^\dkK]/g, "").toUpperCase();
  if (limpio.length <= 1) return limpio;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  let formateado = "";
  for (let i = cuerpo.length; i > 0; i -= 3) {
    const inicio = Math.max(i - 3, 0);
    const grupo = cuerpo.slice(inicio, i);
    formateado = grupo + (formateado ? "." + formateado : "");
  }

  return `${formateado}-${dv}`;
}
</script>

<style module src="./Login.module.scss" lang="scss" />
