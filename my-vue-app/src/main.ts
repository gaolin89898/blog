import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";
import install from "../publics/index";

createApp(App).use(install).mount("#app");
