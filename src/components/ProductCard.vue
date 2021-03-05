<template>
  <div class="product-card d-flex flex-column align-items-center">
    <button class="w-100 px-0" v-on:click="goToProduct">
      <div
        class="product-image"
        :aria-label="product.alt ? product.alt : ''"
        :style="{
          backgroundImage: 'url(/img/' + image + ')'
        }"
      ></div>
    </button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
      validator: propValue => {
        const isPNG = propValue.img.endsWith(".png");
        const isJPG =
          propValue.img.endsWith(".jpg") || propValue.img.endsWith(".jpeg");
        const hasValidExtension = isPNG || isJPG;

        return hasValidExtension;
      }
    }
  },
  methods: {
    goToProduct: function() {
      this.$router.push({
        name: "ProductShow",
        params: {
          id: this.product._id
        }
      });
    }
  },
  computed: {
    image() {
      if (this.product.selectedItem) {
        return this.product.selectedItem.img;
      }
      return this.product.img;
    }
  }
};
</script>

<style lang="scss" scoped>
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
  &:focus-visible {
    @include focus-glow($scienceBlue);
  }
}

.product-image {
  height: 20em;
  background-size: cover;
  background-position: center;
  background-repeat: none;
}
</style>
