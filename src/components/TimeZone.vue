<template>
  <div class="time-zone">
    <Progress
      :year="yearPct"
      :month="monthPct"
      :week="weekPct"
      :day="dayPct"
      class="progress-zone"
    />
    <Digital
      ref="digital"
      :is-left="isLeft"
      :sec="isLeft ? leftSec : passSec"
      :year="yearLeft"
      :week="weekLeft"
      :month="monthLeft"
      class="digital-zone"
    />
  </div>
</template>
<script>
import Progress from "./modules/Progress";
import Digital from "./modules/Digital";
import dayjs from "dayjs";
const isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(isoWeek);

export default {
  name: "TimeZone",
  components: { Progress, Digital },
  data() {
    return {
      // digital
      isLeft: true,
      leftSec: dayjs()
        .endOf("day")
        .diff(dayjs(), "second"),
      tickLeft: "",
      tickPass: "",
      passSec: dayjs().diff(dayjs().startOf("day"), "second"),
    };
  },
  computed: {
    yearLeft() {
      if (!this.isLeft) return dayjs().diff(dayjs().startOf("year"), "day");
      return dayjs()
        .endOf("year")
        .diff(dayjs(), "day");
    },
    weekLeft() {
      if (!this.isLeft) return dayjs().isoWeekday();
      return 7 - dayjs().isoWeekday();
    },
    monthLeft() {
      if (!this.isLeft) return dayjs().diff(dayjs().startOf("month"), "day");
      return dayjs()
        .endOf("month")
        .diff(dayjs(), "day");
    },
    // progress
    yearPct() {
      const mount = dayjs()
        .endOf("year")
        .diff(dayjs().startOf("year"), "day");
      return 1 - this.yearLeft / mount;
    },
    monthPct() {
      const mount = dayjs()
        .endOf("month")
        .diff(dayjs().startOf("month"), "day");
      return 1 - this.monthLeft / mount;
    },
    weekPct() {
      return 1 - this.weekLeft / 7;
    },
    dayPct() {
      return this.passSec / (24 * 60 * 60);
    },
  },
  watch: {
    isLeft() {
      this.setSeconds();
    },
    passSec(v) {
      if (v) this.sec = v;
    },
  },
  mounted() {
    this.setSeconds();
  },
  beforeDestroy() {
    clearInterval(this.tick);
    this.tickLeft = null;
    this.tickPass = null;
  },
  methods: {
    setSeconds() {
      clearInterval(this.tick);
      this.tickLeft = null;
      this.tickPass = null;
      const that = this;
      this.tickLeft = setInterval(() => {
        that.leftSec = dayjs()
          .endOf("day")
          .diff(dayjs(), "second");
      }, 1000);
      this.tickPass = setInterval(() => {
        that.passSec = dayjs().diff(dayjs().startOf("day"), "second");
      }, 1000);
    },
  },
};
</script>
<style scoped>
.time-zone {
  height: 100%;
}
.progress-zone {
  height: 100%;
  width: 100%;
}
.digital-zone {
  position: relative;
  height: 100%;
  top: -100%;
  z-index: 10;
}
</style>
