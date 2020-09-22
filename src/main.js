import Vue from "vue";
import App from "./App.vue";
import { Popup, Swipeout, SwipeoutItem, SwipeoutButton } from "vux";
Vue.config.productionTip = false;
[Popup, Swipeout, SwipeoutItem, SwipeoutButton].forEach((e) => Vue.use(e));
new Vue({
  render: (h) => h(App),
}).$mount("#app");
