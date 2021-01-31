<template>
  <van-popup v-model="selfVisible" get-container="body" position="bottom">
    <template
      ><div class="info-wrapper" :style="{ background: day.background }">
        <div class="info-body">
          <div class="info-body-head">
            <div class="info-item info-name allow-select">{{ day.name }}</div>
            <div class="edit-button" @click="edit(day)">
              <van-icon name="edit" />
            </div>
          </div>
          <div class="info-item info-comment allow-select">
            {{ day.comment }}
          </div>
          <div class="info-item info-date">{{ dayStamp }}</div>
        </div>
      </div></template
    >
  </van-popup>
</template>
<script>
import dayjs from "dayjs";
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
  computed: {
    dayStamp() {
      const date = dayjs(this.day.date);
      switch (this.day.repeat) {
        case "year":
          return date.format("每年MM月DD日");
        case "month":
          return date.format("每月DD日");
        case "week":
          return `每周${
            ["日", "一", "二", "三", "四", "五", "六"][date.day()]
          }`;
        default:
          return this.day.date;
      }
    },
  },
  methods: {
    edit(day) {
      this.$emit("edit", day);
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
  padding: 10px 15px 20px 15px;
}
.info-body-head {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
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
