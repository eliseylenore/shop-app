<template>
  <div class="product-card d-flex flex-column align-items-center">
    <button class="w-100 mt-3">
      <img :src="product.img" alt="" />
      <h4>{{ product.title }}</h4>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Park Cleanup"
    };
  },
  props: {
    product: {
      type: Object
    }
  }
};
</script>

<style>
h4 {
  color: #000;
}
.product-card button {
  border: none;
  background-color: white;
  color: black;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
