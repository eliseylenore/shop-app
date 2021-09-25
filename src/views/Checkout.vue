<template>
  <div class="mt-5">
    <b-container>
      <header>
        <h1>Checkout</h1>
      </header>
      <b-row>
        <b-col xs="12" md="7" xl="6" offset-xl="1">
          <b-form>
            <b-form-group>
              <stripe-card @change="handleChange" />
            </b-form-group>
            <button class="btn btn-primary" type="submit">
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
import StripeCard from "@/components/StripeCard.vue";
import CartSummary from "@/components/CartSummary.vue";

export default {
  components: {
    StripeCard,
    CartSummary
  }
};
</script>

<style lang="scss" scoped></style>
