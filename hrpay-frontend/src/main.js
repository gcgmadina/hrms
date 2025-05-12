import { createApp } from "vue";
import App from "./App.vue"; // Pastikan path benar
import router from "./router"; // Pastikan router.js ada

const app = createApp(App);
app.use(router);
app.mount("#app");