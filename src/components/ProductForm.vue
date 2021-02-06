<template>
  <form>
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
    <h4 class="text-left">Size</h4>
    <div class="d-flex flex-row">
      <div v-for="size in product.sizes" :key="product.sizes.indexOf(size)">
        <label
          :for="size"
          :class="[
            'size-listing',
            'pr-2',
            product.selectedSize === size ? 'active' : ''
          ]"
        >
          <input
            type="radio"
            :id="size"
            :value="size"
            style="display: none;"
            v-model="product.selectedSize"
          />
          {{ size }}
        </label>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    product: {
      type: Object
    }
  }
  // data() {
  //   return {
  //     selectedColor: this.product.colors[0]
  //   };
  // },
};
</script>

<style lang="scss">
h4 {
  text-align: left;
  font-weight: bold;
}

.color-swatch {
  height: 2em;
  width: 2em;
}
.color-swatch.active {
  border: 3px solid #ff744e;
}
.size-listing {
  text-transform: capitalize;
  &.active {
    font-weight: bold;
  }
}
</style>
