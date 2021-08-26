<template>
  <div role="navigation">
    <b-nav vertical pills aria-label="Profile navigation">
      <b-nav-item
        :to="{ name: 'Dashboard', params: { page: 'profile' } }"
        :class="[
          'nav-item',
          $route.params.page === 'profile' ? 'active' : 'inactive'
        ]"
        :active="$route.params.page === 'profile'"
        >Your information</b-nav-item
      >
      <b-nav-item
        :to="{ name: 'Dashboard', params: { page: 'openorders' } }"
        :class="[
          'nav-item',
          $route.params.page === 'openorders' ? 'active' : 'inactive'
        ]"
        :active="$route.params.page === 'openorders'"
        >Open orders</b-nav-item
      >
      <b-nav-item
        :to="{ name: 'Dashboard', params: { page: 'previousorders' } }"
        :class="[
          'nav-item',
          $route.params.page === 'previousorders' ? 'active' : 'inactive'
        ]"
        :active="$route.params.page === 'previousorders'"
        >Previous orders</b-nav-item
      >
      <b-nav-item
        :to="{ name: 'Dashboard', params: { page: 'addressbook' } }"
        :class="[
          'nav-item',
          $route.params.page === 'addressbook' ? 'active' : 'inactive'
        ]"
        :active="$route.params.page === 'addressbook'"
        >Address book</b-nav-item
      >
    </b-nav>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.nav .nav-item {
  a {
    color: black;
  }
}
.nav.secondary-nav {
  padding: 30px;
  .nav-item {
    font-family: Coolvetica;
    font-size: 2em;
  }
  .nav-item:hover:after,
  .nav-item:after,
  .nav-item.active:after {
    width: 100%;
  }

  .nav-item:hover:after {
    animation-name: linewidth;
    animation-duration: 0.3s;
  }

  @keyframes linewidth {
    0% {
      width: 100%;
    }
    25% {
      width: 60%;
    }
    100% {
      width: 100%;
    }
  }
  .nav-item.active {
    background: $turquoise;
  }
}
</style>
