import router from "@/router";
import axios from "axios";
import { Message } from "element-ui";
axios.defaults.baseURL = "http://47.98.35.16:8888";
axios.defaults.timeout = 5000;
axios.defaults.timeoutErrorMessage = "请求超时";
axios.interceptors.request.use(req => {
  // console.log(req);
  if (req.url !== "manager/login") {
    req.headers.token = sessionStorage.getItem("token");
  }
  // console.log(req);
  return req;
});
axios.interceptors.response.use(
  req => {
    console.log(req.data);
    if (req.status === 200 && req.data !== "000600") {
      return req;
    } else {
      Message.error("登录过期，请重新登录");
      return router.push({ name: "login" });
    }
  },
  err => {
    Message.error(err.message);
    return Promise.reject(err);
  }
);
export default axios;
