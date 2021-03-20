<template>
  <div class="container-fluid px-0" role="navigation">
    <b-nav align="center">
      <app-dropdown />
      <b-nav-item :to="{ name: 'About' }" class="nav-item">About</b-nav-item>
      <div class="right-items d-flex">
        <b-nav-item :to="{ name: 'Login' }" v-if="!$store.getters.loggedIn"
          >Login</b-nav-item
        >
        <b-nav-item :to="{ name: 'Dashboard' }" v-if="$store.getters.loggedIn"
          >Your account</b-nav-item
        >
        <cart-button />
      </div>
    </b-nav>
  </div>
</template>

<script>
import CartButton from "@/components/CartButton.vue";
import AppDropdown from "@/components/AppDropdown.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    CartButton,
    AppDropdown
  },
  computed: {
    ...mapGetters(["loggedIn"])
  }
};
</script>
