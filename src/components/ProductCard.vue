<template>
  <div>
    <h4>{{ product.title }}</h4>
    <img :src="product.img" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Park Cleanup"
    };
  },
  props: {
    product: {
      type: Object
    }
  }
};
</script>

<style></style>
