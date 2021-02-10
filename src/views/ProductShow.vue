<template>
  <div class="product-show">
    <b-container class="mt-5">
      <b-row>
        <b-col xs="12" sm="5" offset="1" class="px-sm-5">
          <img
            :src="'./../../img/' + product.img"
            alt=""
            class="w-100 product-img"
          />
        </b-col>
        <b-col xs="12" sm="5" class="text-left pt-5 pt-sm-0">
          <h2>
            {{ product.title }}
          </h2>
          <p>${{ product.price }}</p>
          <product-form :product="product" />
          <div class="my-4" :class="descriptionShowing ? 'closed' : 'open'">
            <button
              @click="toggleDescription"
              class="description d-flex align-items-center justify-content-start"
            >
              <h4 class="mb-0 mr-2">Description</h4>
              <img
                src="./../../public/img/expand-triangle.svg"
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
                src="./../../public/img/expand-triangle.svg"
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
      materialsShowing: false
    };
  },
  methods: {
    toggleDescription() {
      this.descriptionShowing = !this.descriptionShowing;
    },
    toggleMaterials() {
      this.materialsShowing = !this.materialsShowing;
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
