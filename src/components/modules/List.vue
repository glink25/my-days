<template>
  <div class="list">
    <span class="title">{{
      lists.length ? "我的日子" : "还没有日子，去添加吧"
    }}</span>
    <van-swipe-cell
      v-for="(item, index) in lists"
      :ref="`swiper${index}`"
      :name="`swiper${index}`"
      :key="index"
      :class="'list-item'"
      :style="{ background: item.background }"
    >
      <div
        class="item-wrapper"
        @click="itemClick(item)"
        @touchstart="ifOffClick"
        @mousedown="ifOffClick"
      >
        <div class="item-content">
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
        <div class="item-append"></div>
      </div>
      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          class="del-button"
          :class="{ 'long-button': buttonStyle[index] }"
          @click="confirmDel(item, index)"
        />
      </template>
    </van-swipe-cell>
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
      offClick: false,
      buttonStyle: [],
      currentRef: "",
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
    // this.buttonStyle = this.lists.map(() => false);
  },

  methods: {
    itemClick(val) {
      console.log(this.offClick);
      if (!this.offClick) this.$emit("itemClick", val);
    },
    confirmDel(val) {
      this.$dialog.confirm({ title: "确认删除这个日子吗？" }).then(() => {
        this.$emit("delete", val);
      });
      // if (this.clickDel) {
      //   // delete
      //   this.clickDel = true;
      // } else {
      //   this.buttonStyle[index] = true;
      //   this.clickDel = true;
      //   console.log(val);
      // }
    },
    ifOffClick() {
      let lists = this.$refs,
        len = lists.length - 1;
      while (lists[len]) {
        if (lists[len--].offset !== 0) {
          this.offClick = true;
          return;
        }
      }
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
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: var(--radius);
}
.item-wrapper {
  height: 100%;
  margin-left: 5px;
}
.item-content {
  width: calc(100% - 5px);
  height: calc(100% - 5px);
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
  line-height: 100%;
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
/deep/ .van-swipe-cell__wrapper {
  height: 100%;
}
.del-button {
  height: 100%;
}
</style>
