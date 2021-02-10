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
          <b-col
            xs="12"
            sm="6"
            lg="4"
            v-for="product in cart"
            :key="product.id + product.size"
          >
            <product-card :product="product">
              <b-row>
                <b-col xs="6">
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
                  <p class="mb-4 ml-4 text-left">${{ price(product.price) }}</p>
                </b-col>
                <b-col xs="6">
                  <p class="mt-4 ml-4 mb-0 text-left">
                    Quantity: {{ product.quantity }}
                  </p>
                </b-col>
              </b-row>
            </product-card>
            <button class="remove" @click="removeItem(product)">
              <span class="sr-only">Remove item</span>
              <span class="x">X</span>
            </button>
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
    removeItem(product) {
      this.$store.dispatch("removeFromCart", product);
    }
  }
};
</script>
<style lang="scss" scoped>
button.remove {
  position: absolute;
  top: -0.25em;
  right: -0.15em;
  border-radius: 100%;
  padding: 0.35em 0.75em;
  font-size: 1em;
  height: 2em;
  width: 2em;
  .x {
    position: absolute;
    left: 36%;
    top: 19%;
  }
}

product-cart {
  position: relative;
}
</style>
