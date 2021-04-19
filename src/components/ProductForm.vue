<template>
  <form @submit.prevent="addToCart(product)">
    <modal :product="lastAddedProduct" />
    <h4 class="text-left" id="color-title">Color</h4>
    <div
      class="d-flex flex-row"
      role="radiogroup"
      aria-labelledby="color-title"
    >
      <div v-for="color in product.colors" :key="product.colors.indexOf(color)">
        <input
          type="radio"
          :id="color"
          :value="color"
          name="color"
          v-model="product.selectedHex"
          @click="changeSelectedItem(color)"
          class="color-swatch"
          :aria-checked="product.selectedHex === color ? 'true' : 'false'"
        />
        <label :for="color" class="mb-0 mr-1">
          <div
            :style="'background-color: ' + color"
            :class="[
              'color-swatch',
              product.selectedHex === color ? 'active' : ''
            ]"
          ></div>
          <span class="sr-only">
            {{ color }}
          </span>
        </label>
      </div>
    </div>
    <!-- <p>{{ product.items.find(obj => obj.hex === color).color }}</p> -->
    <b-row>
      <b-col xs="6">
        <h4 class="text-left" id="size-title">
          Size
        </h4>
        <p class="red-text mb-0" id="size-error">
          {{ errors.size ? errors.size : "" }}
        </p>
        <div
          class="d-flex flex-row"
          role="radiogroup"
          aria-labelledby="size-title"
          aria-describedby="size-error"
        >
          <div v-for="size in product.sizes" :key="size">
            <input
              type="radio"
              :disabled="!selectedColorSizes[size]"
              :id="size"
              :value="size"
              v-model="product.selectedSize"
              name="size"
              aria-required="true"
            />
            <label :for="size" :class="sizeClasses(size)">
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
          aria-describedby="quantity-error"
        >
          <option v-for="n in maxQuantity" :key="n"> {{ n }}</option>
        </select>
        <p class="red-text mb-0" id="size-error">
          {{ errors.quantity ? errors.quantity : "" }}
        </p>
      </b-col>
    </b-row>
    <button type="submit">
      Add to cart
    </button>
  </form>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  data() {
    return {
      errors: {},
      lastAddedProduct: {}
    };
  },
  components: {
    Modal
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
      // check if quantity exceeds amount
      let quantityExceedsAvailable = false;
      // checks database
      if (
        this.product.selectedItem.sizes[product.selectedSize] < product.quantity
      ) {
        this.errors.quantity = "Please select an available quantity.";
        quantityExceedsAvailable = true;
      }
      //checks cart
      for (let item of this.$store.state.cart) {
        if (
          item.productId === product.id &&
          item.hex === product.selectedHex &&
          item.size === product.selectedSize
        ) {
          let totalQuantity = item.quantity + product.quantity;
          if (totalQuantity > item.sizes[product.selectedSize]) {
            this.errors.quantity =
              "That quantity is not available. Please select a lower quantity.";
            quantityExceedsAvailable = true;
          }
        }
      }

      if (!this.product.selectedSize) {
        this.errors.size = "Size required";
      } else if (!this.selectedColorSizes[this.product.selectedSize]) {
        this.errors.size = "Please select available size.";
      } else if (!quantityExceedsAvailable) {
        // iterate through items to see if already have one in there
        let matchFound = false;
        let itemId;
        let selectedProduct = {};
        for (let item of this.$store.state.cart) {
          if (
            item.hex === product.selectedHex &&
            item.size === product.selectedSize
          ) {
            matchFound = true;
            itemId = item._id;
          }
        }
        if (!matchFound) {
          let {
            selectedItem,
            title,
            selectedSize,
            price,
            quantity,
            _id
          } = product;
          selectedProduct = {
            color: selectedItem.color,
            hex: selectedItem.hex,
            img: selectedItem.img,
            size: selectedSize,
            title: title,
            productId: _id,
            price: price,
            quantity: quantity
          };
          this.$store.dispatch("addToCart", { product, selectedProduct });
        } else {
          let { quantity } = product;
          // TO-DO: create this action
          this.$store.dispatch("addToItemQuantity", {
            _id: itemId,
            quantity
          });
        }

        this.lastAddedProduct = this.product;
        this.$bvModal.show("modal-1");
      }
    },
    sizeClasses(size) {
      let classes = ["size-listing", "mr-2"];
      if (!this.selectedColorSizes[size]) {
        classes.push("disabled");
      } else if (this.product.selectedSize === size) {
        classes.push("active");
      }
      return classes;
    },
    changeSelectedItem(color) {
      const selectedHexItem = this.product.items.find(obj => obj.hex === color);
      this.$store.commit("SET_PRODUCT_ITEM", selectedHexItem);
    }
  },
  computed: {
    selectedColorSizes() {
      let currentColorSizes = {};
      for (let size of Object.keys(this.product.selectedItem.sizes)) {
        if (!currentColorSizes[size]) {
          currentColorSizes[size] = this.product.selectedItem.sizes[size];
        }
      }
      return currentColorSizes;
    },
    maxQuantity() {
      if (this.product.selectedSize) {
        let numberAvailable = this.product.selectedItem.sizes[
          this.product.selectedSize
        ];
        if (numberAvailable > 10) {
          return 10;
        } else {
          return numberAvailable;
        }
      } else {
        return 10;
      }
    }
  }
};
</script>

<style lang="scss">
h4 {
  text-align: left;
  font-weight: bold;
  font-size: 1rem;
}
.red-text {
  color: rgb(163, 35, 25);
}

.size-listing {
  text-transform: capitalize;
  &.active:not(.disabled) {
    font-weight: bold;
  }
}
</style>
