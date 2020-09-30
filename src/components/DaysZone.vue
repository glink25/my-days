<template>
  <div class="days-zone">
    <List v-model="allDays" @itemClick="itemClick" />
    <Footer />
    <DayInfo :day="currentDay" :visible.sync="showDayInfo" />
  </div>
</template>
<script>
import List from "./modules/List";
import Footer from "./modules/Footer";
import DayInfo from "./modules/DayInfo";
import daysOperate from "./days-opt";
export default {
  name: "DaysList",
  components: { List, Footer, DayInfo },
  data() {
    return {
      allDays: [
        {
          name: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          createTime: "2020-01-11 01:00:10",
          updateTime: "",
          time: "2020-09-11 01:00:10",
          comment: "",
          repeat: "",
        },
        // {
        //   name: "cc",
        //   createTime: "2020-09-11 01:00:10",
        //   updateTime: "",
        //   time: "2020-01-11 01:00:10",
        //   comment: "",
        //   repeat: "",
        // },
        // {
        //   name: "cc",
        //   createTime: "2020-09-11 01:00:10",
        //   updateTime: "",
        //   time: "2020-01-11 01:00:10",
        //   comment: "",
        //   repeat: "",
        // },
        // {
        //   name: "cc",
        //   createTime: "2020-09-11 01:00:10",
        //   updateTime: "",
        //   time: "2020-01-11 01:00:10",
        //   comment: "",
        //   repeat: "",
        // },
      ],
      showDayInfo: false,
      currentDay: {},
    };
  },
  methods: {
    ...daysOperate,
    itemClick(val) {
      this.currentDay = val;
      this.showDayInfo = true;
    },
  },
};
</script>
<style scoped>
.days-zone {
  width: 100%;
  height: 100%;
  background-color: var(--list-bg-color);
  border-radius: var(--radius) var(--radius) 0 0;
  padding-top: var(--radius);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}
</style>
