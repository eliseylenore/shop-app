<template>
  <div class="open-orders">
    <div v-if="openOrders.length > 1">
      <h3 class="text-left mb-4">
        Your open order<span v-if="openOrders.length > 1">s</span>
      </h3>
      <div v-for="order in openOrders.slice().reverse()" :key="order._id">
        <div class="mb-4 px-4" style=" border-bottom: 1px #cccccc solid;">
          <div class=" d-flex justify-content-between align-items-center">
            <div>
              <p class="mb-0">{{ getDate(order.orderDate) }}</p>
              <p>
                {{ order.items.length }} item<span v-if="order.items.length > 1"
                  >s</span
                >
              </p>
            </div>
            <button
              @click="clickedOrder = order._id"
              v-if="clickedOrder !== order._id"
              class="btn btn-secondary"
            >
              Expand
            </button>
            <button
              @click="clickedOrder = ''"
              v-if="clickedOrder === order._id"
              class="btn btn-secondary"
            >
              Hide
            </button>
          </div>
          <div v-if="clickedOrder === order._id">
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
                    <p class="mb-4 text-left">
                      Quantity: {{ product.quantity }}
                    </p>
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
                class="btn btn-primary mb-4"
              >
                Mark fulfilled
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3 class="text-left">
        No open orders
      </h3>
      <router-link :to="{ name: 'PreviousOrders' }"
        >Previous orders</router-link
      >
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
      clickedOrder: ""
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
