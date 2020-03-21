import Vue from "vue";
import Buefy from "buefy";
import Vuelidate from "vuelidate";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// css
import "buefy/dist/buefy.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";

// components
import App from "@/views/app/App.vue";

// Initialize Vue
Vue.config.productionTip = false;

// Buefy
Vue.use(Buefy, {
  defaultIconPack: "fas"
});

// Vuelidate
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");