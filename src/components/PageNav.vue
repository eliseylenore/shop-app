<template>
  <div class="container-fluid px-0" role="navigation">
    <b-nav align="center">
      <app-dropdown />
      <b-nav-item :to="{ name: 'Products' }" class="nav-item mr-2"
        >Shop</b-nav-item
      >
      <b-nav-item :to="{ name: 'About' }" class="nav-item">About</b-nav-item>
      <cart-button />
    </b-nav>
  </div>
</template>

<script>
import CartButton from "@/components/CartButton.vue";
import AppDropdown from "@/components/AppDropdown.vue";
export default {
  components: {
    CartButton,
    AppDropdown
  }
};
</script>
