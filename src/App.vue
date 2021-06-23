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
.white {
  color: white !important;
}
.nav {
  background-color: $prussianBlue;
  padding: 0.7em 0;
}

.nav a:not(.dropdown-item) {
  font-size: 1em;
  color: white;
  border-bottom: $prussianBlue 1px solid;
}

.nav a:not(.dropdown-item):hover,
.nav-item.active a {
  color: white;
  background-color: $chathamsBlue;
}

a:focus-visible {
  @include focus-glow;
}

.nav {
  a.router-link-exact-active:not(.dropdown-item),
  .router-link-exact-active a,
  .active .nav-item {
    background-color: $scienceBlue;
    border-bottom: white 1px solid;
  }
}

@media screen and (min-width: 992px) {
  .nav .right-items {
    position: absolute;
    right: 2em;
  }
}
#app {
  h1,
  h2,
  h3,
  h4 {
    font-weight: bold;
    text-align: center;
    color: $prussianBlue;
  }
  h2 {
    font-size: 1.5rem;
  }
  h4 {
    text-align: left;
    font-weight: bold;
    font-size: 1rem;
  }
}

button a {
  color: white;
  &:hover {
    text-decoration: none;
  }
}

button,
.button,
button.close {
  background-color: $scienceBlue;
  &.cancel-btn {
    background-color: orangered;
    &:hover {
      background-color: red;
    }
    &:active {
      background-color: yellow;
    }
  }
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
