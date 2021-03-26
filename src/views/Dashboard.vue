<template>
  <div class="mt-5">
    <b-container v-if="this.$store.getters.loggedIn">
      <header>
        <h1>Your profile</h1>
        <p class="text-center">Hi, {{ user.name }}</p>
      </header>
      <div>
        <h3 class="text-left">
          Profile review
        </h3>
        <user-info-table :user="user" />
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserInfoTable from "@/components/UserInfoTable.vue";
export default {
  components: {
    UserInfoTable
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
