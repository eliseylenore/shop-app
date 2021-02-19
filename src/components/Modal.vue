<template>
  <div>
    <b-modal id="modal-1" ref="modal-1" title="Item added to cart" ok-only>
      <product-card
        v-if="product && Object.keys(product).length > 0"
        :product="product"
      >
        <b-row>
          <b-col xs="6">
            <p class="mt-4 ml-4 mb-0 text-left">
              <strong>{{ product.title }}</strong>
            </p>
            <p class="ml-4 mb-0 text-left">
              {{ product.items[product.selectedHex].color }}
            </p>
            <p class="ml-4 mb-0 text-left" style="text-transform: capitalize;">
              {{ product.selectedSize }}
            </p>
            <p class="mb-4 ml-4 text-left">${{ price }}</p>
          </b-col>
          <b-col xs="6">
            <p class="mt-4 ml-4 mb-0 text-left">
              Quantity: {{ product.quantity }}
            </p>
          </b-col>
        </b-row>
      </product-card>
    </b-modal>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
export default {
  components: {
    ProductCard
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
  }
};
</script>

<style lang="scss">
header.modal-header {
  background-color: $silver;
  color: $prussianBlue;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  justify-content: center;
  h5 {
    font-weight: bold;
    text-align: center;
  }
}

.modal-header .close {
  display: flex;
  justify-content: center;
  align-items: center;
}

button.close {
  position: absolute;
  top: -0.1rem;
  right: -0.15rem;
  border-radius: 100%;
  font-size: 1em;
  height: 2rem;
  width: 2rem;
  background-color: $scienceBlue;
  font-weight: bold;
  font-size: 1.5em;
}
.close:hover {
  color: white;
}
.close:not(:disabled):not(.disabled):hover,
.close:not(:disabled):not(.disabled):focus,
.close {
  opacity: 1;
}
</style>
