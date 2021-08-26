<template>
  <div class="open-orders">
    <h3 class="text-left">
      Your open order<span v-if="openOrders.length > 1">s</span>
    </h3>
    <div v-for="order in openOrders.slice().reverse()" :key="order._id">
      <div
        class="mb-4 p-4"
        style="position: relative; border: 1px #cccccc solid;"
      >
        <p class="mb-0">Order date {{ getDate(order.orderDate) }}</p>
        <p>
          {{ order.items.length }} item<span v-if="order.items.length > 1"
            >s</span
          >
        </p>
        <div v-for="product in order.items" :key="product._id" class="mb-3">
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
                <p class="mb-0 text-left">{{ product.color }}</p>
                <p class="mb-0 text-left">${{ price(product.price) }}</p>
                <p class="mb-4 text-left">Quantity: {{ product.quantity }}</p>
              </b-col>
              <b-col xs="4">
                <div>
                  <button
                    class="btn btn-danger"
                    @click="
                      $store.dispatch('cancelOrder', {
                        ...product,
                        orderId: order._id
                      })
                    "
                  >
                    Cancel
                  </button>
                </div>
              </b-col>
            </b-row>
          </product-card>
        </div>
        <div class="mt-3">
          <button
            @click="$store.dispatch('markOrderFilled', order)"
            class="btn btn-primary"
          >
            Mark fulfilled
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Framework related imports
import { mapState } from "vuex";

//Common imports
import { getFormattedValue, formattedDate } from "../commons/utils";

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
    getDate: orderDate => formattedDate(orderDate),
    price: productPrice => getFormattedValue(productPrice, 2)
  }
};
</script>
<style lang="scss" scoped>
.open-orders .product-image {
  height: 10em;
}
</style>
