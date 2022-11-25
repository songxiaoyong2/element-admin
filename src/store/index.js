import Vue from "vue";
import Vuex from "vuex";
import { loginApi } from "@/api";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: null,
    token: sessionStorage.getItem("token"),
  },
  getters: {},
  mutations: {
    isCollapseChange(state, flag) {
      state.isCollapse = flag;
    },
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
  },
  actions: {
    async userLogin(context, page) {
      const { data } = await getOrderListApi(page);
      console.log(data);
    },
  },
  modules: {},
});
