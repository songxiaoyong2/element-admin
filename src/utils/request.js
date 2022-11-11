import axios from "axios";
import { Message } from "element-ui";
axios.defaults.baseURL = "http://47.98.35.16:8888";
axios.interceptors.request.use(req => {
  // console.log(req);
  if (req.url !== "manager/login") {
    req.headers.token = sessionStorage.getItem("token");
  }
  console.log(req);
  return req;
});
axios.interceptors.response.use(
  req => {
    // console.log(req);
    if (req.status === 200) {
      return req;
    }
  },
  err => {
    Message.error(err.message);
    return Promise.reject(err);
  }
);
export default axios;
