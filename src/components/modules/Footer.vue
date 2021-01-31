<template>
  <div class="footer">
    <div class="option">
      <transition name="slide">
        <div v-show="showMoreOption" class="option-inner">
          <div class="theme">
            <van-switch v-model="selfShow" size="20" /><span>使用渐变主题</span>
          </div>
        </div>
      </transition>
      <div class="option-outer">
        <van-button
          class="more-button"
          @click="showMoreOption = !showMoreOption"
        >
          <van-icon name="ellipsis" />
        </van-button>
        <van-button class="add-button" @click="$emit('showAdd')">
          <van-icon name="plus" />
        </van-button>
      </div>
    </div>
    <span class="copy-right">Copyright 2020 无良的北极 Rights Reserved.</span>
  </div>
</template>
<script>
export default {
  name: "Footer",
  props: {
    useTheme: { type: Boolean, required: true },
  },
  data() {
    return {
      showMoreOption: false,
      selfShow: this.useTheme,
    };
  },
  watch: {
    useTheme() {
      this.selfShow = this.useTheme;
    },
    selfShow(val) {
      this.$emit("update:useTheme", val);
    },
  },
};
</script>
<style scoped>
/* .footer span {
  font-size: 10px;
} */
.footer {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.option {
  padding-bottom: 10px;
}
.option-outer,
.option-inner {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 32px;
  overflow: hidden;
  padding: 2px 6px;
}
.theme {
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.theme span {
  padding-left: 5px;
}
.more-button,
.add-button {
  border: none;
  background: none;
  height: 24px;
}
.add-button {
  color: white;
  background-color: tomato;
  width: 60px;
  border-radius: 16px;
}
.van-icon {
  font-size: 20px;
}
.copy-right {
  width: 100%;
  font-size: 8px;
  text-align: center;
  color: gray;
}
/* slide */
.slide-enter,
.slide-leave-to {
  height: 0;
  opacity: 0;
}
.slide-enter-active {
  transition: all 0.6s;
}
.slide-leave-active {
  transition: all 0.6s;
}
</style>
