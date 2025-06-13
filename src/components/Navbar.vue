<template>
  <header class="navbar">
    <div class="container">
      <!-- Logo -->
      <div class="logo" @click="$router.push('/dashboard')">
        <img src="@/assets/logo-uoh.png" alt="Logo UOH" />
        <span>Monitoreo de Pacientes</span>
      </div>

      <!-- Menú desktop -->
      <nav class="desktop-menu">
        <ul>
          <li><a href="/dashboard">Inicio</a></li>
          <li><a href="/profile">Perfil</a></li>
          <li><a href="/history">Historial</a></li>
        </ul>
      </nav>

      <!-- Usuario autenticado -->
      <div class="user-actions">
        <button class="btn-notifications">
          <img src="@/assets/icons/bell.svg" alt="Notificaciones" />
          <span v-if="unreadNotifications" class="badge">{{ unreadNotifications }}</span>
        </button>

        <div class="user-profile">
          <span class="username">Dr. Juan Pérez</span>
          <img src="@/assets/user-avatar.png" alt="Avatar" class="avatar" />
        </div>

        <button class="logout-btn" @click="logout">Cerrar sesión</button>
      </div>

      <!-- Botón menú móvil -->
      <button class="menu-toggle" @click="toggleMobileMenu">
        {{ isMobileMenuOpen ? 'Cerrar' : '☰' }}
      </button>
    </div>

    <!-- Menú móvil -->
    <nav class="mobile-menu" :class="{ active: isMobileMenuOpen }">
      <ul>
        <li><a href="/dashboard" @click="closeMobileMenu">Inicio</a></li>
        <li><a href="/profile" @click="closeMobileMenu">Perfil</a></li>
        <li><a href="/history" @click="closeMobileMenu">Historial</a></li>
        <li><a href="/" @click="logout">Cerrar sesión</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)
const unreadNotifications = ref(3) // Ejemplo de notificaciones

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const logout = () => {
  closeMobileMenu()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background-color: #005493;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  gap: 0.75rem;
}

.logo img {
  height: 36px;
}

.desktop-menu ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.desktop-menu a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.desktop-menu a:hover {
  color: #c9ba18;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.btn-notifications {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
}

.btn-notifications img {
  width: 22px;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 50%;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.username {
  font-size: 0.9rem;
  display: none;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.logout-btn {
  background: transparent;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  display: none;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.mobile-menu {
  display: none;
  background-color: #00407d;
  padding: 1rem;
}

.mobile-menu.active {
  display: block;
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-menu a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
}

/* Responsive */
@media (max-width: 960px) {
  .desktop-menu {
    display: none;
  }

  .user-actions {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .username,
  .logout-btn {
    display: none;
  }
}

@media (max-width: 600px) {
  .logo span {
    display: none;
  }

  .username {
    display: inline;
    font-size: 0.85rem;
  }

  .logout-btn {
    display: inline;
  }
}
</style>