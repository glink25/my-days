<template>
  <div id="app">
    <div class="fixed-zone">
      <TimeZone ref="timeZone" />
      <!-- <div id="scroll-placeholder"></div> -->
    </div>
    <div class="content-zone">
      <div class="placeholder" @click="change"></div>
      <DaysZone id="daysZone" class="days" />
      <div class="sticky-placeholder"></div>
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
  beforeCreate() {
    if (
      navigator.userAgent.indexOf("iPhone") != -1 ||
      navigator.userAgent.indexOf("Mac OS") != -1
    ) {
      if (!window.navigator.standalone) {
        this.$notify("此页面为PWA站点，将其安装到主屏幕来获得最佳体验");
      }
    }
    //chrome支持添加到桌面
    else {
      window.addEventListener("beforeinstallprompt", (event) => {
        event.userChoice.then((result) => {
          console.log(result.outcome);
        });
      });
    }
  },
  mounted() {
    const that = this;
    setInterval(function() {
      that.$bus.$emit("refresh");
    }, 60000);
    // const daysZone = document.getElementById("daysZone");
    // const placeholder = document.getElementById("scroll-placeholder");
    // window.addEventListener("scroll", function(e) {
    //   let scrollTop =
    //     window.pageYOffset || daysZone.scrollTop || document.body.scrollTop;
    //   let clientHeight =
    //     document.documentElement.clientHeight || document.body.clientHeight;
    //   let scrollHeight =
    //     document.documentElement.scrollHeight || document.body.scrollHeight;
    //   console.log(scrollHeight, clientHeight, scrollTop);
    //   if (
    //     scrollHeight > clientHeight &&
    //     scrollTop + clientHeight > scrollHeight
    //   ) {
    //     placeholder.style.height = `${20 + scrollTop}px`;
    //   } else {
    //     placeholder.style.height = `0px`;
    //   }
    // });
    ////
    // const initScrollTop = 0;
    // var target = document.getElementById("daysZone");
    // // 创建观察者对象
    // var observer = new MutationObserver(function() {
    //   let scrollTop =
    //     window.pageYOffset ||
    //     document.getElementById("daysZone").scrollTop ||
    //     document.body.scrollTop;
    //   console.log(scrollTop);
    //   if (scrollTop != initScrollTop) {
    //     console.log(scrollTop);
    //   }
    // });
    // // 配置观察选项:
    // var config = {
    //   attributes: true,
    // };
    // // 传入目标节点和观察选项
    // observer.observe(target, config);
  },
  beforeDestroy() {},
  methods: {
    change() {
      const timeZone = this.$refs.timeZone;
      timeZone.isLeft = !timeZone.isLeft;
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
/* #scroll-placeholder {
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100vw;
  height: 0px;
  background-color: var(--list-bg-color);
} */
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
