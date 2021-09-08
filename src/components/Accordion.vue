<template>
  <div class="accordion">
    <button
      :id="'panel-' + panelId"
      @click="headerClicked(panelId, $event)"
      :class="[
        'btn w-100 panel-header',
        clickedPanel === panelId ? 'active' : ''
      ]"
      :aria-expanded="clickedPanel === panelId ? 'true' : 'false'"
    >
      <slot name="header"></slot>
    </button>
    <div
      :class="['panel', clickedPanel === panelId ? 'active' : '']"
      role="region"
      :aria-hidden="clickedPanel === panelId ? 'true' : 'false'"
      :aria-labelledby="'panel-' + panelId"
    >
      <div class="p-4 grey-border">
        <slot name="panel"></slot>
      </div>
    </div>
  </div>
</template>

<script>
//style related imports
export default {
  data() {
    return {
      clickedPanel: ""
    };
  },
  props: {
    panelId: {
      type: String,
      required: true
    }
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
<style lang="scss" scoped>
.panel-header {
  padding-left: 2em;
  border-bottom: 1px solid #ced4da;
  &.active {
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
  &.active::before {
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
