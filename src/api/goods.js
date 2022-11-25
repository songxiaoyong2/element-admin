import request from "@/utils/request";
// 获取商品
export const getGoods = data => {
  return request({
    url: "goods/queryList",
    method: "POST",
    data,
  });
};
// 获取商品分类列表
export const queryList = data => {
  return request({
    url: "category/queryList",
    method: "POST",
    data,
  });
};
// 获取下拉框数据
export const queryCategoryList = data => {
  return request({
    url: "attr/queryCategoryList",
    method: "POST",
    data,
  });
};
// 获取列表
export const attrList = data => {
  return request({
    url: `attr/queryList/${data}`,
    method: "get",
  });
};
