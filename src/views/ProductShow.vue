<template>
  <div class="product-show">
    <b-container class="mt-5">
      <b-row>
        <b-col xs="12" sm="5" offset="1" class="px-sm-5">
          <img :src="'./../../' + product.img" alt="" class="w-100" />
        </b-col>
        <b-col xs="12" sm="5" class="text-left pt-5 pt-sm-0">
          <h2>
            {{ product.title }}
          </h2>
          <div class="mt-4">
            <h4>Color</h4>
          </div>
          <button class="">
            Add to cart
          </button>
          <div class="my-4">
            <h4>Description</h4>
            <p>{{ product.description }}</p>
          </div>
          <div class="my-4">
            <h4>Materials and care</h4>
            <p>Materials and care</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("fetchProduct", this.$route.params.id);
  },
  computed: mapState(["product"])
};
</script>

<style lang="scss" scoped>
h2,
h3,
h4 {
  text-align: left;
}
img {
  box-shadow: 3px 3px 15px rgba(163, 35, 25, 0.4);
}
</style>
