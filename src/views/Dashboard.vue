<template>
  <div>
    <b-container v-if="this.$store.getters.loggedIn">
      <header>
        <h1>Your profile</h1>
        <p class="text-center">Welcome, {{ user.name }}</p>
      </header>
      <b-row>
        <b-col sm="3">
          <profile-nav />
        </b-col>
        <b-col sm="9">
          <div v-if="$route.params.page === 'profile'">
            <h3 class="text-left">
              Profile review
            </h3>
            <user-info-table :user="user" />
          </div>
          <open-orders v-if="$route.params.page === 'openorders'" />
          <previous-orders v-if="$route.params.page === 'previousorders'" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserInfoTable from "@/components/UserInfoTable.vue";
import OpenOrders from "@/components/OpenOrders.vue";
import PreviousOrders from "@/components/PreviousOrders.vue";
import ProfileNav from "@/components/ProfileNav.vue";
export default {
  components: {
    UserInfoTable,
    OpenOrders,
    PreviousOrders,
    ProfileNav
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
