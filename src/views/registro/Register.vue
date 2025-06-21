<template>
  <div :class="$style.backgroundGradient">
    <div :class="$style.registerContainer">
      <h2 :class="$style.title">CREA TU CUENTA</h2>
      <p :class="$style.description">
        POR FAVOR, COMPLETA LOS SIGUIENTES CAMPOS PARA REGISTRARSE.
      </p>

      <form @submit.prevent="handleRegister">
        <div :class="$style.formGroup">
          <label :class="$style.label" for="rut">RUT</label>
          <input
            id="rut"
            v-model="rut"
            @input="formatearRut"
            type="text"
            placeholder="12.345.678-9"
            maxlength="12"
            required
            :class="$style.input"
          />
        </div>

        <div :class="$style.formGroup">
          <label :class="$style.label" for="nombre">NOMBRE COMPLETO:</label>
          <input
            id="nombre"
            v-model="nombre"
            type="text"
            placeholder="Tu nombre"
            required
            :class="$style.input"
          />
        </div>

        <div :class="$style.formGroup">
          <label :class="$style.label" for="email">CORREO ELECTRÓNICO:</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            required
            :class="$style.input"
          />
        </div>

        <div :class="$style.formGroup">
          <label :class="$style.label" for="password">CONTRASEÑA:</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            :class="$style.input"
          />
        </div>

        <div :class="$style.formGroup">
          <label :class="$style.label" for="genero">GÉNERO:</label>
          <select id="genero" v-model="genero" required :class="$style.select">
            <option value="" disabled selected>Selecciona una opción</option>
            <option value="femenino">Femenino</option>
            <option value="masculino">Masculino</option>
            <option value="otro">Otro</option>
            <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
          </select>
        </div>

        <div :class="$style.formGroup">
          <label :class="$style.label" for="fechaNacimiento"
            >FECHA DE NACIMIENTO:</label
          >
          <input
            id="fechaNacimiento"
            v-model="fechaNacimiento"
            type="date"
            required
            :class="$style.input"
          />
        </div>

        <div :class="$style.formGroup">
          <label :class="$style.label" for="telefono">TELÉFONO:</label>
          <input
            id="telefono"
            v-model="telefono"
            type="tel"
            placeholder="+56912345678"
            required
            :class="$style.input"
          />
        </div>

        <div :class="$style.formGroup">
          <button type="submit" :class="$style.buttonPrimary">
            REGISTRARSE
          </button>
        </div>

        <p v-if="errorMessage" :class="$style.error">{{ errorMessage }}</p>
      </form>

      <div :class="$style.volverLogin">
        <p>¿YA TIENES CUENTA?</p>
        <button @click="irAlLogin" :class="$style.btnVolver">
          INICIAR SESIÓN
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import $style from "./Register.module.scss";

const rut = ref("");

const formatearRut = () => {
  let valor = rut.value
    .replace(/\./g, "")
    .replace(/-/g, "")
    .replace(/[^\dkK]/g, "")
    .toUpperCase();

  if (valor.length <= 1) {
    rut.value = valor;
    return;
  }

  const cuerpo = valor.slice(0, -1);
  const dv = valor.slice(-1);

  let cuerpoFormateado = "";
  let contador = 0;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    cuerpoFormateado = cuerpo[i] + cuerpoFormateado;
    contador++;
    if (contador === 3 && i !== 0) {
      cuerpoFormateado = "." + cuerpoFormateado;
      contador = 0;
    }
  }

  rut.value = `${cuerpoFormateado}-${dv}`;
};

const nombre = ref("");
const email = ref("");
const password = ref("");
const genero = ref("");
const fechaNacimiento = ref("");
const telefono = ref("");
const rol = ref("");
const errorMessage = ref("");
const router = useRouter();

const handleRegister = async () => {
  if (!validateRut(rut.value)) {
    errorMessage.value = "RUT inválido";
    return;
  }

  if (!validateEmail(email.value)) {
    errorMessage.value = "Correo electrónico inválido";
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = "La contraseña debe tener al menos 6 caracteres";
    return;
  }

  if (!telefono.value.startsWith("+")) {
    errorMessage.value =
      "El teléfono debe comenzar con el código del país (ej: +56)";
    return;
  }

  const userData = {
    rut: rut.value,
    nombre: nombre.value,
    email: email.value,
    password: password.value,
    genero: genero.value,
    fechaNacimiento: fechaNacimiento.value,
    telefono: telefono.value,
    rol: rol.value,
  };

  try {
    const response = await fetch("http://localhost:3001/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error("Error al registrar usuario");

    console.log("Usuario guardado en JSON Server");
    router.push("/");
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = "Error al guardar los datos";
  }
};

const irAlLogin = () => {
  router.push("/");
};

function validateRut(rut: string): boolean {
  return /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/.test(rut);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
</script>
