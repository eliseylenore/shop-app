<template>
  <div>
    <div v-if="!editMode">
      <span v-for="n in 5" :key="n">
        <img
          v-if="n <= review.rating"
          src="/img/star-1.svg"
          alt="full-star"
          class="small-star-icon"
          title="Your cart"
        />
        <img
          v-if="n > review.rating"
          src="/img/star-0.svg"
          alt="full-star"
          class="small-star-icon"
          title="Your cart"
        />
      </span>
      <p>{{ thisReviewDate(review.date) }}</p>
      <p class="mb-0">{{ review.text }}</p>
      <p class="mb-0">
        - {{ review.username ? review.username : "Anonymous" }}
      </p>
      <button
        v-if="review.useremail === $store.state.user.email"
        v-on:click="editMode = !editMode"
        class="btn btn-primary"
      >
        Edit
      </button>
    </div>
    <edit-review
      v-if="editMode"
      v-on:changeEditMode="editMode = false"
      :review="review"
      productId="this.$router.params.id"
    />
  </div>
</template>

<script>
import EditReview from "@/components/EditReview.vue";
import { formattedDate } from "../commons/utils";

export default {
  components: {
    EditReview
  },
  props: {
    review: Object
  },
  data() {
    return {
      editMode: false
    };
  },
  methods: {
    thisReviewDate: reviewDate => formattedDate(reviewDate)
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
</style>
