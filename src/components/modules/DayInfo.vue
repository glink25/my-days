<template>
  <MaskOver :visible.sync="selfVisible">
    <template>{{ day.name }}</template>
  </MaskOver>
</template>
<script>
import MaskOver from "../ui/Mask";
export default {
  name: "DayInfo",
  props: {
    day: {
      type: Object,
      required: true,
    },
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
