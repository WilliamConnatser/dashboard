<template>
  <small :class="`text-${variant}`" class="d-flex align-items-center">
    <svg
      v-if="size === 'md'"
      width="8"
      height="8"
      class="me-1"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ blink: blink }"
    >
      <circle cx="4" cy="4" r="4" :class="`fill-${variant}`" />
    </svg>
    <svg
      v-else-if="size === 'sm'"
      width="6"
      height="6"
      class="me-1"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ blink: blink }"
    >
      <circle cx="3" cy="3" r="3" :class="`fill-${variant}`" />
    </svg>

    <span>
      <slot></slot>
    </span>
  </small>
</template>

<script>
export default {
  props: {
    variant: String, //"success", "primary", "muted", "danger"
    text: String,
    blink: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "md", //sm or md
    },
  },
  data() {
    return {
      state: {},
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.blink {
  animation: blink 1.5s infinite ease;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
