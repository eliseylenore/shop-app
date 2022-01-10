<template>
  <div class="product-show">
    <b-container class="mt-5">
      <b-row>
        <b-col xs="12" sm="5" class="px-md-5">
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
          <p>${{ price(product.price) }}</p>
          <product-form :product="product" />
          <div class="my-4" :class="descriptionShowing ? 'closed' : 'open'">
            <button
              @click="toggleDescription"
              class="description d-flex align-items-center justify-content-start btn"
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
              class="materials d-flex align-items-center justify-content-start btn"
            >
              <h4 class="mb-0 mr-2">Materials and care</h4>
              <img
                src="./../../public/img/expand-triangle.svg"
                alt=""
                style="height: 0.7em;"
              />
            </button>
            <p v-if="materialsShowing">{{ product.materials }}</p>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12" class="my-5 px-md-5">
          <div class="d-flex align-items-center mb-2">
            <h3 class="text-left mr-3 mb-0">Reviews</h3>
            <span
              v-for="n in 5"
              :key="n"
              :title="'Average ' + averageRating + ' out of 5 stars'"
              class="pb-2"
            >
              <img
                v-if="n - 0.3 < averageRating"
                src="/img/star-1.svg"
                alt="full-star"
                class="star-icon"
              />
              <img
                v-if="n + 0.3 <= averageRating && n + 0.7 >= averageRating"
                src="/img/star-0.5.svg"
                alt="full-star"
                class="star-icon"
              />
              <img
                v-if="averageRating < n - 0.7"
                src="/img/star-0.svg"
                alt="full-star"
                class="star-icon"
              />
            </span>
            <p class="mb-0 pl-3">{{ getReviewCount }} reviews</p>
          </div>
          <button
            v-if="!reviewsExpanded"
            class="btn btn-primary"
            @click="reviewsExpanded = true"
          >
            Show reviews
          </button>
          <div v-if="reviewsExpanded">
            <b-form-group>
              <b-form-select
                v-model="selectedSort"
                :options="options"
                class="w-auto"
              ></b-form-select>
            </b-form-group>
            <hr />
            <div
              v-for="review in getReviews(selectedSort).slice(0, numberReviews)"
              :key="review._id"
              class="mt-3"
            >
              <review :review="review" />
              <hr />
            </div>
            <button
              v-if="!allReviewsShown"
              class="btn btn-primary"
              @click="showAllReviews"
            >
              Show all reviews
            </button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getFormattedValue } from "../commons/utils";
import { mapState, mapGetters } from "vuex";
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
      materialsShowing: false,
      reviewsExpanded: false,
      allReviewsShown: false,
      numberReviews: 5,
      options: [
        { value: "date", text: "Most recent" },
        { value: "highestRated", text: "Highest Rated" },
        { value: "lowestRated", text: "Lowest Rated" }
      ],
      selectedSort: "date"
    };
  },
  created() {
    this.$store.dispatch("fetchProduct", this.$route.params.id);
  },
  methods: {
    price: productPrice => getFormattedValue(productPrice, 2),
    toggleDescription() {
      this.descriptionShowing = !this.descriptionShowing;
    },
    toggleMaterials() {
      this.materialsShowing = !this.materialsShowing;
    },
    showAllReviews() {
      this.allReviewsShown = true;
      this.numberReviews = this.getReviewCount;
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
    ...mapGetters(["getReviews", "getReviewCount"]),
    averageRating() {
      if (this.product.reviews) {
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue.rating;
        let ratingSum = this.product.reviews.reduce(reducer, 0);
        let average = ratingSum / this.product.reviews.length;
        return Math.round(average * 10) / 10;
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
.w-md-25 {
  width: 100%;
}
@media screen and (min-width: 768px) {
  .w-md-25 {
    width: 25%;
  }
}
</style>
