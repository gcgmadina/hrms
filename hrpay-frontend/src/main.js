import { createApp } from "vue";
import App from "./App.vue"; // Pastikan path benar
import router from "./router"; // Pastikan router.js ada
import highlight from './directives/highlight.js'
import './style.css';
import '@/assets/style.css';

const app = createApp(App);
app.use(router);
app.mount("#app");
app.directive('highlight', highlight)