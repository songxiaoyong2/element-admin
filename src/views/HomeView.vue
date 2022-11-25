<template>
  <div id="mon">
    <div
      style="
        width: 200px;
        height: 100%;
        position: fixed;
        overflow: hidden;
        transition: all 0.3s;
      "
      :class="{ 'el-side-small': isCollapse }"
    >
      <canvas
        id="rainbow"
        style="background-color: #ffffffe0; width: 1919px; height: 100%"
      >
      </canvas>
    </div>
    <el-container style="height: 100%">
      <el-aside
        width="200px"
        style="
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          transition: all 0.3s;
        "
        :class="{ 'el-side-small': isCollapse }"
      >
        <!-- 菜单文字 -->
        <div
          class="sidebar-logo-container"
          style="background-color: rgba(33, 105, 248, 0.7)"
        >
          <h1
            data-v-3e41814e=""
            class="sidebar-title"
            style="color: rgb(255, 255, 255)"
          >
            <i class="el-icon-s-tools" v-if="isCollapse"></i>
            <span
              v-else
              id="txt"
              style="width: 200px; height: 60px; display: inline-block"
              ref="txt"
            ></span>
          </h1>
        </div>

        <div
          class="scrollbar-wrapper el-scrollbar__wrap"
          style="margin-bottom: -17px; margin-right: -17px"
        >
          <el-menu
            :collapse="isCollapse"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="closeMenu"
            text-color="#333"
            active-text-color="#ffd04b"
            router
            :collapse-transition="false"
            style="background-color: unset"
          >
            <el-submenu
              v-for="(item, index) in menuList"
              :key="item.psId"
              :index="'' + item.psId"
            >
              <template slot="title">
                <i
                  :class="{
                    'el-icon-s-home': index === 0,
                    'el-icon-user-solid': index === 1,
                    'el-icon-s-goods': index === 2,
                    'el-icon-s-custom': index === 3,
                    'el-icon-s-order': index === 4,
                  }"
                ></i>
                <span>{{ item.psName }}</span>
              </template>
              <el-menu-item
                v-for="(list, ind) in item.children"
                :key="list.psId"
                :index="'/' + list.path"
              >
                <template slot="title">
                  <i
                    :class="{
                      'el-icon-s-claim': index === 0,
                      'el-icon-user': index === 1,
                      'el-icon-goods': index === 2 && ind === 0,
                      'el-icon-info': index === 2 && ind === 1,
                      'el-icon-shopping-bag-1': index === 2 && ind === 2,
                      'el-icon-notebook-2': index === 3 && ind === 0,
                      'el-icon-coordinate': index === 3 && ind === 1,
                      'el-icon-tickets': index === 4,
                    }"
                  ></i>
                  <span>{{ list.psName }}</span>
                </template></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header
          style="
            font-size: 12px;
            transition: all 0.3s;
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
          :class="{ 'section-big': isCollapse, 'header-small': !isCollapse }"
        >
          <div style="display: flex; align-items: center">
            <!-- 展开收起按钮 -->
            <el-button
              @click="isColl"
              :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              size="mini"
            ></el-button>
            <!-- 面包屑 -->
            <!-- <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            </el-breadcrumb> -->
          </div>
          <!-- 用户状态 -->
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-thumb" command="a">
                查看数据可视化</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-circle-close" command="b"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <vue-page-transition name="fade-in-up">
          <router-view
            :class="{ 'section-big': isCollapse, 'header-small': !isCollapse }"
            style="transition: all 0.3s"
          />
        </vue-page-transition>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { menuApi } from "@/api";
import $ from "jquery";
import jQuery from "jquery";
export default {
  data() {
    return {
      loading: false,
      // isCollapse: false,
      // 菜单列表
      menuList: [],
    };
  },
  methods: {
    closeMenu() {},

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    // 共享是否侧边展开状态
    isColl() {
      this.isCollapse = !this.isCollapse;
      this.$store.commit("isCollapseChange", this.isCollapse);
    },
    // 获取背景canvas
    getCanvas() {
      const DPR = window.devicePixelRatio;
      const colors = [
        ["#EC008C", "#f957b6"],
        ["#EF4136", "#ff7972"],
        ["yellow", "#fff"],
        ["lime", "#7aff7a"],
        ["#27AAE1", "#5ec8f2"],
        ["#662D91", "#a158d8"],
      ];
      const tau = Math.PI * 2;
      const start = Math.PI;
      const finish = 0.5;
      const inc = 0.007;
      const rainbowHeight = 0.5;
      const arcStagger = 0.05;
      const sparklesInPerStripe = 3;
      let sparkles = [];
      const clamp = (min, max, val) => {
        return Math.min(Math.max(min, val), max);
      };
      const boolRandom = () => {
        return Math.round(Math.random()) ? false : true;
      };
      const sizeCanvas = () => {
        radius = clamp(15, 50, window.innerWidth / 60 / DPR);
        const canvas = document.getElementById("rainbow");
        canvas.width = window.innerWidth * DPR;
        canvas.height = window.innerHeight * DPR;
      };
      const addRandom = function (lineWidth) {
        return (boolRandom() ? -1 : 1) * Math.random() * lineWidth;
      };
      const makeSparkle = ({
        cx,
        cy,
        radiusX,
        radiusY,
        endAngle,
        lineWidth,
        color,
      }) => {
        return {
          x: cx + radiusX * Math.cos(endAngle) + addRandom(lineWidth),
          y: cy + radiusY * Math.sin(endAngle) + addRandom(lineWidth),
          opacity: 1,
          color,
          rad: Math.max(radius * Math.random() * DPR, 15),
        };
      };

      function animate(percent = 0) {
        const doneAnimatingIn = percent >= finish + arcStagger * colors.length;
        let width = window.innerWidth * DPR;
        let height = window.innerHeight * DPR;
        const lineWidth = (height * 0.5) / colors.length;
        const cx = width / 2;
        const startCy =
          height +
          lineWidth * rainbowHeight +
          (height - colors.length * lineWidth) / 3;
        const startRadiusX = width / 2 + colors.length * lineWidth * 2;
        const startRadiusY = height;
        let ctx = document.getElementById("rainbow").getContext("2d");
        ctx.clearRect(0, 0, width, height);
        ctx.globalAlpha = 1;
        ctx.lineWidth = lineWidth;
        for (let i = colors.length - 1; i > -1; i--) {
          const [colorLine, colorSparkle] = colors[i];
          const cy = startCy + i * (lineWidth / 2 - 1);
          const radiusX = startRadiusX - (i * lineWidth) / 2;
          const radiusY = startRadiusY - (i * lineWidth) / 2;
          const endAngle = tau * (percent - i * arcStagger) + start;
          const angle = clamp(start, tau * finish + start, endAngle);
          ctx.beginPath();
          ctx.shadowColor = colorLine;
          ctx.strokeStyle = colorLine;
          ctx.ellipse(cx, cy, radiusX, radiusY, 0, start, angle, false);
          ctx.lineCap = "round";
          ctx.stroke();
          ctx.closePath();
          if (!doneAnimatingIn) {
            for (let j = 0; j < sparklesInPerStripe; j++) {
              sparkles.push(
                makeSparkle({
                  cx,
                  cy,
                  radiusX,
                  radiusY,
                  endAngle: angle,
                  lineWidth,
                  color: colorLine,
                })
              );
            }
          } else {
            sparkles.push(
              makeSparkle({
                cx,
                cy,
                radiusX,
                radiusY,
                endAngle: Math.random() * Math.PI + Math.PI,
                lineWidth,
                color: boolRandom() ? "#fff" : colorSparkle,
              })
            );
          }
        }
        const nextSparkles = [];
        for (let i = 0, len = sparkles.length; i < len; i++) {
          const { x, y, opacity, color, rad } = sparkles[i];
          ctx.beginPath();
          ctx.globalAlpha = opacity;
          ctx.fillStyle = color;
          ctx.arc(x - rad, y - rad, rad, 0, Math.PI / 2);
          ctx.arc(x - rad, y + rad, rad, (3 * Math.PI) / 2, 2 * Math.PI);
          ctx.arc(x + rad, y + rad, rad, Math.PI, (3 * Math.PI) / 2);
          ctx.arc(x + rad, y - rad, rad, Math.PI / 2, Math.PI);
          ctx.fill();
          if (opacity > 0.2 && rad > 0.2) {
            nextSparkles.push({
              x,
              y,
              opacity: opacity - 0.03,
              rad: rad - 0.2,
              color,
            });
          }
        }
        sparkles = nextSparkles;
        if (!doneAnimatingIn) {
          requestAnimationFrame(function () {
            animate(percent + inc);
          });
        } else {
          requestAnimationFrame(function () {
            animate(finish + colors.length * arcStagger);
          });
        }
      }
      sizeCanvas();
      requestAnimationFrame(function () {
        animate();
      });
      window.addEventListener("resize", sizeCanvas);
    },
    // 文字描帧动画
    txtAni() {
      var chartDom = document.getElementById("txt");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        graphic: {
          elements: [
            {
              type: "text",
              left: "center",
              top: "center",
              style: {
                text: "六彩星管理系统",
                fontSize: 20,
                fontWeight: "bold",
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: "transparent",
                stroke: "#fff ",
                lineWidth: 0.1,
              },
              keyframeAnimation: {
                duration: 2000,
                loop: false,
                keyframes: [
                  {
                    percent: 0.7,
                    style: {
                      fill: "transparent",
                      lineDashOffset: 200,
                      lineDash: [100, 0],
                    },
                  },
                  {
                    // Stop for a while.
                    percent: 0.8,
                    style: {
                      fill: "transparent",
                    },
                  },
                  {
                    percent: 1,
                    style: {
                      fill: "#fff",
                    },
                  },
                ],
              },
            },
          ],
        },
      };

      myChart.setOption(option);
    },
    // 点击跳转
    handleCommand(command) {
      if (command === "a") {
        this.$router.push({ name: "bigData" });
      } else if (command === "b") {
        this.$store.state.token = "";
        sessionStorage.setItem("token", "");
        this.$router.push({ name: "login" });
      }
    },
    // 鼠标点击
    mon() {
      var a_idx = 0;
      jQuery(document).ready(function ($) {
        $("#mon").click(function (e) {
          var a = new Array(
            "富强",
            "民主",
            "文明",
            "和谐",
            "自由",
            "平等",
            "公正",
            "法治",
            "爱国",
            "敬业",
            "诚信",
            "友善"
          );
          var $i = $("<span/>").text(a[a_idx]);
          a_idx = (a_idx + 1) % a.length;
          var x = e.pageX,
            y = e.pageY;
          $i.css({
            "z-index": 999,
            top: y - 20,
            left: x,
            position: "absolute",
            "font-weight": "bold",
            color: "#81c300",
          });
          $("body").append($i);
          $i.animate(
            {
              top: y - 180,
              opacity: 0,
            },
            1500,
            function () {
              $i.remove();
            }
          );
        });
      });
    },
  },
  async mounted() {
    const { data } = await menuApi({});
    if (data) {
      this.menuList = data.data;
    } else {
      return;
    }

    this.getCanvas();
    this.txtAni();
    this.mon();
  },
  computed: {
    isCollapse: {
      set(val) {
        this.$store.commit("isCollapseChange", val);
      },
      get() {
        return this.$store.state.isCollapse;
      },
    },
  },
  watch: {
    isCollapse: {
      handler(val) {
        if (!val) {
          this.$nextTick(() => {
            this.txtAni();
          });
        }
      },
    },
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
  height: 60px;
  line-height: 60px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
}
.el-scrollbar__wrap {
  overflow: scroll;
  height: 92%;
  overflow-x: hidden;
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
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 0;
  top: 45px !important;
}
.el-submenu__title {
  background-color: unset !important;
  color: rgb(2, 65, 255) !important;
}
.el-header {
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
  overflow: hidden !important;
}

.el-side-small {
  width: 64px !important;
}
.section-big {
  margin-left: 64px !important;
}
.header-small {
  margin-left: 200px !important;
}

/deep/.el-menu {
  background-color: unset;
}
.el-submenu__title i {
  color: #2169f8;
}
.el-menu-item {
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  list-style: none;
  cursor: pointer;
  position: relative;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  white-space: nowrap;
}
.is-active .el-submenu /deep/span {
  color: rgb(255, 208, 75);
}
.el-menu-item:focus {
  outline: 0;
  background-color: unset;
}
</style>
