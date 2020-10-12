<template>
  <div class="digital-wrapper">
    <span>时间在流逝</span>
    <div class="item">
      <span>今年{{ isLeft ? "还有" : "已过了" }}</span
      ><span class="num orange">{{ year }}</span
      ><span>天</span>
    </div>
    <div class="item">
      <span>本周{{ isLeft ? "剩余" : "已过了" }}</span
      ><span class="num green">{{ week }}</span
      ><span>天</span>
    </div>
    <div class="item">
      <span>本月{{ isLeft ? "剩余" : "已过了" }}</span
      ><span class="num blue">{{ month }}</span
      ><span>天</span>
    </div>
    <div class="item">
      <span>今日{{ isLeft ? "还有" : "已过了" }}</span
      ><span class="num red">{{ sec }}</span
      ><span>秒</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Digital",
  props: {
    isLeft: { type: Boolean, required: true },
    year: { type: Number, required: true },
    week: { type: Number, required: true },
    month: { type: Number, required: true },
    sec: { type: Number, required: true },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.digital-wrapper {
  margin: 40px 10px 10px 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-end;
}
.digital-wrapper span {
  color: var(--list-color);
}
.item {
  padding: 10px;
  vertical-align: bottom;
}
.num {
  font-size: 32px;
  font-weight: 500;
  line-height: 85%;
}
.num.orange {
  color: var(--orange);
}
.num.green {
  color: var(--green);
}
.num.blue {
  color: var(--blue);
}
.num.red {
  color: var(--red);
}
</style>
