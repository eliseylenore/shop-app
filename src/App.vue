<template>
  <div id="app">
    <div class="container-fluid px-0" role="navigation">
      <b-nav align="center">
        <b-nav-item :to="{ name: 'Products' }" class="nav-item"
          >Shop</b-nav-item
        >
        <b-nav-item :to="{ name: 'About' }" class="nav-item">About</b-nav-item>
      </b-nav>
    </div>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<style lang="scss">
.nav {
  background-color: #c7ecff;
}

.nav a {
  font-weight: bold;
  color: #0000b3;
}

.nav {
  a.router-link-exact-active {
    background-color: #a1dfff;
    border-bottom: 2px #0000b3 solid;
  }
}

h1,
h2,
h3,
h4 {
  text-align: center;
  color: #0000b3;
}
</style>
