// import işlemleri
import { registerPlugins } from "@/plugins";
import store from "@/stores/tasks";

import App from "./App.vue";

import { createApp } from "vue";

// create app kullanarak uygulama oluşturdum
const app = createApp(App);

// eklentiler için
registerPlugins(app);

// store u app e ekledim
app.use(store);

// vue ile DOM a bağlandım
app.mount("#app");
