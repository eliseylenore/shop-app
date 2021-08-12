<template>
  <div>
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
    <router-link :to="{ name: 'ProductReview', params: { id: $store.state.product._id } }"
      >Review product</router-link
    >
    <div class="my-4" v-for="review in reviews" :key="review._id">
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
      <p class="mb-0">{{ review.username ? review.username : "Anonymous" }}</p>
      <p>{{ review.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviews: Array
  },
  computed: {
    averageRating() {
      if (this.reviews) {
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue.rating;
        let ratingSum = this.reviews.reduce(reducer, 0);
        return ratingSum / this.reviews.length;
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
</style>
