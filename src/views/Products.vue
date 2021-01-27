<template>
  <div>
    <h1 class="mt-md-5">Products</h1>
    <b-row>
      <b-col xs="12" md="4" v-for="product in products" :key="product.id">
        <product-card :product="product" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import axios from "axios";
export default {
  components: {
    ProductCard
  },
  created() {
    axios
      .get("http://localhost:3000/products")
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  },
  data() {
    return {
      products: [],
      product: {
        id: 1,
        title: "Dad jeans",
        img: require("./../assets/img/cast-kristi.png"),
        price: "28.50",
        items: [
          {
            id: 5551,
            size: 6,
            color: "purple"
          },
          {
            id: 5552,
            size: 6,
            color: "purple"
          },
          {
            id: 5553,
            size: 6,
            color: "blue"
          }
        ]
      }
    };
  }
};
</script>
