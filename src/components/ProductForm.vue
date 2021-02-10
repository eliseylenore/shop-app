<template>
  <form @submit.prevent="addToCart(product)">
    <h4 class="text-left">Color</h4>
    <div class="d-flex flex-row">
      <div v-for="color in product.colors" :key="product.colors.indexOf(color)">
        <label :for="color">
          <input
            type="radio"
            :id="color"
            :value="color"
            style="display: none;"
            v-model="product.selectedHex"
            class="color-swatch"
          />
          <div
            :style="'background-color: ' + color"
            :class="[
              'color-swatch',
              'mr-1',
              product.selectedHex === color ? 'active' : ''
            ]"
          ></div>
          <span class="sr-only">
            {{ color }}
          </span>
        </label>
      </div>
    </div>
    <b-row>
      <b-col xs="6">
        <h4 class="text-left">Size</h4>
        <div class="d-flex flex-row">
          <div v-for="size in Object.keys(product.sizes)" :key="size">
            <label
              :for="size"
              :class="[
                'size-listing',
                'pr-2',
                product.selectedSize === size ? 'active' : '',
                selectedColorSizes[size] ? '' : 'disabled'
              ]"
            >
              <input
                type="radio"
                :disabled="!selectedColorSizes[size]"
                :id="size"
                :value="size"
                style="display: none;"
                v-model="product.selectedSize"
              />
              {{ size }}
            </label>
          </div>
        </div>
      </b-col>
      <b-col xs="6">
        <h4><label class="mb-0" for="quantity">Quantity</label></h4>
        <select
          id="quantity"
          v-model.number="product.quantity"
          class="form-control"
        >
          <option v-for="n in maxQuantity" :key="n"> {{ n }}</option>
        </select>
      </b-col>
    </b-row>
    <button type="submit">
      Add to cart
    </button>
    <p
      v-for="error in errors"
      :key="errors.indexOf(error)"
      class="red-text mt-2"
    >
      {{ error }}
    </p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      errors: []
    };
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart(product) {
      this.errors = [];
      if (this.product.selectedSize) {
        this.$store.dispatch("addToCart", product);
      } else {
        this.errors.push("Size required");
      }
    }
  },
  computed: {
    selectedColorSizes() {
      let currentColorSizes = {};
      for (let size of Object.keys(
        this.$store.state.product.items[this.product.selectedHex].sizes
      )) {
        if (!currentColorSizes[size]) {
          currentColorSizes[size] = this.$store.state.product.items[
            this.product.selectedHex
          ].sizes[size];
        }
      }
      return currentColorSizes;
    },
    maxQuantity() {
      let numberAvailable = this.$store.state.product.items[
        this.product.selectedHex
      ].sizes[this.product.selectedSize];
      if (numberAvailable > 10) {
        return 10;
      } else {
        return numberAvailable;
      }
    }
  }
};
</script>

<style lang="scss">
h4 {
  text-align: left;
  font-weight: bold;
}
.red-text {
  color: rgb(163, 35, 25);
}
.color-swatch {
  height: 2em;
  width: 2em;
}
.color-swatch.active {
  border: 3px solid #ff744e;
}
label.disabled {
  color: grey;
}
.size-listing {
  text-transform: capitalize;
  &.active {
    font-weight: bold;
  }
}
</style>
