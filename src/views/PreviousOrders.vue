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
        <div v-for="order in fulfilledOrders" :key="order._id" class="w-100 order-container">
          <h4 class="mb-0 text-left">Order {{ order._id }}</h4>
          <p class="mb-0 text-left">Date {{ getDate(order.orderDate) }}</p>
          <b-row class="mb-4">
            <b-col
              xs="12"
              md="6"
              v-for="product in order.items"
              :key="product._id + product.size"
            >
              <product-card :product="product">
                <div class="p-4">
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
                </div>
              </product-card>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
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
    getDate: orderDate => formattedDate(orderDate)
  }
};
</script>
<style lang="scss" scoped>
.order-container {
  border: 1px solid #ced4da;
  padding: 2em 2em 1em;
  margin-bottom: 2em;
}
</style>
