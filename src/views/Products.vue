<template>
  <b-container>
    <div>
      <h1 class="mt-md-5">Products</h1>
      <b-row>
        <b-col xs="12" md="4" v-for="product in products" :key="product.id">
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
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import { mapState } from "vuex";
export default {
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
