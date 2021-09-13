<template>
  <div class="previous-orders">
    <h3 class="text-left mb-2">
      Your previous orders
    </h3>
    <div v-if="previousOrders.length > 0" class="mb-4">
      <div v-for="order in previousOrders.slice().reverse()" :key="order._id">
        <accordion :panelId="order._id">
          <template v-slot:header>
            {{ getDate(order.orderDate) }}
          </template>
          <template v-slot:panel>
            <div v-for="product in order.items" :key="product._id" class="mb-3">
              <product-card
                :product="product"
                :tabIndex="-1"
                align="horizontal"
                :width="25"
                height="10em"
              >
                <b-row class="mx-3 w-100">
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
                    <p class="mb-0 text-left">
                      Quantity: {{ product.quantity }}
                    </p>
                    <router-link
                      :tabIndex="-1"
                      class="mb-4"
                      :to="{
                        name: 'ProductReview',
                        params: { id: product.productId }
                      }"
                      >Review product</router-link
                    >
                  </b-col>
                </b-row>
              </product-card>
            </div>
          </template>
        </accordion>
      </div>
    </div>
    <div v-else>
      <p class="text-left">
        No previous orders
      </p>
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
import Accordion from "@/components/Accordion.vue";

//style related imports
export default {
  components: {
    ProductCard,
    Accordion
  },
  data() {
    return {
      clickedOrder: ""
    };
  },
  created() {
    // this.$store.dispatch("fetchpreviousOrders");
  },
  computed: {
    ...mapState({
      previousOrders: state => state.user.fulfilledOrders
    })
  },
  methods: {
    getDate: orderDate => formattedDate(orderDate),
    price: productPrice => getFormattedValue(productPrice, 2)
  }
};
</script>
<style lang="scss" scoped></style>
