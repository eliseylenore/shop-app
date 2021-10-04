<template>
  <div class="mt-5">
    <b-container>
      <header>
        <h1>
          Billing
        </h1>
      </header>
      <b-row>
        <b-col xs="12" md="7" xl="6" offset-xl="1">
          <div class="mt-4 d-flex" v-if="user === null">
            <p class="mr-2">Have an account?</p>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </div>
          <b-form @submit.prevent="addBillingInfo()">
            <b-form-group>
              <label for="name">
                Name
              </label>
              <b-form-input
                v-model="getBillingAddress.name"
                type="text"
                name="name"
                autocomplete="name"
                value
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="address-line1">
                Address 1
              </label>
              <b-form-input
                v-model="getBillingAddress.addressline1"
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
                v-model="getBillingAddress.addressline2"
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
                v-model="getBillingAddress.city"
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
                v-model="getBillingAddress.state"
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
                v-model="getBillingAddress.zipcode"
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
                v-model="getBillingAddress.country"
                class="form-control"
                aria-describedby="country-error"
                autocomplete="country"
              >
                <option>United States</option>
              </b-form-select>
            </b-form-group>
            <button type="submit" name="button" class="btn btn-primary">
              Next
            </button>
            <div v-if="addressError">
              <p v-for="err in addressError" :key="err" class="mt-3 red-text">
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
import { mapState, mapGetters } from "vuex";
import { stateAbbreviations } from "../commons/utils";

import CartSummary from "@/components/CartSummary.vue";

export default {
  components: {
    CartSummary
  },
  data() {
    return {
      states: stateAbbreviations
    };
  },
  computed: {
    ...mapState(["addressError"]),
    ...mapState({
      user: state => state.user,
      cart: state => state.cart
    }),
    ...mapGetters(["getBillingAddress", "getUserEmail"])
  },
  methods: {
    addBillingInfo() {
      this.$store
        .dispatch("addBillingAddress", {
          name: this.getBillingAddress.name,
          addressline1: this.getBillingAddress.addressline1,
          addressline2: this.getBillingAddress.addressline2,
          city: this.getBillingAddress.city,
          state: this.getBillingAddress.state,
          country: this.getBillingAddress.country,
          zipcode: this.getBillingAddress.zipcode
        })
        .then(() => {
          if (!this.addressError) {
            this.$router.push({ name: "Checkout" });
          }
        });
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
