<template>
  <div>
    <canvas id="canvas" style="width: 100%; height: 100%; position: fixed">
    </canvas>
    <dv-full-screen-container>
      <!-- 头部 -->
      <div class="title">
        <span class="btn btn1"
          ><Button type="info" ghost @click="flag = !flag"
            >切换视图</Button
          ></span
        >
        <dv-decoration-1
          style="
            width: 200px;
            height: 50px;
            position: absolute;
            top: 10px;
            left: 32%;
          "
        />
        <span class="h1">数据可视化</span>
        <dv-decoration-1
          style="
            width: 200px;
            height: 50px;
            transform: rotateY(180deg);
            position: absolute;
            top: 10px;
            left: 54%;
          "
        />
        <span class="btn btn2">
          <Button type="info" ghost @click="$router.push({ name: 'about' })"
            >进入系统</Button
          ></span
        >
        <dv-decoration-5 style="width: 100%; height: 100%"> </dv-decoration-5>
      </div>
      <div class="main" v-show="flag">
        -->
        <!-- 左侧部分  -->
        <div class="left">
          <dv-border-box-12>
            <div style="padding: 20px 20px">
              <div class="top">
                <div class="c1">
                  <dv-border-box-8>
                    <h1>用户总人数:</h1>
                    <dv-digital-flop :config="config[0]" />
                  </dv-border-box-8>
                </div>
                <div class="c2">
                  <dv-border-box-8>
                    <h1>商品总数:</h1>
                    <dv-digital-flop :config="config[1]" />
                  </dv-border-box-8>
                </div>
              </div>
              <dv-decoration-10
                style="width: 100%; height: 5px; margin-top: 30px"
              />
            </div>
            <div class="bot"></div>
          </dv-border-box-12>
        </div>
        <!-- 中间部分 -->
        <div class="mid">
          <dv-border-box-12>
            <div class="mc1"></div>
            <dv-decoration-10
              style="width: 100%; height: 5px; padding: 0 20px"
            />
            <div class="mc2"></div>
          </dv-border-box-12>
        </div>
        <!-- 右侧部分 -->
        <div class="right">
          <dv-border-box-12>
            <div class="rc1">
              <dv-scroll-board :config="con" />
            </div>

            <dv-decoration-10
              style="width: 100%; height: 5px; padding: 0 20px"
            />
            <div class="rc2"></div>
          </dv-border-box-12>
        </div>
      </div>

      <div class="main" v-show="!flag">
        <dv-border-box-12 style="padding: 10px">
          <div id="map"></div>
        </dv-border-box-12>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import $ from "jquery";
import { userListApi, getGoodsApi, getOrderListApi } from "@/api";
import { Scene, LineLayer, PointLayer } from "@antv/l7";
import { GaodeMap } from "@antv/l7-maps";
export default {
  data() {
    return {
      count: [
        { count1: 0, title: "用户总人数" }, //用户总数
        { count2: 0, title: "商品总数" }, //商品总数
        { count3: 0, title: "订单总数" }, //订单总数
      ],
      timer: null,
      timer1: null,
      timer2: null,
      config: [],
      con: {},
      flag: true,
      scene: null,
    };
  },
  methods: {
    bg() {
      var canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      let w = (canvas.width = window.innerWidth);
      let h = (canvas.height = window.innerHeight);
      let hue = 217;
      let stars = [];
      let count = 0;
      let maxStars = 1200;

      var canvas2 = document.createElement("canvas"),
        ctx2 = canvas2.getContext("2d");
      canvas2.width = 100;
      canvas2.height = 100;
      var half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
      gradient2.addColorStop(0.025, "#fff");
      gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
      gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
      gradient2.addColorStop(1, "transparent");

      ctx2.fillStyle = gradient2;
      ctx2.beginPath();
      ctx2.arc(half, half, half, 0, Math.PI * 2);
      ctx2.fill();

      // End cache
      $(window).resize(function () {
        w = canvas.width = $("#dv-full-screen-container").width();
        h = canvas.height = $("#dv-full-screen-container").height();
        $(canvas).width(w).height(h);
      });

      function random(min, max) {
        if (arguments.length < 2) {
          max = min;
          min = 0;
        }

        if (min > max) {
          var hold = max;
          max = min;
          min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function maxOrbit(x, y) {
        var max = Math.max(x, y),
          diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
      }

      var Star = function () {
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 12;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 900000;
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
      };

      Star.prototype.draw = function () {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
          y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
          twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(
          canvas2,
          x - this.radius / 2,
          y - this.radius / 2,
          this.radius,
          this.radius
        );
        this.timePassed += this.speed;
      };

      for (var i = 0; i < maxStars; i++) {
        new Star();
      }

      function animation() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 1)";
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = "lighter";
        for (var i = 1, l = stars.length; i < l; i++) {
          stars[i].draw();
        }

        window.requestAnimationFrame(animation);
      }

      animation();
    },
    async getCount() {
      let a = {
        header: ["订单号", "价格", "状态"],
        data: [
          ["行1列1", "行1列2", "y"],
          ["行2列1", "行2列2", "行2列3"],
          ["行3列1", "行3列2", "行3列3"],
          ["行4列1", "行4列2", "行4列3"],
          ["行5列1", "行5列2", "行5列3"],
          ["行6列1", "行6列2", "行6列3"],
          ["行7列1", "行7列2", "行7列3"],
          ["行8列1", "行8列2", "行8列3"],
          ["行9列1", "行9列2", "行9列3"],
          ["行10列1", "行10列2", "行10列3"],
        ],
        oddRowBGC: "rgba(0,0,0,0)",
        evenRowBGC: "rgba(0,0,0,0)",
        waitTime: 1000,
      };
      const { data } = await userListApi({ pageNum: 1, pageSize: 10 });
      const data1 = await getGoodsApi({ pageNum: 1, pageSize: 10 });
      const data2 = await getOrderListApi({ pageNum: 1, pageSize: 10 });
      this.count[0].count1 = data.count;
      this.count[1].count2 = data1.data.count;
      this.count[2].count3 = data2.data.count;
      data2.data.data.forEach((item, i) => {
        a.data[i][0] = item.orderNumber;
        a.data[i][1] = "" + item.orderPrice;
        a.data[i][2] = item.isSend;
      });
      this.con = a;
    },
    showNum() {
      const config1 = {
        number: [this.count[0].count1],
        content: "{nt}个",
      };
      const config2 = {
        number: [this.count[1].count2],
        content: "{nt}个",
      };
      const config3 = {
        number: [this.count[2].count3],
        content: "{nt}个",
      };
      this.config = [config1, config2, config3];
    },
    // 左侧图
    ec1() {
      var chartDom = document.querySelector(".bot");
      var myChart = this.$echarts.init(chartDom);
      var option;
      const pathSymbols = {
        reindeer:
          "path://M-22.788,24.521c2.08-0.986,3.611-3.905,4.984-5.892 c-2.686,2.782-5.047,5.884-9.102,7.312c-0.992,0.005-0.25-2.016,0.34-2.362l1.852-0.41c0.564-0.218,0.785-0.842,0.902-1.347 c2.133-0.727,4.91-4.129,6.031-6.194c1.748-0.7,4.443-0.679,5.734-2.293c1.176-1.468,0.393-3.992,1.215-6.557 c0.24-0.754,0.574-1.581,1.008-2.293c-0.611,0.011-1.348-0.061-1.959-0.608c-1.391-1.245-0.785-2.086-1.297-3.313 c1.684,0.744,2.5,2.584,4.426,2.586C-8.46,3.012-8.255,2.901-8.04,2.824c6.031-1.952,15.182-0.165,19.498-3.937 c1.15-3.933-1.24-9.846-1.229-9.938c0.008-0.062-1.314-0.004-1.803-0.258c-1.119-0.771-6.531-3.75-0.17-3.33 c0.314-0.045,0.943,0.259,1.439,0.435c-0.289-1.694-0.92-0.144-3.311-1.946c0,0-1.1-0.855-1.764-1.98 c-0.836-1.09-2.01-2.825-2.992-4.031c-1.523-2.476,1.367,0.709,1.816,1.108c1.768,1.704,1.844,3.281,3.232,3.983 c0.195,0.203,1.453,0.164,0.926-0.468c-0.525-0.632-1.367-1.278-1.775-2.341c-0.293-0.703-1.311-2.326-1.566-2.711 c-0.256-0.384-0.959-1.718-1.67-2.351c-1.047-1.187-0.268-0.902,0.521-0.07c0.789,0.834,1.537,1.821,1.672,2.023 c0.135,0.203,1.584,2.521,1.725,2.387c0.102-0.259-0.035-0.428-0.158-0.852c-0.125-0.423-0.912-2.032-0.961-2.083 c-0.357-0.852-0.566-1.908-0.598-3.333c0.4-2.375,0.648-2.486,0.549-0.705c0.014,1.143,0.031,2.215,0.602,3.247 c0.807,1.496,1.764,4.064,1.836,4.474c0.561,3.176,2.904,1.749,2.281-0.126c-0.068-0.446-0.109-2.014-0.287-2.862 c-0.18-0.849-0.219-1.688-0.113-3.056c0.066-1.389,0.232-2.055,0.277-2.299c0.285-1.023,0.4-1.088,0.408,0.135 c-0.059,0.399-0.131,1.687-0.125,2.655c0.064,0.642-0.043,1.768,0.172,2.486c0.654,1.928-0.027,3.496,1,3.514 c1.805-0.424,2.428-1.218,2.428-2.346c-0.086-0.704-0.121-0.843-0.031-1.193c0.221-0.568,0.359-0.67,0.312-0.076 c-0.055,0.287,0.031,0.533,0.082,0.794c0.264,1.197,0.912,0.114,1.283-0.782c0.15-0.238,0.539-2.154,0.545-2.522 c-0.023-0.617,0.285-0.645,0.309,0.01c0.064,0.422-0.248,2.646-0.205,2.334c-0.338,1.24-1.105,3.402-3.379,4.712 c-0.389,0.12-1.186,1.286-3.328,2.178c0,0,1.729,0.321,3.156,0.246c1.102-0.19,3.707-0.027,4.654,0.269 c1.752,0.494,1.531-0.053,4.084,0.164c2.26-0.4,2.154,2.391-1.496,3.68c-2.549,1.405-3.107,1.475-2.293,2.984 c3.484,7.906,2.865,13.183,2.193,16.466c2.41,0.271,5.732-0.62,7.301,0.725c0.506,0.333,0.648,1.866-0.457,2.86 c-4.105,2.745-9.283,7.022-13.904,7.662c-0.977-0.194,0.156-2.025,0.803-2.247l1.898-0.03c0.596-0.101,0.936-0.669,1.152-1.139 c3.16-0.404,5.045-3.775,8.246-4.818c-4.035-0.718-9.588,3.981-12.162,1.051c-5.043,1.423-11.449,1.84-15.895,1.111 c-3.105,2.687-7.934,4.021-12.115,5.866c-3.271,3.511-5.188,8.086-9.967,10.414c-0.986,0.119-0.48-1.974,0.066-2.385l1.795-0.618 C-22.995,25.682-22.849,25.035-22.788,24.521z",
        plane:
          "path://M1.112,32.559l2.998,1.205l-2.882,2.268l-2.215-0.012L1.112,32.559z M37.803,23.96 c0.158-0.838,0.5-1.509,0.961-1.904c-0.096-0.037-0.205-0.071-0.344-0.071c-0.777-0.005-2.068-0.009-3.047-0.009 c-0.633,0-1.217,0.066-1.754,0.18l2.199,1.804H37.803z M39.738,23.036c-0.111,0-0.377,0.325-0.537,0.924h1.076 C40.115,23.361,39.854,23.036,39.738,23.036z M39.934,39.867c-0.166,0-0.674,0.705-0.674,1.986s0.506,1.986,0.674,1.986 s0.672-0.705,0.672-1.986S40.102,39.867,39.934,39.867z M38.963,38.889c-0.098-0.038-0.209-0.07-0.348-0.073 c-0.082,0-0.174,0-0.268-0.001l-7.127,4.671c0.879,0.821,2.42,1.417,4.348,1.417c0.979,0,2.27-0.006,3.047-0.01 c0.139,0,0.25-0.034,0.348-0.072c-0.646-0.555-1.07-1.643-1.07-2.967C37.891,40.529,38.316,39.441,38.963,38.889z M32.713,23.96 l-12.37-10.116l-4.693-0.004c0,0,4,8.222,4.827,10.121H32.713z M59.311,32.374c-0.248,2.104-5.305,3.172-8.018,3.172H39.629 l-25.325,16.61L9.607,52.16c0,0,6.687-8.479,7.95-10.207c1.17-1.6,3.019-3.699,3.027-6.407h-2.138 c-5.839,0-13.816-3.789-18.472-5.583c-2.818-1.085-2.396-4.04-0.031-4.04h0.039l-3.299-11.371h3.617c0,0,4.352,5.696,5.846,7.5 c2,2.416,4.503,3.678,8.228,3.87h30.727c2.17,0,4.311,0.417,6.252,1.046c3.49,1.175,5.863,2.7,7.199,4.027 C59.145,31.584,59.352,32.025,59.311,32.374z M22.069,30.408c0-0.815-0.661-1.475-1.469-1.475c-0.812,0-1.471,0.66-1.471,1.475 s0.658,1.475,1.471,1.475C21.408,31.883,22.069,31.224,22.069,30.408z M27.06,30.408c0-0.815-0.656-1.478-1.466-1.478 c-0.812,0-1.471,0.662-1.471,1.478s0.658,1.477,1.471,1.477C26.404,31.885,27.06,31.224,27.06,30.408z M32.055,30.408 c0-0.815-0.66-1.475-1.469-1.475c-0.808,0-1.466,0.66-1.466,1.475s0.658,1.475,1.466,1.475 C31.398,31.883,32.055,31.224,32.055,30.408z M37.049,30.408c0-0.815-0.658-1.478-1.467-1.478c-0.812,0-1.469,0.662-1.469,1.478 s0.656,1.477,1.469,1.477C36.389,31.885,37.049,31.224,37.049,30.408z M42.039,30.408c0-0.815-0.656-1.478-1.465-1.478 c-0.811,0-1.469,0.662-1.469,1.478s0.658,1.477,1.469,1.477C41.383,31.885,42.039,31.224,42.039,30.408z M55.479,30.565 c-0.701-0.436-1.568-0.896-2.627-1.347c-0.613,0.289-1.551,0.476-2.73,0.476c-1.527,0-1.639,2.263,0.164,2.316 C52.389,32.074,54.627,31.373,55.479,30.565z",
        train:
          "path://M67.335,33.596L67.335,33.596c-0.002-1.39-1.153-3.183-3.328-4.218h-9.096v-2.07h5.371 c-4.939-2.07-11.199-4.141-14.89-4.141H19.72v12.421v5.176h38.373c4.033,0,8.457-1.035,9.142-5.176h-0.027 c0.076-0.367,0.129-0.751,0.129-1.165L67.335,33.596L67.335,33.596z M27.999,30.413h-3.105v-4.141h3.105V30.413z M35.245,30.413 h-3.104v-4.141h3.104V30.413z M42.491,30.413h-3.104v-4.141h3.104V30.413z M49.736,30.413h-3.104v-4.141h3.104V30.413z  M14.544,40.764c1.143,0,2.07-0.927,2.07-2.07V35.59V25.237c0-1.145-0.928-2.07-2.07-2.07H-9.265c-1.143,0-2.068,0.926-2.068,2.07 v10.351v3.105c0,1.144,0.926,2.07,2.068,2.07H14.544L14.544,40.764z M8.333,26.272h3.105v4.141H8.333V26.272z M1.087,26.272h3.105 v4.141H1.087V26.272z M-6.159,26.272h3.105v4.141h-3.105V26.272z M-9.265,41.798h69.352v1.035H-9.265V41.798z",
        ship: "path://M16.678,17.086h9.854l-2.703,5.912c5.596,2.428,11.155,5.575,16.711,8.607c3.387,1.847,6.967,3.75,10.541,5.375 v-6.16l-4.197-2.763v-5.318L33.064,12.197h-11.48L20.43,15.24h-4.533l-1.266,3.286l0.781,0.345L16.678,17.086z M49.6,31.84 l0.047,1.273L27.438,20.998l0.799-1.734L49.6,31.84z M33.031,15.1l12.889,8.82l0.027,0.769L32.551,16.1L33.031,15.1z M22.377,14.045 h9.846l-1.539,3.365l-2.287-1.498h1.371l0.721-1.352h-2.023l-0.553,1.037l-0.541-0.357h-0.34l0.359-0.684h-2.025l-0.361,0.684 h-3.473L22.377,14.045z M23.695,20.678l-0.004,0.004h0.004V20.678z M24.828,18.199h-2.031l-0.719,1.358h2.029L24.828,18.199z  M40.385,34.227c-12.85-7.009-25.729-14.667-38.971-12.527c1.26,8.809,9.08,16.201,8.213,24.328 c-0.553,4.062-3.111,0.828-3.303,7.137c15.799,0,32.379,0,48.166,0l0.066-4.195l1.477-7.23 C50.842,39.812,45.393,36.961,40.385,34.227z M13.99,35.954c-1.213,0-2.195-1.353-2.195-3.035c0-1.665,0.98-3.017,2.195-3.017 c1.219,0,2.195,1.352,2.195,3.017C16.186,34.604,15.213,35.954,13.99,35.954z M23.691,20.682h-2.02l-0.588,1.351h2.023 L23.691,20.682z M19.697,18.199l-0.721,1.358h2.025l0.727-1.358H19.697z",
        car: "path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-14.185-0.216 c-4.088,0-12.789,0.113-14.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,16.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z",
      };
      const labelSetting = {
        show: true,
        position: "right",
        offset: [10, 0],
        fontSize: 16,
      };
      function makeOption(type, symbol) {
        return {
          title: {
            text: "销量对比",
            left: "center",
            textStyle: {
              fontSize: 20,
              color: "#fff",
            },
          },
          legend: {
            data: ["2021", "2022"],
            top: 30,
            textStyle: {
              fontSize: 18,
              color: "#fff",
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            containLabel: true,
            left: 20,
          },
          yAxis: {
            data: ["手机", "上衣", "卫衣", "裤子", "电脑"],
            inverse: true,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              margin: 30,
              fontSize: 14,
              color: "#fff",
            },
            axisPointer: {
              label: {
                show: true,
                margin: 30,
              },
            },
          },
          xAxis: {
            splitLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
          },
          animationDurationUpdate: 500,
          series: [
            {
              name: "2021",
              id: "bar1",
              type: type,
              label: labelSetting,
              symbolRepeat: true,
              symbolSize: ["80%", "60%"],
              barCategoryGap: "40%",
              universalTransition: {
                enabled: true,
                delay: function (idx, total) {
                  return (idx / total) * 1000;
                },
              },
              data: [
                {
                  value: 157,
                  symbol: symbol || pathSymbols.reindeer,
                },
                {
                  value: 21,
                  symbol: symbol || pathSymbols.ship,
                },
                {
                  value: 66,
                  symbol: symbol || pathSymbols.plane,
                },
                {
                  value: 78,
                  symbol: symbol || pathSymbols.train,
                },
                {
                  value: 123,
                  symbol: symbol || pathSymbols.car,
                },
              ],
            },
            {
              name: "2022",
              id: "bar2",
              type: type,
              barGap: "10%",
              label: labelSetting,
              symbolRepeat: true,
              symbolSize: ["80%", "60%"],
              universalTransition: {
                enabled: true,
                delay: function (idx, total) {
                  return (idx / total) * 1000;
                },
              },
              data: [
                {
                  value: 184,
                  symbol: symbol || pathSymbols.reindeer,
                },
                {
                  value: 29,
                  symbol: symbol || pathSymbols.ship,
                },
                {
                  value: 73,
                  symbol: symbol || pathSymbols.plane,
                },
                {
                  value: 91,
                  symbol: symbol || pathSymbols.train,
                },
                {
                  value: 95,
                  symbol: symbol || pathSymbols.car,
                },
              ],
            },
          ],
        };
      }
      const options = [
        makeOption("pictorialBar"),
        makeOption("bar"),
        makeOption("pictorialBar", "diamond"),
      ];
      var optionIndex = 0;
      option = options[optionIndex];
      this.timer1 = setInterval(function () {
        optionIndex = (optionIndex + 1) % options.length;
        myChart.setOption(options[optionIndex]);
      }, 2500);

      option && myChart.setOption(option);
    },
    // 中间图
    mc1() {
      var chartDom = document.querySelector(".mc1");
      var myChart = this.$echarts.init(chartDom);
      var option;

      // prettier-ignore
      const femaleData = [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
    [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
    [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
    [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
    [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
    [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
    [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
    [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
    [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
    [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
    [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
    [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
    [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
    [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
    [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
    [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
    [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
    [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
    [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
    [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
    [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
    [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
    [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
    [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
    [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
    [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
    [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
    [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
    [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
    [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
    [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
    [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
    [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
    [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
    [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
    [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
    [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
    [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
    [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
    [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
    [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
    [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
    [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
    [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
    [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
    [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
    [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
    [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
    [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
    [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
    [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
    [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
];
      // prettier-ignore
      const maleDeta = [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
    [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
    [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
    [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
    [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
    [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
    [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
    [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],
    [186.7, 87.8], [171.4, 84.7], [172.7, 73.4], [175.3, 72.1], [180.3, 82.6],
    [182.9, 88.7], [188.0, 84.1], [177.2, 94.1], [172.1, 74.9], [167.0, 59.1],
    [169.5, 75.6], [174.0, 86.2], [172.7, 75.3], [182.2, 87.1], [164.1, 55.2],
    [163.0, 57.0], [171.5, 61.4], [184.2, 76.8], [174.0, 86.8], [174.0, 72.2],
    [177.0, 71.6], [186.0, 84.8], [167.0, 68.2], [171.8, 66.1], [182.0, 72.0],
    [167.0, 64.6], [177.8, 74.8], [164.5, 70.0], [192.0, 101.6], [175.5, 63.2],
    [171.2, 79.1], [181.6, 78.9], [167.4, 67.7], [181.1, 66.0], [177.0, 68.2],
    [174.5, 63.9], [177.5, 72.0], [170.5, 56.8], [182.4, 74.5], [197.1, 90.9],
    [180.1, 93.0], [175.5, 80.9], [180.6, 72.7], [184.4, 68.0], [175.5, 70.9],
    [180.6, 72.5], [177.0, 72.5], [177.1, 83.4], [181.6, 75.5], [176.5, 73.0],
    [175.0, 70.2], [174.0, 73.4], [165.1, 70.5], [177.0, 68.9], [192.0, 102.3],
    [176.5, 68.4], [169.4, 65.9], [182.1, 75.7], [179.8, 84.5], [175.3, 87.7],
    [184.9, 86.4], [177.3, 73.2], [167.4, 53.9], [178.1, 72.0], [168.9, 55.5],
    [157.2, 58.4], [180.3, 83.2], [170.2, 72.7], [177.8, 64.1], [172.7, 72.3],
    [165.1, 65.0], [186.7, 86.4], [165.1, 65.0], [174.0, 88.6], [175.3, 84.1],
    [185.4, 66.8], [177.8, 75.5], [180.3, 93.2], [180.3, 82.7], [177.8, 58.0],
    [177.8, 79.5], [177.8, 78.6], [177.8, 71.8], [177.8, 116.4], [163.8, 72.2],
    [188.0, 83.6], [198.1, 85.5], [175.3, 90.9], [166.4, 85.9], [190.5, 89.1],
    [166.4, 75.0], [177.8, 77.7], [179.7, 86.4], [172.7, 90.9], [190.5, 73.6],
    [185.4, 76.4], [168.9, 69.1], [167.6, 84.5], [175.3, 64.5], [170.2, 69.1],
    [190.5, 108.6], [177.8, 86.4], [190.5, 80.9], [177.8, 87.7], [184.2, 94.5],
    [176.5, 80.2], [177.8, 72.0], [180.3, 71.4], [171.4, 72.7], [172.7, 84.1],
    [172.7, 76.8], [177.8, 63.6], [177.8, 80.9], [182.9, 80.9], [170.2, 85.5],
    [167.6, 68.6], [175.3, 67.7], [165.1, 66.4], [185.4, 102.3], [181.6, 70.5],
    [172.7, 95.9], [190.5, 84.1], [179.1, 87.3], [175.3, 71.8], [170.2, 65.9],
    [193.0, 95.9], [171.4, 91.4], [177.8, 81.8], [177.8, 96.8], [167.6, 69.1],
    [167.6, 82.7], [180.3, 75.5], [182.9, 79.5], [176.5, 73.6], [186.7, 91.8],
    [188.0, 84.1], [188.0, 85.9], [177.8, 81.8], [174.0, 82.5], [177.8, 80.5],
    [171.4, 70.0], [185.4, 81.8], [185.4, 84.1], [188.0, 90.5], [188.0, 91.4],
    [182.9, 89.1], [176.5, 85.0], [175.3, 69.1], [175.3, 73.6], [188.0, 80.5],
    [188.0, 82.7], [175.3, 86.4], [170.5, 67.7], [179.1, 92.7], [177.8, 93.6],
    [175.3, 70.9], [182.9, 75.0], [170.8, 93.2], [188.0, 93.2], [180.3, 77.7],
    [177.8, 61.4], [185.4, 94.1], [168.9, 75.0], [185.4, 83.6], [180.3, 85.5],
    [174.0, 73.9], [167.6, 66.8], [182.9, 87.3], [160.0, 72.3], [180.3, 88.6],
    [167.6, 75.5], [186.7, 101.4], [175.3, 91.1], [175.3, 67.3], [175.9, 77.7],
    [175.3, 81.8], [179.1, 75.5], [181.6, 84.5], [177.8, 76.6], [182.9, 85.0],
    [177.8, 102.5], [184.2, 77.3], [179.1, 71.8], [176.5, 87.9], [188.0, 94.3],
    [174.0, 70.9], [167.6, 64.5], [170.2, 77.3], [167.6, 72.3], [188.0, 87.3],
    [174.0, 80.0], [176.5, 82.3], [180.3, 73.6], [167.6, 74.1], [188.0, 85.9],
    [180.3, 73.2], [167.6, 76.3], [183.0, 65.9], [183.0, 90.9], [179.1, 89.1],
    [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
    [180.3, 83.2], [180.3, 83.2]
];
      function calculateAverage(data, dim) {
        let total = 0;
        for (var i = 0; i < data.length; i++) {
          total += data[i][dim];
        }
        return (total /= data.length);
      }
      const scatterOption = (option = {
        xAxis: {
          scale: true,
          axisLabel: {
            fontSize: 14,
            color: "#fff",
          },
        },
        yAxis: {
          scale: true,
          axisLabel: {
            fontSize: 14,
            color: "#fff",
          },
        },
        series: [
          {
            type: "scatter",
            id: "female",
            dataGroupId: "female",
            universalTransition: {
              enabled: true,
              delay: function (idx, count) {
                return Math.random() * 400;
              },
            },
            data: femaleData,
          },
          {
            type: "scatter",
            id: "male",
            dataGroupId: "male",
            universalTransition: {
              enabled: true,
              delay: function (idx, count) {
                return Math.random() * 400;
              },
            },
            data: maleDeta,
          },
        ],
      });
      const barOption = {
        xAxis: {
          type: "category",
          data: ["Female", "Male"],
          axisLabel: {
            fontSize: 14,
            color: "#fff",
          },
        },
        yAxis: {
          axisLabel: {
            fontSize: 14,
            color: "#fff",
          },
        },
        series: [
          {
            type: "bar",
            id: "total",
            data: [
              {
                value: calculateAverage(maleDeta, 0),
                groupId: "male",
              },
              {
                value: calculateAverage(femaleData, 0),
                groupId: "female",
              },
            ],
            universalTransition: {
              enabled: true,
              seriesKey: ["female", "male"],
              delay: function (idx, count) {
                return Math.random() * 400;
              },
            },
          },
        ],
      };
      let currentOption = scatterOption;
    this.timer2=  setInterval(function () {
        currentOption =
          currentOption === scatterOption ? barOption : scatterOption;
        myChart.setOption(currentOption, true);
      }, 2000);

      option && myChart.setOption(option);
    },
    mc2() {
      var chartDom = document.querySelector(".mc2");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        color: ["#67F9D8", "#FFE434", "#56A3F1", "#FF917C"],

        legend: {
          textStyle: {
            color: "#fff",
          },
        },
        radar: [
          {
            indicator: [
              { text: "Indicator1" },
              { text: "Indicator2" },
              { text: "Indicator3" },
              { text: "Indicator4" },
              { text: "Indicator5" },
            ],
            center: ["27%", "55%"],
            radius: 80,
            startAngle: 90,
            splitNumber: 4,
            shape: "circle",
            axisName: {
              formatter: "【{value}】",
              color: "#428BD4",
            },
            splitArea: {
              areaStyle: {
                color: ["#77EADF", "#26C3BE", "#64AFE9", "#428BD4"],
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowBlur: 10,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(211, 253, 250, 0.8)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(211, 253, 250, 0.8)",
              },
            },
          },
          {
            indicator: [
              { text: "Indicator1", max: 150 },
              { text: "Indicator2", max: 150 },
              { text: "Indicator3", max: 150 },
              { text: "Indicator4", max: 120 },
              { text: "Indicator5", max: 108 },
              { text: "Indicator6", max: 72 },
            ],
            center: ["75%", "55%"],
            radius: 80,
            axisName: {
              color: "#fff",
              backgroundColor: "#666",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
        ],
        series: [
          {
            type: "radar",
            emphasis: {
              lineStyle: {
                width: 4,
              },
            },
            data: [
              {
                value: [100, 8, 0.4, -80, 2000],
                name: "Data A",
              },
              {
                value: [60, 5, 0.3, -100, 1500],
                name: "Data B",
                areaStyle: {
                  color: "rgba(255, 228, 52, 0.6)",
                },
              },
            ],
          },
          {
            type: "radar",
            radarIndex: 1,
            data: [
              {
                value: [120, 118, 130, 100, 99, 70],
                name: "Data C",
                symbol: "rect",
                symbolSize: 12,
                lineStyle: {
                  type: "dashed",
                },
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.value;
                  },
                },
              },
              {
                value: [100, 93, 50, 90, 70, 60],
                name: "Data D",
                areaStyle: {
                  color: new this.$echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                    {
                      color: "rgba(255, 145, 124, 0.1)",
                      offset: 0,
                    },
                    {
                      color: "rgba(255, 145, 124, 0.9)",
                      offset: 1,
                    },
                  ]),
                },
              },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    },
    // 右侧图
    rc2() {
      var chartDom = document.querySelector(".rc2");
      var myChart = this.$echarts.init(chartDom);
      var option;

      const piePatternSrc =
        "data:image/jpeg;base64,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";

      const piePatternImg = new Image();
      piePatternImg.src = piePatternSrc;
      // const bgPatternImg = new Image();
      // bgPatternImg.src = bgPatternSrc;
      option = {
        title: {
          text: "销量占比",
          textStyle: {
            color: "#fff",
          },
          left: "center",
        },
        tooltip: {},
        series: [
          {
            name: "pie",
            type: "pie",
            selectedMode: "single",
            center: ["50%", "60%"],
            selectedOffset: 30,
            clockwise: true,
            label: {
              fontSize: 18,
              color: "#fff",
            },
            labelLine: {
              lineStyle: {
                color: "#fff",
              },
            },
            data: [
              { value: 1048, name: "手机" },
              { value: 735, name: "电脑" },
              { value: 580, name: "上衣" },
              { value: 484, name: "裤子" },
              { value: 300, name: "卫衣" },
            ],
            itemStyle: {
              opacity: 0.7,
              color: {
                image: piePatternImg,
                repeat: "repeat",
              },
              borderWidth: 3,
              borderColor: "#235894",
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    // 大地图
    map() {
      this.scene = new Scene({
        id: "map",
        map: new GaodeMap({
          pitch: 40,
          center: [40, 40.16797],
          style: "dark",
          zoom: 2.5,
        }),
      });

      this.scene.addImage(
        "plane",
        "https://gw.alipayobjects.com/zos/bmw-prod/0ca1668e-38c2-4010-8568-b57cb33839b9.svg"
      );
      this.scene.on("loaded", () => {
        Promise.all([
          fetch(
            "https://gw.alipayobjects.com/os/bmw-prod/2960e1fc-b543-480f-a65e-d14c229dd777.json"
          ).then(d => d.json()),
          fetch(
            "https://gw.alipayobjects.com/os/basement_prod/4472780b-fea1-4fc2-9e4b-3ca716933dc7.json"
          ).then(d => d.text()),
          fetch(
            "https://gw.alipayobjects.com/os/basement_prod/a5ac7bce-181b-40d1-8a16-271356264ad8.json"
          ).then(d => d.text()),
        ]).then(([world, dot, flyline]) => {
          const dotData = eval(dot);
          // @ts-ignore
          const flydata = eval(flyline).map(item => {
            // @ts-ignore
            const latlng1 = item.from.split(",").map(e => {
              return e * 1;
            });
            // @ts-ignore
            const latlng2 = item.to.split(",").map(e => {
              return e * 1;
            });
            return { coord: [latlng1, latlng2] };
          });

          const worldLine = new LineLayer()
            .source(world)
            .color("#41fc9d")
            .size(0.5)
            .style({
              opacity: 0.4,
            });
          const dotPoint = new PointLayer()
            .source(dotData, {
              parser: {
                type: "json",
                x: "lng",
                y: "lat",
              },
            })
            .shape("circle")
            .color("#ffed11")
            .animate(true)
            .size(40);
          const flyLine = new LineLayer({ blend: "normal" })
            .source(flydata, {
              parser: {
                type: "json",
                coordinates: "coord",
              },
            })
            .color("#ff6b34")
            .texture("plane")
            .shape("arc")
            .size(15)
            .animate({
              duration: 1,
              interval: 0.2,
              trailLength: 0.05,
            })
            .style({
              textureBlend: "replace",
              lineTexture: true, // 开启线的贴图功能
              iconStep: 10, // 设置贴图纹理的间距
            });

          const flyLine2 = new LineLayer()
            .source(flydata, {
              parser: {
                type: "json",
                coordinates: "coord",
              },
            })
            .color("#ff6b34")
            .shape("arc")
            .size(1)
            .style({
              lineType: "dash",
              dashArray: [5, 5],
              opacity: 0.5,
            });
          this.scene.addLayer(worldLine);
          this.scene.addLayer(dotPoint);
          this.scene.addLayer(flyLine2);
          this.scene.addLayer(flyLine);
        });
      });
    },
  },
  mounted() {
    this.getCount();
    // 图表1
    let t = setTimeout(() => {
      this.bg();
      this.ec1();
      this.mc1();
      this.mc2();
      this.rc2();
      clearTimeout(t);
    });
    this.timer = setInterval(() => {
      this.getCount();
    }, 20000);
  }, // 执行清空定时器
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
    clearInterval(this.timer2);
    this.timer = null;
    this.timer1 = null;
    this.timer2 = null;
  },
  watch: {
    count: {
      deep: true,
      immediate: true,
      handler(val) {
        this.showNum();
      },
    },
    flag: {
      handler(val) {
        if (!val) {
          this.map();
        } else {
          this.scene.destroy();
          this.scene = null;
        }
      },
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
#dv-full-screen-container {
  /* width: 1537px !important; */
}
.title {
  position: relative;
  width: 100%;
  height: 100px;
  /* background-color: #fff; */
}
.h1 {
  position: absolute;
  top: 10px;
  left: 45%;
  text-align: center;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
}
.btn {
  position: absolute;
}
.btn1 {
  top: 20px;
  left: 27%;
}
.btn2 {
  top: 20px;
  left: 67.5%;
}
.ivu-btn-ghost.ivu-btn-info {
  padding: 5px;
  color: #2db7f5;
}
.main,
#map {
  width: 100%;
  height: 89%;
  box-sizing: border-box;
  display: flex;
}
.left {
  flex: 27.5%;
}
.mid {
  flex: 44%;
}
.right {
  flex: 28.5%;
}
.left .top {
  display: flex;
  justify-content: space-between;
}
.left .top .c2 {
  flex: 50%;
  margin-left: 40px;
}
.left .top .c1 {
  flex: 50%;
}
h1 {
  text-align: center;
  color: #fff;
}

.bot {
  height: 73%;
}
.mc1 {
  height: 57%;
}
.mc2 {
  height: 40%;
  margin-top: 30px;
}
.rc1 {
  height: 55%;
  padding: 20px;
}
.rc2 {
  height: 40%;
  padding-top: 20px;
}
/deep/.amap-container {
  background: unset;
  background-color: unset !important;
}
/deep/.l7-control-logo .l7-control-logo-link img {
  cursor: pointer;
  display: none;
}
</style>
