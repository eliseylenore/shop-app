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
$prussianBlue: #00264d;
$midnightBlue: #003060;
$chathamsBlue: #114170;
$congressBlue: #014790;
$scienceBlue: #015fc0;
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

.nav {
  a.router-link-exact-active {
    background-color: $scienceBlue;
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

button {
  background-color: $scienceBlue;
  border: none;
  color: white;
  padding: 0.5em 1.5em;
}
button:hover {
  background-color: $congressBlue;
}

button:active {
  background-color: $midnightBlue;
}
</style>
