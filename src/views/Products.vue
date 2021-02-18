<template>
  <div>
    <header class="title py-4 mb-4 px-0 h-100">
      <h1 class="mb-0">Find what you're looking for.</h1>
    </header>
    <b-container>
      <div>
        <b-row>
          <b-col
            xs="12"
            md="6"
            lg="4"
            v-for="product in products"
            :key="product.id"
          >
            <product-card :product="product" class="my-4">
              <p class="mt-4 ml-4 mb-0 text-left">
                <strong>{{ product.title }}</strong>
              </p>
              <p class="mb-4 ml-4 text-left">${{ price(product.price) }}</p>
            </product-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      lastAddedProduct: {}
    };
  },
  components: {
    ProductCard
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
  computed: {
    ...mapState({
      products: state => state.products
    })
  },
  methods: {
    price(productPrice) {
      return parseFloat(productPrice)
        .toFixed(2)
        .replace(/\.0+$/, "");
    }
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
