<template>
  <div class="mt-5">
    <b-container>

      <header class="mb-4">
        <h1>Review product</h1>
        <h2>{{ product.title }}</h2>
      </header>
      <b-row v-if="!productError">
        <b-col xs="12" md="8" lg="4" offset-md="2" offset-lg="4">
          <b-form @submit.prevent="submitReview">
            <h4 class="text-left" id="rating" style="font-weight: normal">
              Rating
            </h4>
            <div
              class="d-flex flex-row flex-wrap"
              role="radiogroup"
              aria-labelledby="rating"
            >
              <div v-for="n in 5" :key="n">
                <input
                  type="radio"
                  :id="n"
                  :value="n"
                  name="n"
                  v-model="rating"
                  class="rating"
                  :aria-checked="rating === n ? 'true' : 'false'"
                />
                <label :for="n" class="mb-0 mr-1">
                  <div :class="['rating', rating >= n ? 'active' : '']"></div>
                  <span class="sr-only">
                    {{ n }}
                  </span>
                </label>
              </div>
            </div>
            <b-form-group>
              <label for="nickname">
                Choose a nickname. For privacy, do not use your full name.
              </label>
              <b-form-input
                v-model="nickname"
                type="text"
                name="nickname"
                value
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="review-text">
                Review text
              </label>
              <b-form-textarea
                v-model="reviewText"
                :state="reviewText.length < 10 ? null : reviewText.length < 299"
                type="text"
                name="review-text"
                value
                rows="3"
              ></b-form-textarea>
              <div v-if="reviewText.length > 300">
                <p class="mt-3 red-text">
                  300 character limit ({{ reviewText.length - 300 }} above limit)
                </p>
              </div>
            </b-form-group>

            <button type="submit" name="button" class="btn btn-primary">
              Save
            </button>
            <!-- <div v-if="editError">
              <p v-for="err in editError" :key="err" class="mt-3 red-text">
                {{ err }}
              </p>
            </div> -->
          </b-form>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col xs="12" md="8" lg="4" offset-md="2" offset-lg="4">
          <p class="text-center">This product was not found.</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      showPasswordForm: false,
      nickname: "",
      reviewText: "",
      rating: null
    };
  },
  created() {
    this.$store
      .dispatch("fetchProduct", this.$route.params.id)
      .catch(err => console.log(err));
    // if (!this.$store.state.user.name) {
    //   this.$store.dispatch("fetchUserInfo");
    // }
  },
  computed: {
    ...mapState(["user", "product", "reviewError", "productError"])
  },
  methods: {
    async submitReview() {
      if (Object.keys(this.product).length === 0) {
        try {
          await this.$store.dispatch("fetchProduct", this.$route.params.id);
        } catch (err) {
          console.log(err);
        }
      }
      console.log("reset product!", this.product._id);
      this.$store
        .dispatch("submitReview", {
          nickname: this.nickname,
          reviewText: this.reviewText,
          rating: this.rating,
          product_id: this.product._id
        })
        .then(() => {
          this.$router.push({
            name: "ProductShow",
            params: { id: this.product._id }
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.rating {
  width: 1em;
  height: 1em;
  background-size: cover;
  &.active {
    background-image: url("/img/star-1.svg");
  }
  &:not(.active) {
    background-image: url("/img/star-0.svg");
  }
}
</style>
