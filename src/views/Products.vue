<template>
  <div>
    <h1>Products</h1>
    <router-link :to="{ name: 'Product', params: { id: '1' } }">
      Product 1
    </router-link>
    <product-card :product="product" />
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
