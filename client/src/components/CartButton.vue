<template class="cart-button">
  <b-nav-item
    :to="{ name: 'Cart' }"
    :class="[
      'cart-item nav-item',
      $route.name === 'Cart' ? 'active' : 'inactive'
    ]"
    style="position: relative"
  >
    <div v-if="cartLength > 0" class="cart-quantity">
      <p class="text-center mb-0 pb-0">
        <span class="sr-only">Number of items in cart:</span>{{ cartLength }}
      </p>
    </div>
    <img
      src="/img/cart.svg"
      alt="shopping cart"
      class="cart-icon"
      title="Your cart"
    />
  </b-nav-item>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      cartLength: state => state.cart.items.length
    })
  }
};
</script>

<style lang="scss">
.cart-quantity {
  position: absolute;
  left: 25px;
  bottom: 16px;
  background-color: red;
  border-radius: 50%;
  padding: 5px 0px 0;
  height: 2em;
  width: 2em;
  font-size: 0.8em;
}
.cart-icon {
  height: 1.5em;
}
</style>
