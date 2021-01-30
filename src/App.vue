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
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  font-family: "Myriad Pro", sans-serif !important;
}
.nav {
  background-color: #00264d;
  padding: 1em 0;
}

.nav a {
  font-weight: bold;
  color: white;
  &:hover {
    color: white;
    background-color: #114170;
  }
}

.nav {
  a.router-link-exact-active {
    background-color: #015fc0;
  }
}

h1,
h2,
h3,
h4 {
  text-weight: bold;
  text-align: center;
  color: #00264d;
}

button {
  background-color: #015fc0;
  border: none;
  color: white;
  padding: 0.5em 1.5em;
}
button:hover {
  background-color: #014790;
}

button:active {
  background-color: #003060;
}
</style>
