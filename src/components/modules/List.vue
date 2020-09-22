<template>
  <div class="list">
    <span class="title">{{
      lists.length ? "我的日子" : "还没有日子，去添加吧"
    }}</span>
    <div
      v-for="(item, index) in lists"
      :key="index"
      :class="'list-item'"
      :style="{ background: item.background }"
      @click="itemClick(item)"
      @touchstart="touchStart($event, index)"
      @touchmove="touchMove($event, index)"
      @touchend="touchEnd($event, index)"
    >
      <div class="item-content" :style="{ left: `${left[index]}px` }">
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
      <div
        class="item-append"
        :style="{ left: `calc(100% + ${left[index]}px)` }"
      ></div>
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
    return {
      left: [],
      startX: 0,
    };
  },
  computed: {
    lists() {
      return this.data.map((e) => {
        const num = dayjs().diff(dayjs(e.time), "day");
        return {
          ...e,
          num,
          status: num === 0 ? "now" : num > 0 ? "after" : "before",
          background: "pink",
        };
      });
    },
  },
  watch: {
    lists(val) {
      this.left = val.map(() => 0);
    },
  },
  mounted() {
    this.left = this.lists.map(() => 0);
  },

  methods: {
    itemClick(val) {
      this.$emit("itemClick", val);
    },
    touchStart(e) {
      this.startX = e.touches[0].clientX;
    },
    touchMove(e, index) {
      const offset = e.touches[0].clientX - this.startX;
      if (offset < 0 && offset > -60) this.left[index] = offset;
    },
    touchEnd(e) {
      console.log(e);
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
span.title {
  color: black;
  text-align: center;
}
.list-item {
  margin: 5px 0;
  height: 75px;
  /* display: flex;
  align-items: flex-end;
  justify-content: space-between; */
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: var(--radius);
}
.item-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.item-content .left {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-end;
  vertical-align: bottom;
}
.item-content .right {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: flex-end;
  vertical-align: bottom;
}
.item-content span {
  font-size: 16px;
}
.item-content .name {
  font-weight: bold;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-content .num {
  font-weight: bold;
  font-size: 36px;
  line-height: 85%;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-append {
  position: relative;
  top: -100%;
  left: 100%;
  height: calc(100% + 4px);
  width: 60px;
  background-color: red;
}
</style>
