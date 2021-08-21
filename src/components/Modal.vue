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

.modal-header .close {
  display: flex;
  justify-content: center;
  align-items: center;
}

button.close {
  position: absolute;
  top: -1rem;
  right: -0.15rem;
  border-radius: 100%;
  font-size: 1em;
  height: 2rem;
  width: 2rem;
  background-color: $scienceBlue;
  font-weight: bold;
  font-size: 1.5em;
}

.modal button.close {
  top: -0.1rem;
}

.close:hover {
  color: white;
}

.close:not(:disabled):not(.disabled):hover,
.close:not(:disabled):not(.disabled):focus-visible,
.close {
  opacity: 1;
}
</style>
