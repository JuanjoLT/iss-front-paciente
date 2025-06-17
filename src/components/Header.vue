<template>
  <header class="header">
    <div class="container">
      <h1 class="logo">Monitoreo de Pacientes</h1>
      <nav class="nav" role="navigation" aria-label="Menú principal">
        <ul>
          <li><a href="/dashboard">INICIO</a></li>
          <li><a href="#">PERFIL</a></li>
          <li><a href="#">HISTORIAL</a></li>
          <li><a href="/">SALIR</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<style scoped>
:root {
  --color-fondo-header: #50a750;
  --color-texto: white;
  --color-hover: #d94f4f; /* rojo suave */
}

.header {
  width: 100vw;
  background-color: #065e06;
  color: rgb(234, 223, 223);
  text-align: center;
  margin-top: auto; /* Opcional: asegura que el footer quede abajo */
}


.container {
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav a {
  color: #e1eee2; /* rojo oscuro para links */
  text-decoration: none;
  font-weight: 800;
  transition: color 0.3s ease;
}

.nav a:hover,
.nav a:focus {
  color: #35e828; /* blanco suave */
  outline: none;
  text-shadow: 0 0 2px rgba(150, 115, 115, 0.3);
  transform: scale(1.35);
}

</style>