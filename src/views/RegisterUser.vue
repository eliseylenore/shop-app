<template>
  <div class="mt-5">
    <b-container>
      <header>
        <h1>
          Register
        </h1>
      </header>
      <b-row>
        <b-col xs="12" md="8" offset-md="2">
          <b-form @submit.prevent="register">
            <b-form-group>
              <label for="name">
                Name:
              </label>
              <b-form-input
                v-model="name"
                type="text"
                name="name"
                autocomplete="name"
                value
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="email">
                Email:
              </label>
              <b-form-input
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                value
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="password">
                Password:
              </label>
              <b-form-input
                v-model="password"
                type="password"
                name="password"
                value
                autocomplete="new-password"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="password">
                Re-type your password:
              </label>
              <b-form-input
                v-model="password2"
                type="password"
                name="password2"
                value
                autocomplete="new-password"
              ></b-form-input>
            </b-form-group>
            <button type="submit" name="button">
              Register
            </button>
            <div v-if="registerError">
              <p v-for="err in registerError" :key="err" class="mt-3 red-text">
                {{ err }}
              </p>
            </div>
          </b-form>
          <div class="mt-4 d-flex">
            <p class="mr-2">Already have an account?</p>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </div>
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
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  },
  computed: {
    ...mapState(["registerError"])
  },
  methods: {
    register() {
      this.$store
        .dispatch("registerUser", {
          name: this.name,
          email: this.email,
          password: this.password,
          password2: this.password2
        })
        .then(() => {
          if (!this.registerError) this.$router.push({ name: "Dashboard" });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
