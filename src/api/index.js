import { login, menu } from "./login";
import { editUser, userList } from "./user";
// 登录
export const loginApi = login;
// 获取菜单
export const menuApi = menu;
// 获取用户
export const userListApi = userList;
// 修改信息
export const editUserApi = editUser;
