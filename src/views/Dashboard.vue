<template>
  <div class="mt-5">
    <b-container v-if="this.$store.getters.loggedIn">
      <header>
        <h1>Your profile</h1>
        <p class="text-center">Hi, {{ user.name }}</p>
      </header>
      <b-row>
        <b-col xs="12" md="8" lg="6" offset-md="2" offset-lg="3">
          <h3 class="text-left">
            Profile review
          </h3>
          <user-info-table :user="user" />
        </b-col>
      </b-row>
      <open-orders v-if="user.pendingOrders !== undefined" />
      <b-row>
        <b-col xs="12" md="8" lg="6" offset-md="2" offset-lg="3" class="mb-5">
          <router-link :to="{ name: 'PreviousOrders' }"
            >Previous orders</router-link
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserInfoTable from "@/components/UserInfoTable.vue";
import OpenOrders from "@/components/OpenOrders.vue";
export default {
  components: {
    UserInfoTable,
    OpenOrders
  },
  created() {
    if (!this.$store.state.user.name) {
      this.$store.dispatch("fetchUserInfo");
    }
  },
  computed: {
    ...mapState({ user: state => state.user })
  }
};
</script>

<style lang="scss" scoped></style>
