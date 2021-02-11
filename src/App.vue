<template>
  <div id="app">
    <div class="container-fluid px-0" role="navigation">
      <b-nav align="center">
        <b-nav-item :to="{ name: 'Products' }" class="nav-item"
          >Shop</b-nav-item
        >
        <b-nav-item :to="{ name: 'About' }" class="nav-item">About</b-nav-item>
        <cart-button />
      </b-nav>
    </div>
    <router-view />
  </div>
</template>

<script>
import CartButton from "@/components/CartButton.vue";
export default {
  components: {
    CartButton
  }
};
</script>

<style lang="scss">
body {
  font-family: "Myriad Pro", sans-serif !important;
}
.nav {
  background-color: $prussianBlue;
  padding: 0.7em 0;
}

.nav a {
  font-size: 1.4em;
  color: white;
  &:hover {
    color: white;
    background-color: $chathamsBlue;
  }
}
a:focus {
  @include focus-glow;
}
.nav {
  a.router-link-exact-active {
    background-color: $scienceBlue;
  }
  .cart-item {
    position: relative;
  }
}
@media screen and (min-width: 992px) {
  .nav .cart-item {
    position: absolute;
    right: 2em;
  }
}

h1,
h2,
h3,
h4 {
  font-weight: bold;
  text-align: center;
  color: $prussianBlue;
}

button,
.button {
  background-color: $scienceBlue;
  border: none;
  color: white;
  padding: 0.5em 1.5em;
  &:focus {
    @include focus-glow;
  }
}
button:hover,
.button:hover {
  background-color: $congressBlue;
}

button:active,
.button:active {
  background-color: $midnightBlue;
}
</style>
