import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import "bootstrap";
import { 
    LayoutPlugin, 
    ModalPlugin,
    TablePlugin, 
    NavPlugin,
    FormInputPlugin,
    FormCheckboxPlugin,
    FormGroupPlugin,
    FormSelectPlugin,
    FormPlugin

  } from "bootstrap-vue";

import "@/assets/fonts/fonts.css";
import wb from "./registerServiceWorker";

// service worker for pwa
Vue.prototype.$workbox = wb;

// Make BootstrapVue available throughout your project
Vue.use(LayoutPlugin);
Vue.use(ModalPlugin);
Vue.use(TablePlugin);
Vue.use(NavPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormCheckboxPlugin);
Vue.use(FormSelectPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormPlugin);

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
