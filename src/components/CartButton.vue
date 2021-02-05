<template class="cart-button">
  <b-nav-item :to="{ name: 'Cart' }" class="cart-item">
    <div v-if="cartLength > 0" class="cart-quantity">
      <p class="text-center mb-0 pb-0">
        {{ cartLength}}
      </p>
    </div>
    <img src="cart.svg" alt="" style="height: 1.5em;" />
    Cart
  </b-nav-item>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState({
    cartLength: state => state.cart.length
  })
}
</script>

<style lang="scss">
.cart-quantity {
  position: absolute;
  left: -0.25em;
  bottom: -0.25em;
  background-color: red;
  border-radius: 50%;
  padding: 0.1em 0.5em;
  font-size: 0.75em;
}
</style>
