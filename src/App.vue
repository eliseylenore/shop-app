<template>
  <div id="app" class="d-flex flex-column h-100">
    <page-nav />
    <main class="flex-grow-1">
      <router-view />
    </main>
    <page-footer />
  </div>
</template>

<script>
import PageNav from "@/components/PageNav.vue";
import PageFooter from "@/components/PageFooter.vue";
export default {
  components: {
    PageFooter,
    PageNav
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
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
a:focus-visible {
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

#app h2 {
  font-size: 1.5rem;
}

header h1 {
  font-weight: bold;
}

button,
.button,
button.close {
  background-color: $scienceBlue;
  border: none;
  color: white;
  padding: 0.5em 1.5em;
  &:focus-visible {
    @include focus-glow;
  }
}
button:hover,
button.close:hover,
.button:hover {
  background-color: $congressBlue;
}

button:active,
button.close:active,
.button:active {
  background-color: $midnightBlue;
}

/* Form styles */
input,
select {
  cursor: pointer;
}
input[type="radio"] {
  opacity: 0;
  position: absolute;
  &:focus-visible + label {
    @include focus-glow;
  }
}
.color-swatch {
  height: 2em;
  width: 2em;
}
.color-swatch.active {
  border: 3px solid #ff744e;
}
label {
  cursor: pointer;
}
label.disabled {
  color: grey;
  text-decoration: line-through;
}
</style>
