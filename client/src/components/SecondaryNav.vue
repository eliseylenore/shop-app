<template>
  <div class="container" role="navigation">
    <b-nav aria-label="Secondary navigation" align="around">
      <b-nav-item
        :to="{ name: 'Category', params: { category: 'outerwear' } }"
        :class="[
          'nav-item',
          $route.params.category === 'outerwear' ? 'active' : 'inactive'
        ]"
        >Outerwear</b-nav-item
      >
      <b-nav-item
        :to="{ name: 'Category', params: { category: 'swimwear' } }"
        :class="[
          'nav-item',
          $route.params.category === 'swimwear' ? 'active' : 'inactive'
        ]"
        >Swimwear</b-nav-item
      >
      <b-nav-item
        :to="{ name: 'Category', params: { category: 'accessories' } }"
        :class="[
          'nav-item',
          $route.params.category === 'accessories' ? 'active' : 'inactive'
        ]"
        >Accessories</b-nav-item
      >
    </b-nav>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.nav {
  padding: 30px;
  .nav-item {
    font-family: Coolvetica;
    font-weight: normal;
    font-size: 2em;
    a {
      color: black;
    }
  }
  .nav-item:hover:after,
  .nav-item:after,
  .nav-item.active:after {
    width: 100%;
    background: black;
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
