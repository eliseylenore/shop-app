<template class="cart-button">
  <b-nav-item :to="{ name: 'Cart' }" class="cart-item">
    <div v-if="cartLength > 0" class="cart-quantity">
      <p class="text-center mb-0 pb-0">
        <span class="sr-only">Number of items in cart:</span>{{ cartLength }}
      </p>
    </div>
    <img src="/img/cart.svg" alt="shopping cart"  class="cart-icon"/>
  </b-nav-item>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      cartLength: state => state.cart.length
    })
  }
};
</script>

<style lang="scss">
.cart-quantity {
  position: absolute;
  left: 40px;
  bottom: 27px;
  background-color: red;
  border-radius: 50%;
  padding: 0 7px;
  font-size: 0.6em;
}
.cart-icon {
  height: 1.5em;
}
</style>
