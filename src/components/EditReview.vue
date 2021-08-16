<template>
  <div class="mt-3">
    <b-form @submit.prevent="editReview">
      <b-form-group>
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
              v-model="review.rating"
              @click="changeRating(n)"
              class="rating"
              :aria-checked="review.rating === n ? 'true' : 'false'"
            />
            <label :for="n" class="mb-0 mr-1">
              <div
                :class="['rating', review.rating >= n ? 'active' : '']"
              ></div>
              <span class="sr-only">
                {{ n }}
              </span>
            </label>
          </div>
        </div>
        <label for="nickname">
          Choose a nickname. For privacy, do not use your full name.
        </label>
        <b-form-input
          v-model="review.username"
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
          v-model="review.text"
          :state="review.text.length < 10 ? null : review.text.length < 299"
          type="text"
          name="review-text"
          value
          rows="3"
        ></b-form-textarea>
        <div v-if="review.text.length > 300">
          <p class="mt-3 red-text">
            300 character limit ({{ review.text.length - 300 }} above limit)
          </p>
        </div>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    review: { type: Object, required: true },
    productId: { type: String, required: true }
  },
  computed: {
    ...mapState(["user", "product", "reviewError"])
  },
  methods: {
    async editReview() {
      this.$store
        .dispatch("editReview", {
          ...this.review,
          product_id: this.$store.state.product._id
        })
        .then(() => {
          this.$router.push({
            name: "ProductShow",
            params: { id: this.product._id }
          });
        });
      this.$emit("changeEditMode");
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
