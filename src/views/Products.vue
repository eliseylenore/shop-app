<template>
  <b-container>
    <div>
      <h1 class="mt-md-5">Products</h1>
      <b-row>
        <b-col xs="12" md="4" v-for="product in products" :key="product.id">
          <product-card :product="product" class="my-4"/>
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
  computed: mapState(["products"])
};
</script>
