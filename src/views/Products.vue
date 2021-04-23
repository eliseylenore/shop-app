<template>
  <div>
    <header class="title py-4 mb-4 px-0 h-100">
      <h1 class="mb-0 white">
        <!-- take route and convert  it to page name  -->
        {{ category }}
      </h1>
    </header>
    <b-container>
      <div>
        <b-row>
          <b-col
            xs="12"
            md="6"
            lg="4"
            v-for="product in products"
            :key="product._id"
          >
            <product-card :product="product" class="my-4">
              <div class="d-flex flex-column align-items-center">
                <p class="mt-4 mb-0 text-left">
                  <strong>{{ product.title }}</strong>
                </p>
                <p class="text-left">${{ price(product.price) }}</p>
                <div
                  class="d-flex flex-row mb-3"
                  role="radiogroup"
                  :aria-label="product.title + ' colors'"
                >
                  <div v-for="item of product.items" :key="item._id">
                    <input
                      type="radio"
                      :id="item.hex"
                      :value="item.hex"
                      :name="product.title + 'colors'"
                      v-model="product.selectedHex"
                      class="color-swatch"
                      :aria-checked="
                        product.selectedHex === item.hex ? 'true' : 'false'
                      "
                    />
                    <label :for="item.hex" class="mb-0 mr-1">
                      <div
                        :style="'background-color: ' + item.hex"
                        :class="[
                          'color-swatch',
                          product.selectedHex === item.hex ? 'active' : ''
                        ]"
                      ></div>
                      <span class="sr-only">
                        {{ item.hex }}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </product-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { getFormattedValue } from "../commons/utils";
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      lastAddedProduct: {}
    };
  },
  created() {
    if (this.$route.params.category !== undefined) {
      this.$store.dispatch(
        "fetchFilteredProducts",
        this.$route.params.category
      );
    } else {
      this.$store.dispatch("fetchProducts");
    }
  },
  computed: {
    ...mapState({
      products: state => state.products
    }),
    category() {
      return this.$route.params.category !== undefined
        ? this.$route.params.category.charAt(0).toUpperCase() +
            this.$route.params.category.slice(1)
        : "Find what you're looking for.";
    }
  },
  watch: {
    $route(to) {
      if (to.params.category !== undefined) {
        this.$store.dispatch("fetchFilteredProducts", to.params.category);
      } else {
        this.$store.dispatch("fetchProducts");
      }
    }
  },
  methods: {
    price: productPrice => getFormattedValue(productPrice, 2)
  }
};
</script>

<style lang="scss" scoped>
.title {
  background-color: $persimmon;

  h1 {
    color: white;
    font-weight: bold;
  }
}
</style>
