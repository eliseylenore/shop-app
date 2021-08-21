<template>
  <div class="container-fluid px-0" role="navigation">
    <b-nav align="left">
      <div class="ml-4">
        <b-nav-item
          :to="{ name: 'About' }"
          :class="['nav-item', $route.name === 'About' ? 'active' : 'inactive']"
          >About</b-nav-item
        >
      </div>
      <div class="right-items d-flex">
        <b-nav-item
          :to="{ name: 'Login' }"
          v-if="!$store.getters.loggedIn"
          :class="['nav-item', $route.name === 'Login' ? 'active' : 'inactive']"
          >Login</b-nav-item
        >
        <b-nav-item
          :to="{ name: 'Dashboard' }"
          v-if="$store.getters.loggedIn"
          :class="[
            'nav-item',
            $route.name === 'Dashboard' ? 'active' : 'inactive'
          ]"
        >
          <img
            src="/img/profile.svg"
            alt=""
            class="cart-icon"
            title="Your account"
          />
          <span class="sr-only">Your account</span>
        </b-nav-item>
        <b-nav-item @click="logout" v-if="$store.getters.loggedIn"
          >Logout</b-nav-item
        >
        <cart-button />
      </div>
    </b-nav>
  </div>
</template>

<script>
import CartButton from "@/components/CartButton.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    CartButton
  },
  computed: {
    ...mapGetters(["loggedIn"])
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
