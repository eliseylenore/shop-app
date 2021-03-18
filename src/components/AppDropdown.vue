<template>
  <nav aria-label="Product categories menu">
    <b-nav-item
      @click="toggle"
      v-on-clickaway="away"
      :class="[
        active ? 'active' : '',
        this.$route.name === 'Products' || this.$route.name === 'Category'
          ? 'router-link-exact-active'
          : ''
      ]"
      >Shop</b-nav-item
    >
    <ul v-if="active" class="menu-container">
      <li :class="this.$route.name === 'Products' ? 'active' : ''">
        <router-link
          :to="{ name: 'Products' }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
          v-if="this.$route.name !== 'Products'"
        >
          Shop all
        </router-link>

        <span v-if="this.$route.name === 'Products'" class="sr-only"
          >Current page:
        </span>
        <span v-if="this.$route.name === 'Products'" class="dropdown-item"
          >Shop all</span
        >
      </li>
      <li :class="this.$route.params.category === 'outerwear' ? 'active' : ''">
        <router-link
          :to="{ name: 'Category', params: { category: 'outerwear' } }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
          v-if="this.$route.params.category !== 'outerwear'"
        >
          Outerwear
        </router-link>
        <span v-if="this.$route.params.category === 'outerwear'" class="sr-only"
          >Current page:
        </span>
        <span
          v-if="this.$route.params.category === 'outerwear'"
          class="dropdown-item"
          >Outerwear</span
        >
      </li>
      <li :class="this.$route.params.category === 'swimwear' ? 'active' : ''">
        <router-link
          :to="{ name: 'Category', params: { category: 'swimwear' } }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
          v-if="this.$route.params.category !== 'swimwear'"
        >
          Swimwear
        </router-link>
        <span v-if="this.$route.params.category === 'swimwear'" class="sr-only"
          >Current page:
        </span>
        <span
          v-if="this.$route.params.category === 'swimwear'"
          class="dropdown-item"
          >Swimwear</span
        >
      </li>
      <li
        :class="this.$route.params.category === 'accessories' ? 'active' : ''"
      >
        <router-link
          :to="{ name: 'Category', params: { category: 'accessories' } }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
          v-if="this.$route.params.category !== 'accessories'"
        >
          Accessories
        </router-link>
        <span
          v-if="this.$route.params.category === 'accessories'"
          class="sr-only"
          >Current page:
        </span>
        <span
          v-if="this.$route.params.category === 'accessories'"
          class="dropdown-item"
          >Accessories</span
        >
      </li>
    </ul>
  </nav>
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
  li {
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
    &.active {
      .dropdown-item {
        color: white;
        background-color: $scienceBlue;
      }
    }
  }
}
ul ul.menu-container {
  padding-inline-start: 0;
  list-style-type: none !important;
}
</style>
