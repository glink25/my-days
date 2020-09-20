<template>
  <transition name="mask">
    <div v-show="visible" class="mask">
      <transition name="fade">
        <div
          v-if="visible"
          @click.stop="$emit('update:visible', false)"
          class="mask-model"
        ></div>
      </transition>
      <transition name="slide">
        <div v-if="visible" class="mask-content">
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  name: "MaskOver",
  props: {
    visible: { type: Boolean, default: false },
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
/* transition */
.mask-enter,
.mask-leave-to {
  transition-delay: 0.4s;
}
.mask-enter-active,
.mask-leave-active {
  transition-delay: 0.4s;
}
/* fade */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.4s ease;
}
.fade-leave-active {
  transition: all 0.4s ease;
}
/* slide */
.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}
.slide-enter-active {
  transition: all 0.4s;
}
.slide-leave-active {
  transition: all 0.4s;
}
</style>
