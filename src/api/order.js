import request from "@/utils/request";
export const getOrderList = data => {
  return request({
    url: "order/queryList",
    method: "POST",
    data,
  });
};
