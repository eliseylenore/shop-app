<template>
  <div class="mt-5">
    <b-container>
      <header>
        <h1>
          Shipping
        </h1>
      </header>
      <b-row>
        <b-col xs="12" md="7" xl="6" offset-xl="1" class="mb-5">
          <div class="mt-4 d-flex" v-if="user === null">
            <p class="mr-2">Have an account?</p>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </div>
          <b-form @submit.prevent="addShippingInfo()">
            <b-form-group v-if="user.addressBook.length > 0">
              <label for="addressBook">
                Select an address
              </label>
              <b-form-select
                id="addressBook"
                :value="getShippingAddress"
                @input="updateShippingAddress"
                class="form-control"
                aria-describedby="addressBook-error"
                autocomplete="address-level1"
                :options="getAddressBookOptions"
              >
              </b-form-select>
            </b-form-group>
            <b-form-group>
              <label for="address-line1">
                Address 1
              </label>
              <b-form-input
                v-model="getShippingAddress.addressline1"
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
                v-model="getShippingAddress.addressline2"
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
                v-model="getShippingAddress.city"
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
                v-model="getShippingAddress.state"
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
                v-model="getShippingAddress.zipcode"
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
                v-model="getShippingAddress.country"
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
                v-model="addToAddressBook"
                value="true"
                unchecked-value="false"
              >
                Add to address book
              </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox
                id="checkbox-2"
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
                :value="getUserEmail"
                @input="updateUserEmail"
                type="email"
                name="email"
                autocomplete="email"
                required
              ></b-form-input>
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
      address: "Choose an option",
      addToAddressBook: true,
      sameAddress: true,
      states: stateAbbreviations
    };
  },
  computed: {
    ...mapState(["addressError"]),
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters([
      "getShippingAddress",
      "getUserEmail",
      "getAddressBookOptions"
    ])
  },
  methods: {
    updateUserEmail(e) {
      this.$store.commit("UPDATE_USER_EMAIL", e);
    },
    updateShippingAddress(e) {
      this.getShippingAddress.addressline1 = e.addressline1;
      this.getShippingAddress.addressline2 = e.addressline2;
      this.getShippingAddress.city = e.city;
      this.getShippingAddress.state = e.state;
      this.getShippingAddress.country = e.country;
      this.getShippingAddress.zipcode = e.zipcode;
      this.addToAddressBook = false;
    },
    addShippingInfo() {
      this.$store
        .dispatch("addShippingAddress", {
          email: this.getUserEmail,
          addressline1: this.getShippingAddress.addressline1,
          addressline2: this.getShippingAddress.addressline2,
          city: this.getShippingAddress.city,
          state: this.getShippingAddress.state,
          country: this.getShippingAddress.country,
          zipcode: this.getShippingAddress.zipcode
        })
        .then(() => {
          if (this.sameAddress) {
            this.$store
              .dispatch("addBillingAddress", {
                addressline1: this.getShippingAddress.addressline1,
                addressline2: this.getShippingAddress.addressline2,
                city: this.getShippingAddress.city,
                state: this.getShippingAddress.state,
                country: this.getShippingAddress.country,
                zipcode: this.getShippingAddress.zipcode
              })
              .then(() => {
                if (this.addToAddressBook) {
                  let existingAddress = this.user.addressBook.find(
                    address =>
                      address.addressline1 ===
                        this.getShippingAddress.addressline1 &&
                      address.addressline2 ===
                        this.getShippingAddress.addressline2 &&
                      address.city === this.getShippingAddress.city
                  );
                  if (existingAddress !== undefined) {
                    this.$store.dispatch("addToAddressBook", {
                      addressline1: this.getShippingAddress.addressline1,
                      addressline2: this.getShippingAddress.addressline2,
                      city: this.getShippingAddress.city,
                      state: this.getShippingAddress.state,
                      country: this.getShippingAddress.country,
                      zipcode: this.getShippingAddress.zipcode
                    });
                  }
                }
              });
          }
          if (!this.addressError) this.$router.push({ name: "Billing" });
        })
        .catch(err => console.log(err));
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
