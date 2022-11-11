import request from "@/utils/request";
// 获取用户
export const userList = data => {
  return request({
    method: "POST",
    url: "user/queryList",
    data,
  });
};
// 修改信息
export const editUser = data => {
  return request({
    method: "PUT",
    url: "user/updateSingle",
    data,
  });
};
