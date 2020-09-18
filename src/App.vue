<template>
  <div id="app">
    <div class="fixed-zone">
      <TimeZone />
    </div>
    <div class="content-zone">
      <div class="placeholder"></div>
      <DaysList />
    </div>
  </div>
</template>

<script>
import DaysList from "./components/DaysZone.vue";
import TimeZone from "./components/TimeZone.vue";

export default {
  name: "App",
  components: {
    DaysList,
    TimeZone,
  },
};
</script>

<style>
@import url(./style/_variable.css);
body {
  padding: 0;
  margin: 0;
  background-color: var(--bg-color);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
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
  height: 100%;
  background: transparent;
}
.placeholder {
  width: 100%;
  height: 290px;
  background: none;
}
</style>
