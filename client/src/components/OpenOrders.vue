<template>
  <div class="open-orders">
    <h3 class="text-left mb-2">
      Your open orders
    </h3>
    <div v-if="openOrders.length > 0" class="mb-4">
      <div v-for="order in openOrders.slice().reverse()" :key="order._id">
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
                :width="75"
                height="13em"
              >
                <b-row class="m-3 w-100">
                  <b-col>
                    <p class="mb-0 text-left">
                      <strong>{{ product.title }}</strong
                      >
                    </p>
                    <p class="mb-0 text-left">Size {{ product.size }}</p>
                    <p class="mb-0 text-left">{{ product.color }}</p>
                    <p class="mb-0 text-left">${{ price(product.price) }}</p>
                    <p class="mb-4 text-left">
                      Quantity: {{ product.quantity }}
                    </p>
                    <button
                      :tabIndex="-1"
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
                  </b-col>
                </b-row>
              </product-card>
            </div>
            <div class="mt-3">
              <h4>Billing</h4>
              <p class="mb-0 text-left">{{ order.billingAddress.name }}</p>
              <p class="mb-0 text-left">
                {{ order.billingAddress.addressline1 }}
              </p>
              <p class="mb-0 text-left">
                {{ order.billingAddress.addressline2 }}
              </p>
              <p class="text-left">
                {{ order.billingAddress.city }},
                {{ order.billingAddress.state }}
                {{ order.billingAddress.zipcode }}
              </p>
              <h4>Shipping</h4>
              <p class="mb-0 text-left">{{ order.shippingAddress.name }}</p>
              <p class="mb-0 text-left">
                {{ order.shippingAddress.addressline1 }}
              </p>
              <p class="mb-0 text-left">
                {{ order.shippingAddress.addressline2 }}
              </p>
              <p class="text-left">
                {{ order.shippingAddress.city }},
                {{ order.shippingAddress.state }}
                {{ order.shippingAddress.zipcode }}
              </p>
              <p class="red-text"><strong>Testing feature</strong>: click the Mark fulfilled button to move your order into the previous orders category.</p>
              <button
                :tabIndex="-1"
                @click="$store.dispatch('markOrderFilled', order)"
                class="btn btn-primary"
              >
                Mark fulfilled
              </button>
            </div>
          </template>
        </accordion>
      </div>
    </div>
    <div v-else>
      <p class="text-left">
        No open orders
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
<style lang="scss" scoped></style>
