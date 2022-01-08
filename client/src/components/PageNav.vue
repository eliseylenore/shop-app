<template>
  <div
    class="container-fluid px-0 main-nav d-flex justify-content-between align-items-end"
    role="navigation"
    aria-label="Main navigation"
  >
    <b-nav align="left">
      <b-nav-item
        :to="{ name: 'Products' }"
        :class="[
          'nav-item pl-4',
          $route.name === 'Products' ? 'active' : 'inactive'
        ]"
      >
      <img
          src="/img/logo-short-with-text.svg"
          alt=""
          class="cart-icon"
          title="shop-app home page"
        />
        <span class="sr-only">
          shop-app home
        </span>
      </b-nav-item>
    </b-nav>
    <b-nav align="right">
      <b-nav-item
        :to="{ name: 'Login' }"
        v-if="!$store.getters.loggedIn"
        :class="['nav-item mr-2 mr-sm-3', $route.name === 'Login' ? 'active' : 'inactive']"
        >Login</b-nav-item
      >
      <b-nav-item
        :to="{ name: 'Dashboard', params: { page: 'profile' } }"
        v-if="$store.getters.loggedIn"
        :class="[
          'nav-item mr-2 mr-sm-3',
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
      <b-nav-item class="mr-2 mr-sm-3" @click="logout" v-if="$store.getters.loggedIn"
        >Logout</b-nav-item
      >
      <cart-button class="pr-5" />
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
