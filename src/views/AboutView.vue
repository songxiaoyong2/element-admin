<template>
  <div class="login-container">
    <canvas
      id="rainbow"
      style="
        background-color: #ffffffe0;
        z-index: -1;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      "
    >
    </canvas>
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        :plain="true"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >Login</el-button
      >

      <div class="tips">
        <span style="margin-right: 20px; color: #000">username: admin</span>
        <span style="color: #000"> password: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from "@/utils/validate";
import { loginApi } from "@/api";

export default {
  name: "Login",
  data() {
    return {
      // username: "",
      // password: "",
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loading: false,
      passwordType: "password",
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      const { data } = await loginApi(this.loginForm).catch(err => {
        return this.$message({
          showClose: true,
          message: err.message,
          type: "error",
          onClose: () => {
            this.loading = false;
          },
        });
      });
      if (data && data.status === 200) {
        this.$message({
          showClose: true,
          message: "登录成功",
          type: "success",
          onClose: () => {
            this.$store.commit("setToken", data.data.token);
            this.loading = false;
            this.$router.push({
              name: "bigData",
            });
          },
        });
      } else {
        return;
      }

      //   this.$refs.loginForm.validate(valid => {
      //     if (valid) {
      //       this.loading = true;
      //       this.$store
      //         .dispatch("user/login", this.loginForm)
      //         .then(() => {
      //           this.$router.push({ path: this.redirect || "/" });
      //           this.loading = false;
      //         })
      //         .catch(() => {
      //           this.loading = false;
      //         });
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
    },
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
  },
  mounted() {
    this.getCanvas();
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-color: unset !important;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 81, 255, 0.997);
    border-radius: 5px;
    color: #7a0000;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
