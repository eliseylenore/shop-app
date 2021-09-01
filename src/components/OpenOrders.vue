<template>
  <div class="open-orders">
    <div v-if="openOrders.length > 1">
      <h3 class="text-left mb-4">
        Your open order<span v-if="openOrders.length > 1">s</span>
      </h3>
      <div v-for="order in openOrders.slice().reverse()" :key="order._id">
        <div class="mb-4">
          <button @click="headerClicked" class="btn w-100 panel-header">
            {{ getDate(order.orderDate) }}
          </button>
          <div class="panel">
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
    price: productPrice => getFormattedValue(productPrice, 2),
    // using accordion solution from this youTube  video https://www.youtube.com/watch?v=4BGfvKpP-b0&t=10s
    headerClicked(_event) {
      console.log(_event);
      _event.currentTarget.classList.toggle("active");
      const allPanels = document.getElementsByClassName("panel");
      allPanels.forEach(panel => {
        if (_event.currentTarget.nextElementSibling !== panel) {
          panel.style.maxHeight = null;
        }
        panel.previousElementSibling.classList.remove("active");
      });
      let thisPanel = _event.currentTarget.nextElementSibling;
      console.log(thisPanel.style.maxHeight);
      if (thisPanel.style.maxHeight) {
        thisPanel.style.maxHeight = null;
      } else {
        thisPanel.style.maxHeight = thisPanel.scrollHeight + "px";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.open-orders .product-image {
  height: 10em;
}
.panel-header {
  border: 1px solid #ced4da;
  &.active {
    background-color: $turquoise;
    color: white;
  }
}
.panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
</style>
