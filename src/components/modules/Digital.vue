<template>
  <div class="digital-wrapper">
    <span>时间在流逝</span>
    <div class="item">
      <span>今年{{ isLeft ? "还有" : "已过了" }}</span
      ><span class="num orange">{{ yearLeft }}</span
      ><span>天</span>
    </div>
    <div class="item">
      <span>本周{{ isLeft ? "剩余" : "已过了" }}</span
      ><span class="num green">{{ weekLeft }}</span
      ><span>天</span>
    </div>
    <div class="item">
      <span>本月{{ isLeft ? "剩余" : "已过了" }}</span
      ><span class="num blue">{{ monthLeft }}</span
      ><span>天</span>
    </div>
    <div class="item">
      <span>今日{{ isLeft ? "还有" : "已过了" }}</span
      ><span class="num red">{{ seconds }}</span
      ><span>秒</span>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
const weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday);

export default {
  name: "Digital",
  data() {
    return { isLeft: true, seconds: 0, tick: "" };
  },
  computed: {
    yearLeft() {
      if (this.isLeft) return dayjs().diff(dayjs().startOf("year"), "day");
      return dayjs()
        .endOf("year")
        .diff(dayjs(), "day");
    },
    weekLeft() {
      if (this.isLeft) return dayjs().weekday();
      return 7 - dayjs().weekday();
    },
    monthLeft() {
      if (this.isLeft) return dayjs().diff(dayjs().startOf("month"), "day");
      return dayjs()
        .endOf("month")
        .diff(dayjs(), "day");
    },
  },
  watch: {
    isLeft() {
      this.setSeconds();
    },
  },
  mounted() {
    this.setSeconds();
  },
  beforeDestroy() {
    clearInterval(this.tick);
    this.tick = null;
  },
  methods: {
    setSeconds() {
      clearInterval(this.tick);
      this.tick = null;
      this.tick = null;
      const that = this;
      if (this.isLeft) {
        this.tick = setInterval(() => {
          that.seconds = dayjs()
            .endOf("day")
            .diff(dayjs(), "second");
        }, 1000);
      } else {
        this.tick = setInterval(() => {
          that.seconds = dayjs().diff(dayjs().startOf("day"), "second");
        }, 1000);
      }
    },
  },
};
</script>
<style scoped>
.digital-wrapper {
  margin: 40px 10px 10px 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-end;
}
.digital-wrapper span {
  color: var(--list-color);
}
.item {
  padding: 10px;
  vertical-align: bottom;
}
.num {
  font-size: 32px;
  font-weight: 500;
  line-height: 85%;
}
.num.orange {
  color: var(--orange);
}
.num.green {
  color: var(--green);
}
.num.blue {
  color: var(--blue);
}
.num.red {
  color: var(--red);
}
</style>
