<template>
  <div class="cart mt-5">
    <modal
      id="modal-1"
      title="Are you sure you want to remove item?"
      @modal-clicked="removeItem(clickedProduct)"
    >
      <product-card
        v-if="clickedProduct && Object.keys(clickedProduct).length > 0"
        :product="clickedProduct"
        class="mx-sm-5"
      >
        <b-container>
          <b-row>
            <b-col xs="6">
              <p class="mt-4 ml-4 mb-0 text-left">
                <strong>{{ clickedProduct.title }}</strong
                >,
                <span
                  >size
                  {{
                    clickedProduct.selectedSize
                      ? clickedProduct.selectedSize
                      : clickedProduct.size
                  }}</span
                >
              </p>
              <p class="mb-4 ml-4 text-left">
                ${{ price(clickedProduct.price) }}
              </p>
            </b-col>
            <b-col xs="6">
              <p class="mt-4 ml-4 mb-0 text-left">
                Quantity: {{ clickedProduct.quantity }}
              </p>
            </b-col>
          </b-row>
        </b-container>
      </product-card>
    </modal>
    <b-container>
      <header>
        <h1>Your cart</h1>
      </header>
      <div v-if="cart.items.length < 1" class="d-flex justify-content-center">
        <p class="text-center mr-2">
          There's nothing in your cart yet!
        </p>
        <router-link :to="{ name: 'Products' }">Go shopping</router-link>
      </div>
      <div v-else>
        <b-row class="my-4">
          <b-col xs="12" md="4" order-md="2">
            <h2 class="text-left">Summary</h2>
            <p>Your total: ${{ getCartTotal }}</p>
            <button class="mb-4" @click="checkoutCart">
              Check out
            </button>
          </b-col>
          <div :class="cart.items.length < 2 ? 'col-md-4' : 'col-md-8'">
            <div :class="cart.items.length < 2 ? 'justify-content-end' : 'row'">
              <div
                :class="cart.items.length < 2 ? 'col-12' : 'col-md-6'"
                v-for="product in cart.items"
                :key="product._id + product.size"
                style="position: relative"
                class="mb-4"
              >
                <product-card :product="product">
                  <b-row class="mt-3 mx-3 w-100">
                    <b-col xs="12">
                      <p class="mb-0 text-left">
                        <strong>{{ product.title }}</strong
                        >, size
                        <span style="text-transform: capitalize">{{
                          product.size
                        }}</span>
                      </p>
                      <p class="mb-0 text-left">
                        Order date {{ getDate(product.orderDate) }}
                      </p>
                      <p class="mb-0 text-left">{{ product.color }}</p>
                      <p class="mb-0 text-left">${{ price(product.price) }}</p>
                      <p class="mb-4 text-left">
                        Quantity {{ product.quantity }}
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
// Framework related imports
import { mapState, mapGetters } from "vuex";

//Common imports
import { getFormattedValue } from "../commons/utils";
import moment from "moment";

//store object
import store from "../store";
import router from "../router";

//Component level imports
import ProductCard from "@/components/ProductCard.vue";
import Modal from "@/components/Modal.vue";

//style related imports
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
  computed: {
    ...mapState({
      cart: state => state.cart,
      user: state => state.user
    }),
    ...mapGetters(["getCartTotal"])
  },
  methods: {
    price: productPrice => getFormattedValue(productPrice, 2),
    showModal(product) {
      this.clickedProduct = product;
      this.$bvModal.show("modal-1");
    },
    removeItem: clickedProduct =>
      store.dispatch("removeFromCart", clickedProduct),
    getDate: orderDate => moment(orderDate).format("l"),
    checkoutCart() {
      router.push({ name: "Shipping" });
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
