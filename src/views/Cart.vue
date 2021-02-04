<template>
  <div class="about mt-5">
    <b-container>
      <h1>Your cart</h1>
      <div v-if="!cart" class="d-flex justify-content-center">
        <p class="text-center mr-2">
          There's nothing in your cart yet!
        </p>
        <router-link :to="{ name: 'Products' }">Go shopping</router-link>
      </div>
      <div v-else>
        <b-row>
          <b-col xs="12" md="4" v-for="product in cart" :key="product.id">
            <product-card :product="product" />
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductCard from "@/components/ProductCard.vue";
export default {
  components: {
    ProductCard
  },
  computed: mapState({
    cart: state => state.cart
  })
};
</script>
