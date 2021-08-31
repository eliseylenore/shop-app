<template>
  <div class="mt-5">
    <b-container>
      <header>
        <h1>
          Login
        </h1>
      </header>
      <b-row>
        <b-col xs="12" md="8" lg="4" offset-md="2" offset-lg="4">
          <b-form @submit.prevent="login">
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
                autocomplete="current-password"
              ></b-form-input>
            </b-form-group>
            <button type="submit" name="button" class="btn btn-primary">
              Login
            </button>
            <div v-if="loginError">
              <p v-for="err in loginError" :key="err" class="mt-3 red-text">
                {{ err }}
              </p>
            </div>
          </b-form>
          <div class="mt-4 d-flex">
            <p class="mr-2">Don't have an account yet?</p>
            <router-link :to="{ name: 'Register' }">Register</router-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// Framework related imports
import { mapGetters, mapState } from "vuex";

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
    ...mapGetters(["loggedIn"]),
    ...mapState(["loginError"])
  },
  watch: {
    loggedIn(newValue, oldValue) {
      if (newValue && !oldValue) {
        this.$router.push({ name: "Dashboard", params: { page: "profile" } });
      }
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch("loginUser", {
          email: this.email,
          password: this.password
        })
        // this code was throwing an error, and it looks like it's not necessary due to Vue reactivity. I'll keep for a bit in case I need again.
        // .then(() => {
        //   if (!this.loginError)
        //     this.$router
        //       .push({ name: "Dashboard" })
        //       .catch(err => console.log(err));
        // })
        .catch(err => {
          console.log("error in login ", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
