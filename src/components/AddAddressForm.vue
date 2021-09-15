<template>
  <div>
    <h3 class="text-left">New address</h3>
    <b-form @submit.prevent="addAddress()">
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
      <button type="submit" name="button" class="btn btn-primary">
        Add
      </button>
      <div v-if="addressError">
        <p v-for="err in addressError" :key="err" class="mt-3 red-text">
          {{ err }}
        </p>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { stateAbbreviations } from "../commons/utils";

export default {
  data() {
    return {
      addressline1: "",
      addressline2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      states: stateAbbreviations
    };
  },
  computed: {
    ...mapState(["addressError"]),
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    addAddress() {
      let existingAddress = this.user.addressBook.find(
        address =>
          address.addressline1 === this.addressline1 &&
          address.addressline2 === this.addressline2 &&
          address.city === this.city
      );
      if (existingAddress === undefined) {
        this.$store
          .dispatch("addToAddressBook", {
            addressline1: this.addressline1,
            addressline2: this.addressline2,
            city: this.city,
            state: this.state,
            country: this.country,
            zipcode: this.zipcode
          })
          .then(() => {
            this.$emit("address-added");
          })
          .catch(err => console.log(err));
        this.addressline1 = "";
        this.addressline2 = "";
        this.city = "";
        this.state = "";
        this.zipcode = "";
        this.country = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
