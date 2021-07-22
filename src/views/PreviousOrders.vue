<template>
  <div class="previous-orders mt-5">
    <b-container>
      <header>
        <h1>Previous orders</h1>
      </header>
      <div
        v-if="fulfilledOrders.length < 1"
        class="d-flex justify-content-center"
      >
        <p class="text-center mr-2">
          There's nothing in your cart yet!
        </p>
        <router-link :to="{ name: 'Products' }">Go shopping</router-link>
      </div>
      <div v-else>
        <b-row class="my-4" v-for="order in fulfilledOrders" :key="order._id">
          <div
            class="mb-4 col-xs-12 col-md-8 col-lg-4"
            style="position: relative"
          >
            <p class="mb-0 text-left">
              Order date {{ getDate(order.orderDate) }}
            </p>
            <div
              v-for="product in order.items"
              :key="product._id + product.size"
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
                    <p class="mb-0 text-left">{{ product.color }}</p>
                    <p class="mb-0 text-left">${{ price(product.price) }}</p>
                    <p class="mb-4 text-left">
                      Quantity: {{ product.quantity }}
                    </p>
                  </b-col>
                </b-row>
              </product-card>
            </div>
          </div>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
// Framework related imports
import { mapState } from "vuex";
import moment from "moment";

//Common imports
import { getFormattedValue } from "../commons/utils";

//Component level imports
import ProductCard from "@/components/ProductCard.vue";

//style related imports
export default {
  components: {
    ProductCard
  },
  data() {
    return {
      clickedProduct: {}
    };
  },
  created() {
    if (!this.$store.getters.fulfilledOrders) {
      this.$store.dispatch("fetchFulfilledOrders");
    }
  },
  computed: {
    ...mapState({
      fulfilledOrders: state => state.user.fulfilledOrders
    })
  },
  methods: {
    price: productPrice => getFormattedValue(productPrice, 2),
    getDate: orderDate => moment(orderDate).format("l")
  }
};
</script>
<style lang="scss" scoped></style>
