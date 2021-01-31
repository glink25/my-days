<template>
  <div class="days-zone">
    <List
      v-model="allDays"
      @itemClick="itemClick"
      @delete="delDay"
      :use-theme="useTheme"
    />
    <Footer :use-theme.sync="useTheme" @showAdd="showAdd" />
    <DayInfo
      :day="currentDay"
      :visible.sync="showDayInfo"
      @edit="onEditClick"
    />
    <AddDay
      :visible.sync="showAddDay"
      :config="dayConfig"
      @add="addDay"
      @edit="editDay"
    />
  </div>
</template>
<script>
import List from "./modules/List";
import Footer from "./modules/Footer";
import DayInfo from "./modules/DayInfo";
import AddDay from "./modules/AddDay";
import daysOperate from "./days-opt";
export default {
  name: "DaysList",
  components: { List, Footer, DayInfo, AddDay },
  data() {
    return {
      allDays: [],
      showDayInfo: false,
      currentDay: {},
      useTheme: this.getTheme(),
      showAddDay: false,
      dayConfig: {},
      shouldRefresh: 1,
    };
  },
  mounted() {
    this.getDays();
    const that = this;
    this.$bus.$on("refresh", function() {
      if (that.shouldRefresh % (24 * 60 * 60) === 1) that.getDays();
    });
    // this.useTheme = this.getTheme();
  },
  watch: {
    useTheme(val) {
      this.setTheme(val);
    },
  },
  methods: {
    ...daysOperate,
    itemClick(val) {
      this.currentDay = val;
      this.showDayInfo = true;
    },
    getDays() {
      this.allDays = this.findDays();
    },
    showAdd() {
      this.dayConfig = {};
      this.showAddDay = true;
    },
    addDay(val) {
      this.insertDay(val);
      this.getDays();
    },
    editDay(day) {
      this.replaceDay(this.dayConfig.id, day);
      this.getDays();
      this.dayConfig = {};
    },
    onEditClick(day) {
      this.showDayInfo = false;
      this.dayConfig = day;
      this.showAddDay = true;
    },
    delDay(val) {
      this.removeDay(val);
      this.getDays();
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
