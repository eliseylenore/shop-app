<template>
  <div class="cart mt-5">
    <modal
      :product="clickedProduct"
      title="Are you sure you want to remove item?"
      @modal-clicked="removeItem()"
    />
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
            <button>Check out</button>
          </b-col>
          <div :class="cart.length < 2 ? 'col-md-4' : 'col-md-8'">
            <div :class="cart.length < 2 ? 'justify-content-end' : ''">
              <div
                :class="cart.length < 2 ? 'col-12' : 'col-md-6'"
                v-for="product in cart"
                :key="product.id + product.size"
                style="position: relative"
                class="mb-4"
              >
                <product-card :product="product">
                  <b-row class="mt-3 w-100">
                    <b-col xs="6" class="mb-3">
                      <p class="mb-0 text-left">
                        <strong>{{ product.title }}</strong>
                      </p>
                      <p class="mb-0 text-left">{{ product.color }}</p>
                      <p
                        class="mb-0 text-left"
                        style="text-transform: capitalize;"
                      >
                        {{ product.size }}
                      </p>
                      <p class="mb-4 text-left">${{ price(product.price) }}</p>
                    </b-col>
                    <b-col xs="6" class="mb-3">
                      <p class="mb-0 text-left">
                        Quantity: {{ product.quantity }}
                      </p>
                    </b-col>
                  </b-row>
                </product-card>
                <button class="close" @click="showModal(product)">
                  <span class="sr-only">Remove item</span>
                  ×
                </button>
              </div>
            </div>
          </div>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductCard from "@/components/ProductCard.vue";
import Modal from "@/components/Modal.vue";
export default {
  components: {
    ProductCard,
    Modal
  },
  data() {
    return {
      clickedProduct: {}
    };
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
    showModal(product) {
      this.clickedProduct = product;
      this.$bvModal.show("modal-1");
      // this.$store.dispatch("removeFromCart", product);
    },
    removeItem() {
      console.log("removing");
      this.$store.dispatch("removeFromCart", this.clickedProduct);
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
