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
  font-family: "Myriad Pro", sans-serif;
}
.white {
  color: white !important;
}
.main-nav {
  .nav {
    background-color: $black;
    padding: 0.7em 0;
  }

  .nav a:not(.dropdown-item) {
    font-size: 1em;
    color: white;
  }
}

a:focus-visible {
  @include focus-glow;
}

.nav {
  .nav-item:after {
    content: "";
    display: block;
    margin: auto;
    height: 1px;
    width: 0px;
    background: transparent;
    transition: width 0.3s ease, background-color 0.3s ease;
  }
  .nav-item:hover:after,
  .nav-item.active:after {
    width: 100%;
    background: white;
  }
}

@media screen and (min-width: 992px) {
  .main-nav .nav .right-items {
    position: absolute;
    right: 2em;
  }
}
#app {
  h1,
  h2,
  h3,
  h4 {
    text-align: center;
    color: $black;
  }
  h1,
  h2 {
    font-family: "Coolvetica", sans-serif !important;
  }
  h2,
  h3 {
    font-family: "Myriad Pro", sans-serif !important;
    font-weight: bold;
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

button,
.button,
button.delete {
  &:focus-visible {
    @include focus-glow;
  }
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
