import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/fonts/fonts.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

// How to import all images?
// function importAll(r) {
//   return r.keys().map(r);
// }

// importAll(require.context("./assets/img", true, /\.(png|jpe?g|svg)$/));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
  },
  render: h => h(App)
}).$mount("#app");
