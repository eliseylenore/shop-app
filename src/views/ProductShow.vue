<template>
  <div>
    <h2>{{ product.title }}</h2>
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
