<template>
  <div class="previous-orders">
    <h3 class="text-left mb-2">
      Your previous orders
    </h3>
    <div v-if="previousOrders.length > 1" class="mb-4">
      <div v-for="order in previousOrders.slice().reverse()" :key="order._id">
        <div class="">
          <button
            :id="'panel-' + order._id"
            @click="headerClicked(order._id, $event)"
            :class="[
              'btn w-100 panel-header',
              clickedOrder === order._id ? 'active' : ''
            ]"
            :aria-expanded="clickedOrder === order._id ? 'true' : 'false'"
          >
            {{ getDate(order.orderDate) }}
          </button>
          <div
            :class="['panel', clickedOrder === order._id ? 'active' : '']"
            role="region"
            :aria-hidden="clickedOrder === order._id ? 'true' : 'false'"
            :aria-labelledby="'panel-' + order._id"
          >
            <div class="p-4 grey-border">
              <div
                v-for="product in order.items"
                :key="product._id"
                class="mb-3"
              >
                <product-card
                  :product="product"
                  :tabIndex="clickedOrder === order._id ? '' : -1"
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
            </div>
          </div>
        </div>
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
    // this.$store.dispatch("fetchpreviousOrders");
  },
  computed: {
    ...mapState({
      previousOrders: state => state.user.fulfilledOrders
    })
  },
  methods: {
    getDate: orderDate => formattedDate(orderDate),
    price: productPrice => getFormattedValue(productPrice, 2),
    // using accordion solution from this youTube  video https://www.youtube.com/watch?v=4BGfvKpP-b0&t=10s
    headerClicked(orderId, _event) {
      this.clickedOrder === orderId
        ? (this.clickedOrder = "")
        : (this.clickedOrder = orderId);
      const allPanels = document.getElementsByClassName("panel");
      allPanels.forEach(panel => {
        if (_event.currentTarget.nextElementSibling !== panel) {
          panel.style.maxHeight = null;
        }
        panel.previousElementSibling.classList.remove("active");
      });
      let thisPanel = _event.currentTarget.nextElementSibling;
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
  padding-left: 2em;
  border-bottom: 1px solid #ced4da;
  &.active {
    background-color: $turquoise;
    color: white;
    border-bottom: none;
  }
  text-align: left;
  &::before {
    content: "+";
    font-size: 2em;
    color: #a3a7aa;
    position: absolute;
    margin-top: -0.5em;
    left: 0.7em;
  }
  &.active::before {
    content: "–";
    color: white;
  }
}
.panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.grey-border {
  border: 1px solid #ced4da;
}
</style>
