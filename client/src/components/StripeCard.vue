<template>
  <div>
    <div id="card-element"></div>
    <div id="card-error"></div>
  </div>
</template>

<script>
import VUE_APP_STRIPE_KEY from "@/keys.js";
import {loadStripe} from "@stripe/stripe-js/pure";
export default {
  data() {
    return {
      elements: null
    };
  },
  mounted() {
    loadStripe(VUE_APP_STRIPE_KEY).then(result => {
      this.elements = result.elements()
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
  
      var card = this.elements.create("card", { style: style });
      card.mount("#card-element");
      card.on("change", function(event) {
        // Disable the Pay button if there are no card details in the Element
        document.querySelector("#submit").disabled = event.empty;
        document.querySelector("#card-error").textContent = event.error
          ? event.error.message
          : "";
      });
    })
  }
};
</script>

<style lang="scss" scoped>
#card-element {
  border: 1px solid #ced4da;
  padding: 0.375rem 0.75rem;
}
</style>
