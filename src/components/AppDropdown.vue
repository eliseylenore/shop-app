<template>
  <div>
    <b-nav-item
      @click="toggle"
      v-on-clickaway="away"
      :class="[
        active ? 'active' : '',
        this.$route.name === 'Products' || 'Category' ? 'router-link-exact-active' : ''
      ]"
      >Shop</b-nav-item
    >
    <div v-if="active" class="menu-container">
      <div class="d-flex flex-column">
        <router-link
          :to="{ name: 'Products' }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
        >
          Shop all
        </router-link>
        <router-link
          :to="{ name: 'Category', params: { category: 'outerwear' } }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
        >
          Outerwear
        </router-link>
        <router-link
          :to="{ name: 'Category', params: { category: 'swimwear' } }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
        >
          Swimwear
        </router-link>
        <router-link
          :to="{ name: 'Category', params: { category: 'accessories' } }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
        >
          Accessories
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
export default {
  mixins: [clickaway],
  data() {
    return {
      active: false
    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
    away() {
      this.active = false;
    }
  }
};
</script>

<style lang="scss">
.menu-container {
  position: absolute;
  border-left: $prussianBlue solid 1px;
  border-right: $prussianBlue solid 1px;
  border-top: $prussianBlue solid 1px;
  a {
    text-align: left;
    background-color: white;
    color: $prussianBlue;
    border-bottom: $prussianBlue solid 1px;
    &:hover {
      background-color: $linkWater;
    }
    &:active {
      color: $prussianBlue;
    }
  }
}
</style>
