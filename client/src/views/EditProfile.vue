<template>
  <div class="mt-5">
    <header>
      <h1>Edit profile</h1>
    </header>
    <b-row>
      <b-col xs="12" md="8" lg="4" offset-md="2" offset-lg="4">
        <b-form @submit.prevent="edit">
          <b-form-group>
            <label for="name">
              Name
            </label>
            <b-form-input
              v-model="user.name"
              type="text"
              name="name"
              value
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <label for="email">
              Email
            </label>
            <b-form-input
              v-model="user.email"
              type="email"
              name="email"
              autocomplete="email"
              value
            ></b-form-input>
          </b-form-group>
          <button
            v-if="!showPasswordForm"
            @click="togglePasswordForm"
            class="mr-4 btn btn-secondary"
          >
            Update password
          </button>
          <b-form-group v-if="showPasswordForm">
            <label for="password">
              New password
            </label>
            <b-form-input
              v-model="password1"
              type="password"
              name="password"
              value
            ></b-form-input>
          </b-form-group>
          <b-form-group v-if="showPasswordForm">
            <label for="password">
              Re-type new password:
            </label>
            <b-form-input
              v-model="password2"
              type="password"
              name="password2"
              value
            ></b-form-input>
          </b-form-group>
          <button type="submit" name="button" class="btn btn-primary">
            Save
          </button>
          <div v-if="editError">
            <p v-for="err in editError" :key="err" class="mt-3 red-text">
              {{ err }}
            </p>
          </div>
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
      password1: "",
      password2: ""
    };
  },
  created() {
    if (!this.$store.state.user.name) {
      this.$store.dispatch("fetchUserInfo");
    }
  },
  computed: {
    ...mapState(["user", "editError"])
  },
  methods: {
    togglePasswordForm() {
      this.showPasswordForm = !this.showPasswordForm;
    },
    edit() {
      const editedUser = {
        name: this.user.name,
        email: this.user.email
      };
      if (this.password1) {
        editedUser.password = this.password1;
      }
      if (this.password2) {
        editedUser.password2 = this.password2;
      }
      this.$store.dispatch("editUser", editedUser).then(() => {
        if (!this.editError)
          this.$router.push({ name: "Dashboard", params: { page: "profile" } });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
