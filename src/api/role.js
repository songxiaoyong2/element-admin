import request from "@/utils/request";
// 获取角色
export const getRole = data => {
  return request({
    url: "role/queryList",
    method: "post",
    data,
  });
};
// 权限列表
export const getPermission = data => {
  return request({
    url: "menu/permission",
    method: "post",
    data,
  });
};
