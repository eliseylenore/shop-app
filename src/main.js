import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import "bootstrap";
import { BootstrapVue } from "bootstrap-vue";

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
    const cartString = localStorage.getItem("cart");
    if (userString) {
      const userData = JSON.parse(userString);
      const cartData = JSON.parse(cartString);
      this.$store.commit("SET_USER_DATA", { ...userData, cart: cartData });
    }
    axios.interceptors.response.use(
      response => response, // simply return the response
      error => {
        if (error.response.status === 401) {
          console.log("HEY");
          // if we catch a 401 error
          this.$store.dispatch("logout"); // force a log out
        }
        return Promise.reject(error); // reject the Promise, with the error as the reason
      }
    );
  },
  render: h => h(App)
}).$mount("#app");
