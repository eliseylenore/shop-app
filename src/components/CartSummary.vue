<template>
  <div class="cart-summary p-4">
    <h3>Your cart</h3>
    <b-row>
      <b-col xs="12" v-for="product in cart" :key="product._id + product.size">
        <product-card :product="product" class="m-2">
          <b-row class="mt-3 mx-3 w-100">
            <b-col xs="12">
              <p class="mb-0 text-left">
                <strong>{{ product.title }}</strong
                >, size
                <span style="text-transform: capitalize">{{
                  product.size
                }}</span>
              </p>
              <p class="mb-0 text-left">${{ price(product.price) }}</p>
              <p class="mb-4 text-left">Quantity {{ product.quantity }}</p>
            </b-col>
          </b-row>
        </product-card>
      </b-col>
    </b-row>
    <div class="mx-2">
      <h4 class="mb-0">Total</h4>
      <p>${{ getCartTotal }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import { getFormattedValue } from "../commons/utils";

import ProductCard from "./ProductCard";

export default {
  components: {
    ProductCard
  },
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    ...mapGetters(["getCartTotal"])
  },
  methods: {
    price: productPrice => getFormattedValue(productPrice, 2)
  }
};
</script>

<style lang="scss" scoped>
.cart-summary {
  border: 1px solid #ced4da;
}
</style>
