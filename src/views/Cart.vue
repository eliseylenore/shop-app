<template>
  <div class="cart mt-5">
    <b-container>
      <header>
        <h1>Your cart</h1>
      </header>
      <div v-if="cart.length < 1" class="d-flex justify-content-center">
        <p class="text-center mr-2">
          There's nothing in your cart yet!
        </p>
        <router-link :to="{ name: 'Products' }">Go shopping</router-link>
      </div>
      <div v-else>
        <b-row class="my-4">
          <b-col xs="12" md="4" order-md="2">
            <h2 class="text-left">Summary</h2>
            <p>Your total: ${{ cartTotal() }}</p>
          </b-col>
          <b-col xs="12" md="8">
            <b-row>
              <b-col
                xs="12"
                sm="6"
                v-for="product in cart"
                :key="product.id + product.size"
                style="position: relative"
                class="mb-4"
              >
                <product-card :product="product">
                  <div class="mb-3">
                    <p class="mt-4 ml-4 mb-0 text-left">
                      <strong>{{ product.title }}</strong>
                    </p>
                    <p class="ml-4 mb-0 text-left">{{ product.color }}</p>
                    <p
                      class="ml-4 mb-0 text-left"
                      style="text-transform: capitalize;"
                    >
                      {{ product.size }}
                    </p>
                    <p class="mb-4 ml-4 text-left">
                      ${{ price(product.price) }}
                    </p>
                    <p class="mt-4 ml-4 mb-0 text-left">
                      Quantity: {{ product.quantity }}
                    </p>
                  </div>
                </product-card>
                <button class="close" @click="removeItem(product)">
                  <span class="sr-only">Remove item</span>
                  ×
                </button>
              </b-col>
            </b-row>
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
  }),
  methods: {
    price(productPrice) {
      return parseFloat(productPrice)
        .toFixed(2)
        .replace(/\.0+$/, "");
    },
    cartTotal() {
      return parseFloat(this.$store.getters.getCartTotal)
        .toFixed(2)
        .replace(/\.0+$/, "");
    },
    removeItem(product) {
      this.$store.dispatch("removeFromCart", product);
    }
  }
};
</script>
<style lang="scss" scoped>
product-cart {
  position: relative;
}
.cart .product-image {
  height: 10em;
}
</style>
