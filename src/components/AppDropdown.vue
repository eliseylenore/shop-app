<template>
  <nav aria-label="Product categories menu">
    <b-nav-item
      @click="toggle"
      @keydown.space.exact.prevent="toggle"
      @keydown.esc.exact="away"
      @keydown.shift.tab="away"
      @keydown.up.exact.prevent="startArrowKeys"
      @keydown.down.exact.prevent="startArrowKeys"
      v-on-clickaway="away"
      :class="[
        active ? 'active' : '',
        this.$route.name === 'Products' || this.$route.name === 'Category'
          ? 'router-link-exact-active'
          : ''
      ]"
      >Shop</b-nav-item
    >
    <ul v-if="active" class="menu-container" ref="dropdown">
      <li :class="this.$route.name === 'Products' ? 'active' : ''">
        <router-link
          :to="{ name: 'Products' }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
          @keydown.tab.native.exact="focusNext(false)"
          @keydown.up.native.exact.prevent=""
          @keydown.down.native.exact.prevent="focusNext(true)"
          @keydown.esc.exact="away"
        >
          Shop all
        </router-link>

        <!-- <span v-if="this.$route.name === 'Products'" class="sr-only"
          >Current page:
        </span>
        <span v-if="this.$route.name === 'Products'" class="dropdown-item"
          >Shop all</span
        > -->
      </li>
      <li :class="this.$route.params.category === 'outerwear' ? 'active' : ''">
        <router-link
          :to="{ name: 'Category', params: { category: 'outerwear' } }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
          @keydown.tab.native.exact="focusNext(false)"
          @keydown.shift.tab.native="focusPrevious(false)"
          @keydown.up.native.exact.prevent="focusPrevious(true)"
          @keydown.down.native.exact.prevent="focusNext(true)"
          @keydown.esc.exact="away"
        >
          Outerwear
        </router-link>
        <!-- <span v-if="this.$route.params.category === 'outerwear'" class="sr-only"
          >Current page:
        </span>
        <span
          v-if="this.$route.params.category === 'outerwear'"
          class="dropdown-item"
          >Outerwear</span
        > -->
      </li>
      <li :class="this.$route.params.category === 'swimwear' ? 'active' : ''">
        <router-link
          :to="{ name: 'Category', params: { category: 'swimwear' } }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
          @keydown.tab.native.exact="focusNext(false)"
          @keydown.shift.tab.native="focusPrevious(false)"
          @keydown.up.native.exact.prevent="focusPrevious(true)"
          @keydown.down.native.exact.prevent="focusNext(true)"
          @keydown.esc.exact="away"
        >
          Swimwear
        </router-link>
        <!-- <span v-if="this.$route.params.category === 'swimwear'" class="sr-only"
          >Current page:
        </span>
        <span
          v-if="this.$route.params.category === 'swimwear'"
          class="dropdown-item"
          >Swimwear</span
        > -->
      </li>
      <li
        :class="this.$route.params.category === 'accessories' ? 'active' : ''"
      >
        <router-link
          :to="{ name: 'Category', params: { category: 'accessories' } }"
          exact-path-active-class="dropdown-item-active"
          class="dropdown-item"
          @keydown.shift.tab.native="focusPrevious(false)"
          @keydown.up.native.exact.prevent="focusPrevious(true)"
          @keydown.down.native.exact.prevent=""
          @keydown.tab.native.exact="away"
          @keydown.esc.exact="away"
        >
          Accessories
        </router-link>
        <!-- <span
          v-if="this.$route.params.category === 'accessories'"
          class="sr-only"
          >Current page:
        </span>
        <span
          v-if="this.$route.params.category === 'accessories'"
          class="dropdown-item"
          >Accessories</span -->
        <!-- >   -->
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
      active: false,
      focusedIndex: 0
    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
    away() {
      this.active = false;
      this.focusedIndex = 0;
    },
    startArrowKeys() {
      if (this.active) {
        this.$refs.dropdown.children[0].children[0].focus();
      }
    },
    focusPrevious(isArrowKey) {
      this.focusedIndex = this.focusedIndex - 1;
      if (isArrowKey) {
        this.focusItem();
      }
    },
    focusNext(isArrowKey) {
      this.focusedIndex = this.focusedIndex + 1;
      if (isArrowKey) {
        this.focusItem();
      }
    },
    focusItem() {
      console.log("refs: ", this.$refs);
      this.$refs.dropdown.children[this.focusedIndex].children[0].focus();
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
