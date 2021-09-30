<template>
  <div class="mt-5">
    <b-container>
      <header>
        <h1>Checkout</h1>
      </header>
      <b-row>
        <b-col xs="12" md="7" xl="6" offset-xl="1">
          <b-form @submit.prevent="submitPayment()">
            <b-form-group>
              <div id="card-element"></div>
              <div id="card-error"></div>
            </b-form-group>
            <button class="btn btn-primary" id="submit" type="submit">
              Submit Payment
            </button>
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
import CartSummary from "@/components/CartSummary.vue";
import { mapState, mapGetters } from "vuex";
let stripe = window.Stripe(process.env.VUE_APP_STRIPE_KEY);

export default {
  components: {
    CartSummary
  },
  data() {
    return {
      card: null
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
      document.querySelector("#submit").disabled = event.empty;
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
    submitPayment(clientSecret) {
      // loading(true);
      this.$store
        .dispatch("checkoutCart")
        .then(res => {
          clientSecret = res.data.secret;
          console.log("clientSecret ", clientSecret);
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
                  email: this.cart.email
                }
              }
            })
            .then(result => {
              if (result.error) {
                // To-do: show error to your customer
                // showError(result.error.message);
                console.log(result.error.message);
              } else {
                this.$router.push({ name: "OrderSubmitted" });
              }
            })
            .catch(err => console.log("ERR!", err));
        })
        .catch(err => console.log("err: ", err));
    }
  }
};
</script>

<style lang="scss" scoped></style>
