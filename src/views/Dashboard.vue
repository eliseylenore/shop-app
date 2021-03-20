<template>
  <div class="mt-5">
    <b-container v-if="this.$store.getters.loggedIn">
      <header>
        <h1>
          Your dashboard
        </h1>
        <p class="text-center">{{ user.email }}</p>
      </header>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({ user: state => state.user })
  }
};
</script>

<style lang="scss" scoped></style>
