<template>
  <div>
    <b-modal
      :id="id"
      ref="modal-1"
      :title="title"
      :ok-only="okOnly"
      @ok="$emit('modal-clicked')"
    >
      <slot></slot>
      <template #modal-footer="{ ok }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <button @click="ok()">
          OK
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    title: {
      type: String,
      default: "Item added to cart"
    },
    okOnly: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss">
header.modal-header {
  background-color: $silver;
  color: $black;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  justify-content: center;

  h5 {
    font-weight: bold;
    text-align: center;
  }
}

</style>
