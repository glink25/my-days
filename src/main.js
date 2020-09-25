import Vue from "vue";
import App from "./App.vue";
import { Button, Cell, SwipeCell, Popup, Dialog, Icon, Switch } from "vant";
import "@vant/touch-emulator";
import "vant/lib/button/style";
import "vant/lib/swipe-cell/style";
import "vant/lib/popup/style";
import "vant/lib/dialog/style";
import "vant/lib/switch/style";
import "vant/lib/icon/local.css";
Vue.config.productionTip = false;
[SwipeCell, Button, Cell, Popup, Dialog, Icon, Switch].forEach((e) =>
  Vue.use(e)
);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
