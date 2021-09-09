<template>
  <div class="address-book">
    <h3 class="text-left mb-2">
      Address book
    </h3>
    <div v-for="address in addressBook" :key="address._id">
      <accordion
        :panelId="address._id"
        :clickedPanel="clickedPanel"
        v-on:header-clicked="headerClicked"
      >
        <template v-slot:header>{{ address.addressline1 }}</template>
        <template v-slot:panel>
          <p class="mb-0">
            {{ address.addressline1 }}
          </p>
          <p v-if="address.addressline2" class="mb-0">
            {{ address.addressline2 }}
          </p>
          <p class="mb-0">
            {{ address.city }}, {{ address.state }} {{ address.zipcode }}
          </p>
        </template>
      </accordion>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Accordion from "@/components/Accordion.vue";
export default {
  components: {
    Accordion
  },
  data() {
    return {
      clickedPanel: ""
    };
  },
  computed: {
    ...mapState({
      addressBook: state => state.user.addressBook
    })
  },
  methods: {
    // using accordion solution from this youTube  video https://www.youtube.com/watch?v=4BGfvKpP-b0&t=10s
    headerClicked(panelId, _event) {
      this.clickedPanel === panelId
        ? (this.clickedPanel = "")
        : (this.clickedPanel = panelId);
      const allPanels = document.getElementsByClassName("panel");
      allPanels.forEach(panel => {
        if (_event.currentTarget.nextElementSibling !== panel) {
          panel.style.maxHeight = null;
        }
        panel.previousElementSibling.classList.remove("active");
      });
      let thisPanel = _event.currentTarget.nextElementSibling;
      if (thisPanel.style.maxHeight) {
        thisPanel.style.maxHeight = null;
      } else {
        thisPanel.style.maxHeight = thisPanel.scrollHeight + "px";
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
