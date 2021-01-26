<template>
  <div>
    <h1 class="mt-md-5">Products</h1>
    <b-row>
      <b-col xs="12" md="4">
        <product-card :product="product" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
export default {
  components: {
    ProductCard
  },
  data() {
    return {
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
