<template>
  <div class="product-show">
    <b-container class="mt-5">
      <b-row>
        <b-col xs="12" sm="5" offset="1" class="px-md-5">
          <div class="mr-lg-5 mr-0">
            <img
              :src="'./../../img/' + selectedImg"
              alt=""
              class="w-100 product-img "
            />
          </div>
        </b-col>
        <b-col xs="12" sm="5" class="text-left pt-5 pt-sm-0">
          <h2 class="mb-0 text-left">
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
      <b-row>
        <b-col xs="12" sm="5" offset="1" class="my-5 px-md-5">
          <div class="d-flex">
            <h3 class="text-left mr-3">Reviews</h3>
            <span v-for="n in 5" :key="n">
              <img
                v-if="n <= averageRating"
                src="/img/star-1.svg"
                alt="full-star"
                class="star-icon"
                title="Your cart"
              />
              <img
                v-if="n > averageRating"
                src="/img/star-0.svg"
                alt="full-star"
                class="star-icon"
                title="Your cart"
              />
            </span>
          </div>
          <router-link
            :to="{
              name: 'ProductReview',
              params: { id: $store.state.product._id }
            }"
            >Review product</router-link
          >
          <div v-for="review in product.reviews" :key="review._id" class="mt-3">
            <review :review="review" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductForm from "@/components/ProductForm.vue";
import Review from "@/components/Review.vue";
export default {
  components: {
    ProductForm,
    Review
  },
  data() {
    return {
      descriptionShowing: true,
      materialsShowing: false
    };
  },
  created() {
    this.$store.dispatch("fetchProduct", this.$route.params.id);
  },
  methods: {
    toggleDescription() {
      this.descriptionShowing = !this.descriptionShowing;
    },
    toggleMaterials() {
      this.materialsShowing = !this.materialsShowing;
    }
  },
  computed: {
    selectedImg() {
      if (this.product.items) {
        const selectedColor = this.product.items.find(
          element => element.hex === this.product.selectedHex
        );
        return selectedColor.img;
      }
      return this.product.img;
    },
    ...mapState({
      product: state => state.product
    }),
    averageRating() {
      if (this.product.reviews) {
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue.rating;
        let ratingSum = this.product.reviews.reduce(reducer, 0);
        return ratingSum / this.product.reviews.length;
      }
      return 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.star-icon {
  height: 1.5em;
}
.small-star-icon {
  height: 1em;
}
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
  &:focus-visible {
    @include focus-glow;
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
