<template>
  <div
    v-b-tooltip.hover.left
    class="toggle"
    :class="{
      'toggle-off': !state.isOn,
      'toggle-on': state.isOn,
      'toggle-disabled': disabled,
    }"
    :title="tooltip"
    @click="toggle"
  >
    <div
      class="toggle-switch justify-content-center"
      :class="{
        'toggle-switch-off': !state.isOn,
        'toggle-switch-on': state.isOn,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      state: {
        isOn: true,
      },
    };
  },
  computed: {},
  methods: {
    toggle() {
      if (this.disabled) {
        return;
      }
      this.state.isOn = !this.state.isOn;
    },
  },
};
</script>

<style scoped lang="scss">
.toggle {
  border-radius: 30px;
  width: 60px;
  height: 36px;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  background: linear-gradient(346.78deg, #f7fcfc 0%, #fafcfa 100%);
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.1);
  &.toggle-on {
    background: var(--success);
    box-shadow: none;
  }
  &.toggle-disabled {
    cursor: not-allowed;
  }
}
.toggle-switch {
  margin: 2px;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  background: #ffffff;
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.toggle-switch-off {
  transform: translateX(0);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.toggle-switch-on {
  transform: translateX(24px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
