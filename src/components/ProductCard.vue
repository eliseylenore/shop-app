<template>
  <div class="product-card d-flex flex-column align-items-center">
    <button class="w-100 px-0" v-on:click="goToProduct">
      <div
        class="product-image"
        :aria-label="product.alt"
        :style="'background-image: url(' + product.img + ')'"
      ></div>
      <p class="mt-4">
        <strong>{{ product.title }}</strong> 
      </p>
      <p class="mb-4">
        ${{ price }}
      </p>
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
    },
    importedImg() {
      console.log("type of", typeof this.product.img);
      return require(this.product.img);
    }
  },
  methods: {
    goToProduct: function() {
      this.$router.push({
        name: "ProductShow",
        params: { id: this.product.id }
      });
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
  padding: 0;
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
