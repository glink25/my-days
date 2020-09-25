<template>
  <van-popup
    v-model="selfVisible"
    get-container="body"
    position="bottom"
    :style="{ height: '100%' }"
  >
    <template>x</template>
  </van-popup>
</template>
<script>
export default {
  name: "AddDay",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selfVisible: false,
    };
  },
  watch: {
    visible(val) {
      this.selfVisible = val;
    },
    selfVisible(val) {
      this.$emit("update:visible", val);
    },
  },
};
</script>
<style scoped></style>
