<template>
  <div class="product-card d-flex flex-column align-items-center">
    <button class="w-100 mt-3 px-0" v-on:click="goToProduct">
      <div
        class="product-image"
        :aria-label="product.img"
        :style="'background-image: url(' + productImg + ')'"
      ></div>
      <h4 class="my-5">
        <strong>{{ product.title }}</strong> ${{ price }}
      </h4>
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
  },
  computed: {
    price() {
      return parseFloat(this.product.price)
        .toFixed(2)
        .replace(/\.0+$/, "");
    }
  },
  methods: {
    goToProduct: function() {
      this.$router.push({ name: "Product", params: { id: this.product.id } });
    },
    productImg: function() {
      return require(this.product.img);
    }
  }
};
</script>

<style>
h4 {
  font-weight: normal;
  color: #000;
}
.product-card button {
  border: none;
  background-color: white;
  color: black;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

.product-image {
  height: 20em;
  background-size: cover;
  background-position: center;
  background-repeat: none;
}
</style>
