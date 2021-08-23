<template>
  <div class="container-fluid px-0" role="navigation">
    <b-nav aria-label="Secondary navigation" align="center">
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
    margin: 0 2em 0;
    font-family: Coolvetica;
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

  .nav-item:hover {
    background-color: $turquoise-light;
    transition: background-color 0.3s ease;
  }
  .nav-item.active {
    background: $turquoise;
  }
}
</style>
