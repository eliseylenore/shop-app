<template>
  <div class="accordion">
    <button
      :id="'panel-' + panelId"
      @click="$emit('header-clicked', panelId, $event)"
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
  props: {
    panelId: {
      type: String,
      required: true
    },
    clickedPanel: {
      type: String,
      required: true
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
