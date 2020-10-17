<template>
  <van-popup v-model="selfVisible" get-container="body" position="bottom">
    <template
      ><div class="info-wrapper" :style="{ background: day.background }">
        <div class="info-body">
          <div class="info-item info-name allow-select">{{ day.name }}</div>
          <div class="info-item info-comment allow-select">
            {{ JSON.stringify(day) }}
          </div>
          <div class="info-item info-date">{{ day.date }}</div>
        </div>
      </div></template
    >
  </van-popup>
</template>
<script>
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
<style scoped>
.van-popup {
  background-color: transparent;
  height: 50%;
}
.info-wrapper {
  width: 100%;
  height: 100%;
  border-radius: var(--radius) var(--radius) 0 0;
  background-color: var(--white);
  display: flex;
}
.info-body {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
  color: var(--white);
  padding: 10px;
}
.info-name {
  font-size: 32px;
}
.info-comment {
  flex: 1;
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  font-size: 24px;
}
.info-date {
  width: 100%;
  text-align: end;
  font-size: 16px;
}
</style>
