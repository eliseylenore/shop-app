<template>
  <div class="open-orders mt-5">
    <b-col xs="12" md="8" lg="6" offset-md="2" offset-lg="3">
      <h3 class="text-left">
        Your open order<span v-if="openOrders.length > 1">s</span>
      </h3>
    </b-col>
    <b-row v-for="order in openOrders.slice().reverse()" :key="order._id">
      <div
        class="mb-4 col-xs-12 col-md-8 col-md-8 col-lg-6 offset-md-2 offset-lg-3"
        style="position: relative"
        v-for="product in order.items"
        :key="product._id"
      >
        <product-card :product="product">
          <b-row class="mt-3 mx-3 w-100">
            <b-col xs="8">
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
              <p class="mb-4 text-left">Quantity: {{ product.quantity }}</p>
            </b-col>
            <b-col xs="4">
              <div class="mb-3">
                <button @click="$store.dispatch('markOrderFilled', product)">
                  Mark fulfilled
                </button>
              </div>
              <div>
                <button
                  class="cancel-btn"
                  @click="$store.dispatch('cancelOrder', product)"
                >
                  Cancel
                </button>
              </div>
            </b-col>
          </b-row>
        </product-card>
      </div>
    </b-row>
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
    this.$store.dispatch("fetchOpenOrders");
  },
  computed: {
    ...mapState({
      openOrders: state => state.user.pendingOrders
    })
  },
  methods: {
    getDate: orderDate => moment(orderDate).format("l"),
    price: productPrice => getFormattedValue(productPrice, 2)
  }
};
</script>
<style lang="scss" scoped>
.open-orders .product-image {
  height: 10em;
}
</style>
