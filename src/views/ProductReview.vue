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
              type="text"
              name="review-text"
              value
              rows="3"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group>
            <label for="rating">
              Rating
            </label>
            <b-form-select
              v-model="rating"
              :options="[1, 2, 3, 4, 5]"
            ></b-form-select>
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
      rating: 5
    };
  },
  created() {
    if (!this.$store.state.user.name) {
      this.$store.dispatch("fetchUserInfo");
    }
  },
  computed: {
    ...mapState(["user", "product"])
  },
  methods: {
    submitReview() {
      alert("Review submitted");
      // const editedUser = {
      //   name: this.user.name,
      //   email: this.user.email
      // };
      // if (this.password1) {
      //   editedUser.password = this.password1;
      // }
      // if (this.password2) {
      //   editedUser.password2 = this.password2;
      // }
      // this.$store.dispatch("editUser", editedUser).then(() => {
      //   if (!this.editError) this.$router.push({ name: "Dashboard" });
      // });
    }
  }
};
</script>

<style lang="scss" scoped></style>
