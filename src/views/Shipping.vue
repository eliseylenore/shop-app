<template>
  <div class="mt-5">
    <b-container>
      <header>
        <h1>
          Shipping
        </h1>
      </header>
      <b-row>
        <b-col xs="12" md="7" xl="6" offset-xl="1">
          <div class="mt-4 d-flex" v-if="user === null">
            <p class="mr-2">Have an account?</p>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </div>
          <b-form @submit.prevent="addShippingInfo()">
            <b-form-group>
              <label for="address-line1">
                Address 1
              </label>
              <b-form-input
                v-model="addressline1"
                type="text"
                name="address-line1"
                autocomplete="address-line1"
                value
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="address-line2">
                Address 2
              </label>
              <b-form-input
                v-model="addressline2"
                type="text"
                name="address-line2"
                autocomplete="address-line2"
                value
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="city">
                City
              </label>
              <b-form-input
                v-model="city"
                type="text"
                name="city"
                autocomplete="address-level2"
                value
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="state">
                State
              </label>
              <b-form-select
                id="state"
                v-model="state"
                class="form-control"
                aria-describedby="state-error"
                autocomplete="address-level1"
                :options="states"
              >
              </b-form-select>
            </b-form-group>
            <b-form-group>
              <label for="zipcode">
                ZIP code
              </label>
              <b-form-input
                v-model="zipcode"
                type="number"
                name="zipcode"
                autocomplete="postal-code"
                value
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="country">
                Country
              </label>
              <b-form-select
                id="country"
                v-model="country"
                class="form-control"
                aria-describedby="country-error"
                autocomplete="country"
              >
                <option>United States</option>
              </b-form-select>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox
                id="checkbox-1"
                v-model="sameAddress"
                value="true"
                unchecked-value="false"
              >
                Use this address for billing
              </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <label for="email">
                Email
              </label>
              <b-form-input
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                value
                required
              ></b-form-input>
            </b-form-group>
            <button type="submit" name="button">
              Next
            </button>
            <div v-if="registerError">
              <p v-for="err in registerError" :key="err" class="mt-3 red-text">
                {{ err }}
              </p>
            </div>
          </b-form>
        </b-col>
        <b-col xs="12" md="5">
          <cart-summary key="" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { stateAbbreviations } from "../commons/utils";

import CartSummary from "@/components/CartSummary.vue";

export default {
  components: {
    CartSummary
  },
  data() {
    return {
      email: "",
      addressline1: "",
      addressline2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      sameAddress: true,
      states: stateAbbreviations
    };
  },
  computed: {
    ...mapState(["registerError"]),
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    addShippingInfo() {
      this.$store.dispatch("addShippingAddress", {
        email: this.email,
        addressline1: this.addressline1,
        addressline2: this.addressline2,
        city: this.city,
        state: this.state,
        country: this.country,
        zipcode: this.zipcode
      });
      // .then(() => {
      //   if (!this.registerError) this.$router.push({ name: "Dashboard" });
      // });

      if (this.sameAddress) {
        this.$store.dispatch("addBillingAddress", {
          email: this.email,
          addressline1: this.addressline1,
          addressline2: this.addressline2,
          city: this.city,
          state: this.state,
          country: this.country,
          zipcode: this.zipcode
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
