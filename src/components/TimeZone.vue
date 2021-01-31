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

function pctLimit(val) {
  if (val > 1) return 1;
  if (val < 0) return 0;
  return val;
}

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
      shouldRefresh: 1,
    };
  },
  computed: {
    yearLeft() {
      if (this.shouldRefresh < 0) return null;
      if (!this.isLeft) return dayjs().diff(dayjs().startOf("year"), "day");
      return dayjs()
        .endOf("year")
        .diff(dayjs(), "day");
    },
    weekLeft() {
      if (this.shouldRefresh < 0) return null;
      if (!this.isLeft) return dayjs().isoWeekday();
      return 7 - dayjs().isoWeekday();
    },
    monthLeft() {
      if (this.shouldRefresh < 0) return null;
      if (!this.isLeft)
        return dayjs().diff(dayjs().startOf("month"), "day") + 1;
      return (
        dayjs()
          .endOf("month")
          .diff(dayjs(), "day") - 1
      );
    },
    // progress
    yearPct() {
      if (this.shouldRefresh < 0) return null;
      const mount = dayjs()
        .endOf("year")
        .diff(dayjs().startOf("year"), "day");
      return pctLimit(1 - this.yearLeft / mount);
    },
    monthPct() {
      if (this.shouldRefresh < 0) return null;
      const mount = dayjs()
        .endOf("month")
        .diff(dayjs().startOf("month"), "day");
      return pctLimit(1 - this.monthLeft / mount);
    },
    weekPct() {
      if (this.shouldRefresh < 0) return null;
      return pctLimit(1 - this.weekLeft / 7);
    },
    dayPct() {
      if (this.shouldRefresh < 0) return null;
      return pctLimit(this.passSec / (24 * 60 * 60));
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
    const that = this;
    this.$bus.$on("refresh", function() {
      that.refresh();
    });
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
    refresh() {
      this.shouldRefresh += 1;
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
