<template>
  <div class="mt-5">
    <b-container>
      <header>
        <h1 class="mb-5">Checkout</h1>
      </header>
      <b-row>
        <b-col xs="12" md="6" offset-xl="1" class="mb-5">
          <b-form @submit.prevent="submitPayment()">
            <b-form-group>
              <div id="card-element"></div>
              <div id="card-error"></div>
            </b-form-group>
            <p class="red-text mb-0">
              This is a test interaction. Do not use a real card.
            </p>
            <p class="red-text">
              Please use this test card number: 4242 4242 4242 4242
            </p>
            <button class="btn btn-primary" id="submit" type="submit">
              Submit Payment
            </button>
          </b-form>
          <div
            class="d-flex justify-content-center align-items-center flex-column mt-5"
            v-if="loading"
          >
            Processing...
            <div class="loader"></div>
          </div>
        </b-col>
        <b-col xs="12" md="4" offset-md="1">
          <cart-summary key="" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CartSummary from "@/components/CartSummary.vue";
import { mapState, mapGetters } from "vuex";
import VUE_APP_STRIPE_KEY from "@/keys.js";
let stripe = window.Stripe(VUE_APP_STRIPE_KEY);

export default {
  components: {
    CartSummary
  },
  data() {
    return {
      card: null,
      loading: false
    };
  },
  mounted() {
    var style = {
      base: {
        iconColor: "#019494",
        color: "#000",
        fontFamily: "Myriad Pro, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883"
        },
        "::placeholder": {
          color: "#019494"
        }
      },
      invalid: {
        iconColor: "#FF5E5C",
        color: "#FF5E5C"
      }
    };
    var elements = stripe.elements();
    this.card = elements.create("card", { style: style });
    this.card.mount("#card-element");
    this.card.on("change", function(event) {
      // Disable the Pay button if there are no card details in the Element
      document.querySelector("#submit").disabled = event.empty || event.error;
      document.querySelector("#card-error").textContent = event.error
        ? event.error.message
        : "";
    });
  },
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    ...mapGetters(["getCartTotal"])
  },
  methods: {
    submitPayment() {
      // loading(true);
      this.loading = true;
      this.$store
        .dispatch("checkoutCart")
        .then(res => {
          let clientSecret = res.data.secret;
          let address = this.cart.billingAddress;

          stripe
            .confirmCardPayment(clientSecret, {
              payment_method: {
                type: "card",
                card: this.card,
                billing_details: {
                  address: {
                    city: address.city,
                    country: "US",
                    line1: address.addressline1,
                    line2: address.addressline2,
                    postal_code: address.zipcode
                  },
                  email: this.cart.email,
                  name: address.name
                }
              }
            })
            .then(result => {
              if (result.error) {
                this.loading = false;
                // To-do: show error to your customer
                // showError(result.error.message);
                console.log(result.error.message);
                document.querySelector("#card-error").textContent =
                  result.error.message;
              } else {
                this.loading = false;
                this.$store.dispatch("emptyCart").then(() => {
                  this.$router.push({ name: "OrderSubmitted" });
                });
              }
            })
            .catch(err => console.log("ERR!", err));
        })
        .catch(err => console.log("err: ", err));
    }
  }
};
</script>

<style lang="scss" scoped>
.loader {
  border: 16px solid $turquoise-light; /* Light grey */
  border-top: 16px solid $turquoise-dark;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s ease-in infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
