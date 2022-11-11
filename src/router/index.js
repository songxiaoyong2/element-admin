import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "about",
    component: HomeView,
    children: [
      {
        path: "/user/queryList",
        name: "userList",

        component: () => import("@/components/user/userList.vue"),
      },
      {
        path: "/welcome",
        name: "userList",

        component: () => import("@/components/user/userList.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  if (to.fullPath === "/") {
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
