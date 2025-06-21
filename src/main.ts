import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import { createApp } from "vue";
import BootstrapVue3 from "bootstrap-vue-3";
import App from "./App.vue";
import router from "./router";
// 1) Importa el componente Vue para iconos
import { HugeiconsIcon } from "@hugeicons/vue";
// 2) Importa los iconos que vayas a usar
import { UserAccountIcon } from "@hugeicons/core-free-icons";
import "bootstrap";

const app = createApp(App);
app.use(BootstrapVue3);
app.use(router);
// registra el componente “genérico” para renderizar SVGs
app.component("HugeiconsIcon", HugeiconsIcon);
// registra cada icono concreto
app.component("UserAccountIcon", UserAccountIcon);
app.mount("#app");

