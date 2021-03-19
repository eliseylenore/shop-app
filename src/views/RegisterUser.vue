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
              ></b-form-input>
            </b-form-group>
            <button type="submit" name="button">
              Register
            </button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
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
          this.$router.push({ name: "Dashboard" });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
