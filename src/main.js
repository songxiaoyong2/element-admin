import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// 引入element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 全局注册
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
