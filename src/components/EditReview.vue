<template>
  <div class="mt-3">
    <b-form @submit.prevent="editReview">
      <b-form-group>
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
      <b-form-group>
        <label for="rating">
          Rating
        </label>
        <b-form-select
          v-model="review.rating"
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

<style lang="scss" scoped></style>
