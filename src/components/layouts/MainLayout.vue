<!-- src/components/layouts/MainLayout.vue -->
<template>
  <div :class="$style.mainLayout">
    <div :class="$style.mainLayoutBody">
      <Sidebar :items="menuItems" />
      <div :class="$style.mainLayoutContent">
        <Header />

        <div :class="$style.contentWrapper">
          <router-view />
        </div>

        <Footer />
      </div>
    </div>
  </div>
</template>
<style module src="./MainLayout.module.scss" lang="scss" />

<script setup lang="ts">
import { ref } from "vue";
import Header from "../ui/header/Header.vue";
import Sidebar from "../ui/sidebar/Sidebar.vue";
import Footer from "../ui/footer/Footer.vue";
import {
  UserAccountIcon,
  TransactionHistoryIcon,
  PulseRectangle02Icon,
} from "@hugeicons/core-free-icons";

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: any;
}

const menuItems = ref<MenuItem[]>([
  {
    id: "1",
    label: "Monitoreo",
    path: "/dashboard",
    icon: PulseRectangle02Icon,
  },
  {
    id: "2",
    label: "Historial",
    path: "/historial",
    icon: TransactionHistoryIcon,
  },
  {
    id: "3",
    label: "Perfil paciente",
    path: "/perfil-paciente",
    icon: UserAccountIcon,
  },
]);
</script>
