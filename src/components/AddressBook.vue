<template>
  <div class="address-book">
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
          <button
            @click="$store.dispatch('deleteAddress', address._id)"
            class="btn btn-danger mt-2"
          >
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
export default {
  components: {
    Accordion
  },
  data() {
    return {
      clickedPanel: ""
    };
  },
  computed: {
    ...mapState({
      addressBook: state => state.user.addressBook
    })
  }
};
</script>

<style lang="scss" scoped></style>
