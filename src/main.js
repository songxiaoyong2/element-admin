import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VuePageTransition from "vue-page-transition";

import "view-design/dist/styles/iview.css";

// 引入element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 将自动注册所有组件为全局组件
import dataV from "@jiaminghi/data-view";
import * as echarts from "echarts";
// 全局注册

Vue.use(VuePageTransition);
Vue.use(ElementUI);
Vue.use(dataV);
import ViewUI from "../node_modules/view-design";
console.log(ViewUI);
Vue.use(ViewUI);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
