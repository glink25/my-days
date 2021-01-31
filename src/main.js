import Vue from "vue";
import App from "./App.vue";
import {
  Button,
  Cell,
  SwipeCell,
  Popup,
  Dialog,
  Icon,
  Switch,
  DatetimePicker,
  RadioGroup,
  Radio,
  Notify,
  Overlay,
} from "vant";
import "@vant/touch-emulator";
import "vant/lib/button/style";
import "vant/lib/swipe-cell/style";
import "vant/lib/popup/style";
import "vant/lib/dialog/style";
import "vant/lib/switch/style";
import "vant/lib/datetime-picker/style";
import "vant/lib/radio-group/style";
import "vant/lib/radio/style";
import "vant/lib/notify/style";
import "vant/lib/overlay/style";
import "vant/lib/icon/local.css";
import "./registerServiceWorker";
Vue.config.productionTip = false;
[
  SwipeCell,
  Button,
  Cell,
  Popup,
  Dialog,
  Icon,
  Switch,
  DatetimePicker,
  RadioGroup,
  Radio,
  Notify,
  Overlay,
].forEach((e) => Vue.use(e));
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
