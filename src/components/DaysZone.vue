<template>
  <div class="days-list">
    <List v-model="allDays" />
    <Footer />
  </div>
</template>
<script>
import List from "./modules/List";
import Footer from "./modules/Footer";
export default {
  name: "DaysList",
  components: { List, Footer },
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
        {
          name: "cc",
          createTime: "2020-09-11 01:00:10",
          updateTime: "",
          time: "2020-01-11 01:00:10",
          comment: "",
          repeat: "",
        },
      ],
    };
  },
};
</script>
<style scoped>
.days-list {
  width: 100%;
  height: 100%;
  background-color: var(--list-bg-color);
  border-radius: var(--radius) var(--radius) 0 0;
  padding-top: var(--radius);
}
</style>
