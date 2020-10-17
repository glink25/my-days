<template>
  <div id="app">
    <div class="fixed-zone">
      <TimeZone ref="timeZone" />
    </div>
    <div class="content-zone">
      <div class="placeholder" @click="change"></div>
      <DaysZone id="daysZone" class="days" />
    </div>
  </div>
</template>

<script>
import DaysZone from "./components/DaysZone.vue";
import TimeZone from "./components/TimeZone.vue";

export default {
  name: "App",
  components: {
    DaysZone,
    TimeZone,
  },
  mounted() {
    // console.log("hell");
    // const daysZone = document.getElementById("daysZone");
    document.body.addEventListener("scroll", function(e) {
      console.log(e);
    });
  },
  beforeDestroy() {},
  methods: {
    change() {
      const timeZone = this.$refs.timeZone;
      timeZone.isLeft = !timeZone.isLeft;
    },
    onscroll(e) {
      console.log(e);
    },
  },
};
</script>

<style>
@import url(./style/_variable.css);
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: var(--bg-color) !important;
}
* {
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
/* 禁止选择文本 */
*:not(input) {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fixed-zone {
  position: fixed;
  width: 100%;
  height: 300px;
  background-color: var(--bg-color);
  z-index: -1;
}
.content-zone {
  width: 100%;
  background: transparent;
  display: flex;
  flex-flow: column nowrap;
}
.placeholder {
  flex-basis: 320px;
  width: 100%;
  background: none;
}
.days {
  flex: 1;
  min-height: calc(100vh - 320px);
}
</style>
