<template>
  <div class="list">
    <div
      v-for="(item, index) in lists"
      :key="index"
      :class="'list-item'"
      :style="{ background: item.background }"
      @click="$emit('item-click')"
    >
      <template v-if="item.status === 'now'">
        <span>今天是{{ item.name }}</span>
      </template>
      <template v-else>
        <div class="left">
          <span class="prefix">距离</span>
          <span class="name">{{ item.name }}</span>
          <span class="middle">{{
            item.status === "after" ? "已经过了" : "还有"
          }}</span>
        </div>
        <div class="right">
          <span class="num">{{ item.num }}</span>
          <span class="append">天</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "List",
  model: {
    prop: "data",
    event: "change",
  },
  props: {
    data: { type: Array, required: true },
  },
  data() {
    return {};
  },
  computed: {
    lists() {
      console.log(dayjs());
      return this.data.map((e) => {
        const num = dayjs().diff(dayjs(e.time), "day");
        return {
          ...e,
          num,
          status: num === 0 ? "now" : num > 0 ? "after" : "before", //before:after:now
          background: "pink",
        };
      });
    },
  },
};
</script>
<style scoped>
.list {
  margin: 0 10px;
  display: flex;
  flex-flow: column nowrap;
  color: var(--list-color);
}
.list-item {
  margin: 5px 0;
  padding: 5px;
  height: 70px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  border: 1px solid transparent;
  border-radius: var(--radius);
}
.list-item .left {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-end;
  vertical-align: bottom;
}
.list-item .right {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: flex-end;
  vertical-align: bottom;
}
.list-item span {
  font-size: 16px;
}
.list-item .name {
  font-weight: bold;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-item .num {
  font-weight: bold;
  font-size: 36px;
  line-height: 80%;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
