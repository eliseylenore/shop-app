<template>
  <div
    :class="[
      'product-card d-flex align-items-center',
      align !== 'horizontal' ? 'flex-column' : ''
    ]"
  >
    <button
      :class="['plain-btn px-0', 'w-' + width]"
      v-on:click="goToProduct"
      :tabindex="tabIndex === -1 ? -1 : ''"
    >
      <p class="sr-only">Go to {{ product.title }}</p>
      <div
        class="product-image"
        :aria-label="product.alt ? product.alt : ''"
        :style="{
          backgroundImage: 'url(/img/' + image + ')',
          height
        }"
      ></div>
    </button>
    <div class="h-100 w-100">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
      validator: propValue => {
        if (propValue.img !== undefined) {
          const isPNG = propValue.img.endsWith(".png");
          const isJPG =
            propValue.img.endsWith(".jpg") || propValue.img.endsWith(".jpeg");
          const hasValidExtension = isPNG || isJPG;

          return hasValidExtension;
        } else return false;
      }
    },
    width: {
      type: Number,
      default: 100,
      validator: propValue => {
        let validValues = [0, 25, 75, 100];
        return validValues.includes(propValue);
      }
    },
    height: {
      default: "20em",
      type: String
    },
    tabIndex: {
      required: false,
      type: Number
    },
    align: {
      type: String
    }
  },
  methods: {
    goToProduct: function() {
      let productId;
      if (this.product.productId) {
        productId = this.product.productId;
      } else {
        productId = this.product._id;
      }
      this.$router.push({
        name: "ProductShow",
        params: {
          id: productId
        }
      });
    }
  },
  computed: {
    image() {
      if (this.product.selectedHex) {
        let selectedObj = this.product.items.find(
          obj => obj.hex === this.product.selectedHex
        );
        return selectedObj.img;
      } else if (this.product.img) {
        return this.product.img;
      }
      return "no-image.png";
    }
  }
};
</script>

<style lang="scss" scoped>
h4 {
  font-weight: normal;
  color: #000;
}
.product-card {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}
.product-card button.plain-btn {
  padding: 0;
  border: none;
  background-color: white;
  color: black;
}

.product-image {
  background-size: cover;
  background-position: center;
  background-repeat: none;
}
</style>
