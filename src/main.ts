import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 1️⃣ Primero carga Bootstrap y BootstrapVue3
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

// 2️⃣ Luego carga el CSS de tu toast (theme-default, más liviano)
import "vue-toast-notification/dist/theme-default.css";
import VueToast from "vue-toast-notification";

const app = createApp(App);

app.use(router);
app.use(VueToast, {
  position: "top-right",
  duration: 5000, // se cierra a los 5 s
  dismissible: true, // muestra un botón de cerrar
});

app.mount("#app");
