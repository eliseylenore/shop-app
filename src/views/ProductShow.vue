<template>
  <div class="product-show">
    <b-container class="mt-5">
      <b-row>
        <b-col xs="12" sm="5" offset="1" class="px-sm-5">
          <img
            :src="'./../../' + product.img"
            alt=""
            class="w-100 product-img"
          />
        </b-col>
        <b-col xs="12" sm="5" class="text-left pt-5 pt-sm-0">
          <h2>
            {{ product.title }}
          </h2>
          <p>${{ product.price }}</p>
          <product-form :product="product"/>
          <div class="mt-4">
              <!-- <b-col xs="6">
                <h4><label for="quantity">Quantity</label></h4>
                <select id="quantity" v-model.number="product.selectedHex">
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </select>
              </b-col> -->
          </div>
          <button class="" @click="addToCart(product)">
            Add to cart
          </button>
          <p
            v-for="error in errors"
            :key="errors.indexOf(error)"
            class="red-text mt-2"
          >
            {{ error }}
          </p>
          <div class="my-4" :class="descriptionShowing ? 'closed' : 'open'">
            <button
              @click="toggleDescription"
              class="description d-flex align-items-center justify-content-start"
            >
              <h4 class="mb-0 mr-2">Description</h4>
              <img
                src="./../../public/expand-triangle.svg"
                alt=""
                style="height: 0.7em;"
              />
            </button>
            <p v-if="descriptionShowing">{{ product.description }}</p>
          </div>
          <div class="my-4" :class="materialsShowing ? 'closed' : 'open'">
            <button
              @click="toggleMaterials"
              class="materials d-flex align-items-center justify-content-start"
            >
              <h4 class="mb-0 mr-2">Materials and care</h4>
              <img
                src="./../../public/expand-triangle.svg"
                alt=""
                style="height: 0.7em;"
              />
            </button>
            <p v-if="materialsShowing">Materials and care</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductForm from "@/components/ProductForm.vue";
export default {
  components: {
    ProductForm
  },
  created() {
    this.$store.dispatch("fetchProduct", this.$route.params.id);
  },
  data() {
    return {
      descriptionShowing: true,
      materialsShowing: false,
      errors: []
    };
  },
  methods: {
    toggleDescription() {
      this.descriptionShowing = !this.descriptionShowing;
    },
    toggleMaterials() {
      this.materialsShowing = !this.materialsShowing;
    },
    changeSize(size) {
      this.$store.dispatch("changeProductSelectedSize", size);
    },
    addToCart(product) {
      this.errors = [];
      if (this.product.selectedSize) {
        this.$store.dispatch("addToCart", product);
      } else {
        this.errors.push("Size required");
      }
    }
  },
  computed: mapState({
    product: state => state.product
  })
};
</script>

<style lang="scss" scoped>
h2,
h3,
h4 {
  text-align: left;
  font-weight: bold;
}

.red-text {
  color: red;
}
button.description,
button {
  &.materials,
  &.description {
    background-color: transparent;
    padding: 0;
    color: #000;
  }
}

.closed img {
  -webkit-transition: 0.3s ease-in-out;
  -webkit-transform: rotate(90deg);
}
.open img {
  -webkit-transition: 0.3s ease-in-out;
  -webkit-transform: rotate(0deg);
}
.product-img {
  box-shadow: 3px 3px 15px rgba(163, 35, 25, 0.4);
}
</style>
