<template>
  <div>
    <b-modal id="modal-1" ref="modal-1" title="BootstrapVue" ok-only>
      <p class="my-4">Product added to cart! {{ product.title }}</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
button.close {
  position: absolute;
  top: -0.25em;
  right: -0.15em;
  border-radius: 100%;
  padding: 0.35em 0.75em;
  font-size: 1em;
  height: 2em;
  width: 2em;
  .x {
    position: absolute;
    left: 33%;
    top: 0;
    font-weight: bold;
    font-size: 1.5em;
  }
}
</style>
