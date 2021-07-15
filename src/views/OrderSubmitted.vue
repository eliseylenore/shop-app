<template>
  <div class="mt-5">
    <b-container>
      <header>
        <h1>
          Your order was submitted!
        </h1>
      </header>
      <p class="text-center">
        You will receive an email with your order details.
      </p>
      <div class="mt-4 d-flex justify-content-center" v-if="user !== null">
        <router-link :to="{ name: 'Dashboard' }"
          >Go back to my dashboard</router-link
        >
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { stateAbbreviations } from "../commons/utils";

export default {
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
          addressline1: this.getBillingAddress.addressline1,
          addressline2: this.getBillingAddress.addressline2,
          city: this.getBillingAddress.city,
          state: this.getBillingAddress.state,
          country: this.getBillingAddress.country,
          zipcode: this.getBillingAddress.zipcode
        })
        .then(() => {
          if (!this.addressError) this.$router.push({ name: "Dashboard" });
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
