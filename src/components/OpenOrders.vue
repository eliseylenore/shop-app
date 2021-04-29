<template>
  <div class="open-orders mt-5">
    <b-container>
      <header>
        <h2>Your open orders</h2>
      </header>
      <div class="row">
        <div
          class="col-md-6 mb-4"
          v-for="product in openOrders"
          :key="product._id + product.size"
          style="position: relative"
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
                <p class="mb-4 text-left">Quantity: {{ product.quantity }}</p>
              </b-col>
            </b-row>
          </product-card>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
// Framework related imports
import { mapState } from "vuex";

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
      openOrders: state => state.openOrders
    })
  },
  methods: {
    price: productPrice => getFormattedValue(productPrice, 2)
  }
};
</script>
<style lang="scss" scoped>
.open-orders .product-image {
  height: 10em;
}
</style>
