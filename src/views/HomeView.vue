<template>
  <div>
    <el-container style="height: 100%">
      <el-aside
        width="200px"
        style="
          height: 100%;
          background-color: rgb(48, 65, 86);
          position: fixed;
          top: 0;
          left: 0;
        "
      >
        <!-- 菜单文字 -->
        <div
          class="sidebar-logo-container"
          style="background-color: rgb(48, 65, 86)"
        >
          <h1
            data-v-3e41814e=""
            class="sidebar-title"
            style="color: rgb(255, 255, 255)"
          >
            管理系统
          </h1>
        </div>

        <div
          class="scrollbar-wrapper el-scrollbar__wrap"
          style="margin-bottom: -17px; margin-right: -17px"
        >
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="closeMenu"
            background-color="rgb(48,65,86)"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu
              v-for="item in menuList"
              :key="item.psId"
              :index="'' + item.psId"
            >
              <template slot="title">
                <span>{{ item.psName }}</span>
              </template>
              <el-menu-item
                v-for="list in item.children"
                :key="list.psId"
                :index="'/' + list.path"
              >
                <template slot="title">
                  <span>{{ list.psName }}</span>
                </template></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"
            ><span>王小虎</span></i
          >
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <router-view />
    </el-container>
  </div>
</template>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  overflow: hidden !important;
}
[role="menuitem"] {
  background-color: rgb(31, 45, 61) !important;
}
</style>

<script>
import { menuApi } from "@/api";
export default {
  data() {
    return {
      loading: false,

      // 菜单列表
      menuList: [],
    };
  },
  methods: {
    closeMenu() {},

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  async mounted() {
    const { data } = await menuApi({});
    // console.log(data);
    this.menuList = data.data;
    // console.log(this.menuList);
  },
};
</script>
<style scoped>
.el-aside ul,
section {
  border: none;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
}
.el-scrollbar__wrap {
  overflow: scroll;
  height: 100%;
}
.el-scrollbar__bar.is-vertical {
  width: 6px;
  top: 2px;
}
.el-scrollbar__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  opacity: 0;
  -webkit-transition: opacity 0.12s ease-out;
  transition: opacity 0.12s ease-out;
}
</style>
