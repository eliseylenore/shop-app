<template>
  <div class="accordion">
    <button
      :id="'panel-' + panelId"
      @click="headerClicked(panelId, $event)"
      class="btn w-100 panel-header"
      aria-expanded="false"
    >
      <slot name="header"></slot>
    </button>
    <div class="panel" role="region" :aria-labelledby="'panel-' + panelId">
      <div class="p-4 grey-border">
        <slot name="panel"></slot>
      </div>
    </div>
  </div>
</template>

<script>
//style related imports
export default {
  props: {
    panelId: {
      type: String,
      required: true
    }
  },
  methods: {
    // using accordion solution from this youTube  video https://www.youtube.com/watch?v=4BGfvKpP-b0&t=10s

    headerClicked(panelId, _event) {
      // hide clickable elements in panel when collapsed
      // as shown in https://www.youtube.com/watch?v=BoAsayPVogE&t=289s
      let focusableElementsString =
        "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex='0'], contenteditable";
      this.$emit("header-clicked", panelId);
      const allPanels = document.getElementsByClassName("panel");
      allPanels.forEach(panel => {
        if (_event.currentTarget.nextElementSibling !== panel) {
          panel.style.maxHeight = null;
          let focusableElements = panel.querySelectorAll(
            focusableElementsString
          );
          focusableElements.forEach(elem => {
            elem.setAttribute("tabindex", -1);
          });
        }
        panel.previousElementSibling.setAttribute("aria-expanded", "false");
      });

      let thisPanel = _event.currentTarget.nextElementSibling;
      let focusableElements = thisPanel.querySelectorAll(
        focusableElementsString
      );
      if (thisPanel.style.maxHeight) {
        thisPanel.style.maxHeight = null;
        _event.currentTarget.setAttribute("aria-expanded", "false");
        focusableElements.forEach(elem => {
          elem.setAttribute("tabindex", -1);
        });
      } else {
        thisPanel.style.maxHeight = thisPanel.scrollHeight + "px";
        _event.currentTarget.setAttribute("aria-expanded", "true");
        focusableElements.forEach(elem => {
          elem.removeAttribute("tabindex");
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.panel-header {
  padding-left: 2em;
  border-bottom: 1px solid #ced4da;
  &[aria-expanded="true"] {
    background-color: $turquoise;
    color: white;
    border-bottom: none;
  }
  text-align: left;
  &::before {
    content: "+";
    font-size: 2em;
    color: #a3a7aa;
    position: absolute;
    margin-top: -0.5em;
    left: 0.7em;
  }
  &[aria-expanded="true"]::before {
    content: "–";
    color: white;
  }
}
.panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.grey-border {
  border: 1px solid #ced4da;
}
</style>
