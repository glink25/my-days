<template>
  <MaskOver :visible.sync="selfVisible">
    <template>x</template>
  </MaskOver>
</template>
<script>
import MaskOver from "../ui/Mask";
export default {
  name: "AddDay",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  components: { MaskOver },
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
