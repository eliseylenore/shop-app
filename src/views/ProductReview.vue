<template>
  <div class="mt-5">
    <header class="mb-4">
      <h1>Review product</h1>
      <h2>{{ product.title }}</h2>
    </header>
    <b-row>
      <b-col xs="12" md="8" lg="4" offset-md="2" offset-lg="4">
        <b-form @submit.prevent="submitReview">
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
          <b-form-group>
            <label for="rating">
              Rating
            </label>
            <b-form-select
              v-model="rating"
              :options="[1, 2, 3, 4, 5]"
            ></b-form-select>
            <p v-if="reviewError" class="mt-3 red-text">
              {{ reviewError.rating }}
            </p>
          </b-form-group>
          <button type="submit" name="button">
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
    if (!this.$store.state.user.name) {
      this.$store.dispatch("fetchUserInfo");
    }
  },
  computed: {
    ...mapState(["user", "product", "reviewError"])
  },
  methods: {
    async submitReview() {
      alert("Review submitted");
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

<style lang="scss" scoped></style>
