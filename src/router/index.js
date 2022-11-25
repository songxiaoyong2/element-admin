import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "about",
    redirect: "/welcome",
    component: HomeView,
    children: [
      {
        path: "/user/queryList",
        name: "userList",
        component: () => import("@/components/user/userList.vue"),
      },
      {
        path: "/welcome",
        name: "welcome",
        component: () => import("@/views/home/dataReport.vue"),
      },
      {
        path: "/goods/queryList",
        name: "queryList",
        component: () => import("@/views/goods/goods.vue"),
      },
      {
        path: "/attr/queryCategoryList",
        name: "queryCategoryList",
        component: () => import("@/views/goods/queryCategoryList.vue"),
      },
      {
        path: "/category/queryList",
        name: "cateQueryList",
        component: () => import("@/views/goods/cateQueryList.vue"),
      },
      {
        path: "/role/queryList",
        name: "roleQueryList",
        component: () => import("@/views/role/roleList.vue"),
      },
      {
        path: "/menu/permission",
        name: "permission",
        component: () => import("@/views/role/permission.vue"),
      },
      {
        path: "/order/queryList",
        name: "orderQueryList",
        component: () => import("@/views/order/orderQueryList.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/bigData",
    name: "bigData",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/bigData.vue"),
  },
  {
    path: "/",
    component: () => import(/* webpackChunkName: "about" */ "../views/wel.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  if (to.fullPath === "/login" || to.fullPath === "/") {
    next();
  } else {
    if (token) {
      next();
    } else {
      alert("请登录");
      next("/");
    }
  }
});
export default router;
