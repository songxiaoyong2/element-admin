import { attrList, getGoods, queryCategoryList, queryList } from "./goods";
import { login, menu } from "./login";
import { addUser, editUser, userList } from "./user";
import { getPermission, getRole } from "./role";
import { getOrderList } from "./order";
// 登录
export const loginApi = login;
// 获取菜单
export const menuApi = menu;
// 获取用户
export const userListApi = userList;
// 修改信息
export const editUserApi = editUser;
// 添加用户
export const addUserApi = addUser;
// 获取商品
export const getGoodsApi = getGoods;
// 获取商品分类列表
export const queryListApi = queryList;
// 获取下拉框数据
export const queryCategoryListApi = queryCategoryList;
// 获取列表
export const attrListApi = attrList;
// 获取角色
export const getRoleApi = getRole;
// 权限列表
export const getPermissionApi = getPermission;
// 获取订单
export const getOrderListApi = getOrderList;
