<template>
  <div v-if="visible" class="mask">
    <div @click.stop="$emit('update:visible', false)" class="mask-model"></div>
    <div class="mask-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "MaskOver",
  props: {
    visible: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.mask {
  z-index: 1000;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
}
.mask-content {
  position: relative;
  top: -50%;
  width: 100%;
  height: 50%;
  background-color: white;
}
.mask-model {
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.2;
}
</style>
