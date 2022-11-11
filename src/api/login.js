import request from "@/utils/request";
// 登录
export const login = data => {
  return request({
    url: "manager/login",
    method: "POST",
    data,
  });
};
// 菜单
export const menu = data => {
  return request({
    url: "menu/queryList",
    method: "POST",
    data,
  });
};
