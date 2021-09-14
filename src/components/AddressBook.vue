<template>
  <div class="address-book">
    <modal
      id="modal-1"
      title="Are you sure you want to remove this address?"
      @modal-clicked="$store.dispatch('deleteAddress', addressToDelete._id)"
    >
      <p class="mb-0">
        {{ addressToDelete.addressline1 }}
      </p>
      <p v-if="addressToDelete.addressline2" class="mb-0">
        {{ addressToDelete.addressline2 }}
      </p>
      <p class="mb-0">
        {{ addressToDelete.city }}, {{ addressToDelete.state }}
        {{ addressToDelete.zipcode }}
      </p>
    </modal>
    <h3 class="text-left mb-2">
      Address book
    </h3>
    <div v-for="address in addressBook" :key="address._id">
      <accordion :panelId="address._id">
        <template v-slot:header>{{ address.addressline1 }}</template>
        <template v-slot:panel>
          <p class="mb-0">
            {{ address.addressline1 }}
          </p>
          <p v-if="address.addressline2" class="mb-0">
            {{ address.addressline2 }}
          </p>
          <p class="mb-0">
            {{ address.city }}, {{ address.state }} {{ address.zipcode }}
          </p>
          <button @click="showModal(address)" class="btn btn-danger mt-2">
            Delete
          </button>
        </template>
      </accordion>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Accordion from "@/components/Accordion.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Accordion,
    Modal
  },
  data() {
    return {
      clickedPanel: "",
      addressToDelete: {}
    };
  },
  computed: {
    ...mapState({
      addressBook: state => state.user.addressBook
    })
  },
  methods: {
    showModal(address) {
      this.addressToDelete = address;
      this.$bvModal.show("modal-1");
    }
  }
};
</script>

<style lang="scss" scoped></style>
