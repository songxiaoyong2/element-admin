<template>
  <div style="padding-top: 20px">
    <el-container>
      <!-- 顶部数据 -->
      <el-header
        style="display: flex; justify-content: space-between; height: auto"
      >
        <el-card class="box-card" v-for="(item, index) in count" :key="index">
          {{ item.title }}
          <dv-digital-flop
            :config="config[index]"
            style="width: 140px; height: 50px; margin-left: 10px"
          />
        </el-card>
        <el-card class="box-card"
          >北京时间：
          <canvas id="time" style="width: 100%; height: 100%"></canvas>
        </el-card>
      </el-header>
      <!-- 中间装饰 -->
      <el-row type="flex">
        <dv-decoration-10
          :style="{
            width: flag,
            height: '30px',
          }"
        />
      </el-row>

      <!-- 下面图标 -->
      <el-main style="display: flex; justify-content: space-between">
        <el-card
          class="box-card"
          v-for="(item, index) in 2"
          :key="index"
          style="height: 400px; width: 550px"
        >
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { userListApi, getGoodsApi, getOrderListApi } from "@/api";
export default {
  data() {
    return {
      count: [
        { count1: 0, title: "用户总人数" }, //用户总数
        { count2: 0, title: "商品总数" }, //商品总数
        { count3: 0, title: "订单总数" }, //订单总数
      ],
      // 图标配置
      options: [
        {
          title: {
            subtext: "单位：万",
            left: "left",
          },
          legend: {},
          tooltip: {
            trigger: "axis",
            showContent: false,
          },
          dataset: {
            source: [
              ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
              ["电脑", 56, 82, 88, 70, 53, 85],
              ["卫衣", 51, 51, 55, 53, 73, 68],
              ["外套", 40, 62, 69, 36, 45, 32],
              ["裤子", 25, 37, 41, 18, 33, 49],
            ],
          },
          xAxis: { type: "category" },
          yAxis: { gridIndex: 0 },
          grid: {
            top: "55%",
            bottom: "8%",
          },
          tooltip: {
            trigger: "axis",
          },
          series: [
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              emphasis: {
                focus: "self",
              },
              label: {
                formatter: "{b}: {@2012} ({d}%)",
              },
              encode: {
                itemName: "product",
                value: "2012",
                tooltip: "2012",
              },
            },
          ],
        },
      ],
      // 数字配置
      config: [],
      timer: null, //接受定时器
      timer1: null, //接受定时器
      timer2: null, //接受定时器
      myChart: null,
      flag: "",
    };
  },
  methods: {
    async getCount() {
      const { data } = await userListApi({ pageNum: 1, pageSize: 10 });
      const data1 = await getGoodsApi({ pageNum: 1, pageSize: 10 });
      const data2 = await getOrderListApi({ pageNum: 1, pageSize: 10 });
      this.count[0].count1 = data.count;
      this.count[1].count2 = data1.data.count;
      this.count[2].count3 = data2.data.count;
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
    time() {
      const that = this;
      let digit = [
        [
          [0, 0, 1, 1, 1, 0, 0],
          [0, 1, 1, 0, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 0, 1, 1, 0],
          [0, 0, 1, 1, 1, 0, 0],
        ], //0
        [
          [0, 0, 0, 1, 1, 0, 0],
          [0, 1, 1, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [1, 1, 1, 1, 1, 1, 1],
        ], //1
        [
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 1, 1, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 1, 1, 1, 1, 1],
        ], //2
        [
          [1, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 1, 1, 1, 0, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
        ], //3
        [
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 1, 0],
          [0, 0, 1, 1, 1, 1, 0],
          [0, 1, 1, 0, 1, 1, 0],
          [1, 1, 0, 0, 1, 1, 0],
          [1, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 1, 1],
        ], //4
        [
          [1, 1, 1, 1, 1, 1, 1],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
        ], //5
        [
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 1, 1, 0, 0, 0, 0],
          [1, 1, 0, 0, 0, 0, 0],
          [1, 1, 0, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
        ], //6
        [
          [1, 1, 1, 1, 1, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 0, 0, 0],
        ], //7
        [
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 1, 1, 0],
        ], //8
        [
          [0, 1, 1, 1, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 1, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 0, 1, 1],
          [0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 0],
          [0, 1, 1, 0, 0, 0, 0],
        ], //9
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ], //:
      ];

      var showtime = (() => {
        console.log(1);
        var balls = [];
        //记录历史时间
        var hover1 = 99;
        var hover2 = 99;
        var minutes1 = 99;
        var minutes2 = 99;
        var seconds1 = 99;
        var seconds2 = 99;

        function ini(config) {
          let canvasObj = document.getElementById("time");
          console.log(document.getElementById("time"));
          var canvas = {
            element: canvasObj,
            r: config.r || 7, //小球半径
            M_l: config.M_l || 0, //左边距
            M_t: config.M_t || 0, //顶部距离
            CWIDTH: config.CWIDTH || 1200, //画布宽度
            CHIGHT: config.CHIGHT || 500, //画布高度
            color: config.color || [
              "#3f4177",
              "#3f4177",
              "#ffb6f6",
              "#3c97ff",
              "#ff226c",
              "#ff7a51",
              "#3c97ff",
              "#ff226c",
              "7bff",
              "#ff3ebf",
              "ff4b",
            ],
            ballcolor: config.ballcolor || "red",
            rebound: config.rebound || 0.3,
          };
          if (canvas.element.getContext("2d")) {
            canvas.context = canvas.element.getContext("2d");
            canvasObj.width = canvas.CWIDTH;
            canvasObj.height = canvas.CHIGHT;
            console.log(canvas.CHIGHT);
          } else {
            return null;
          }
          that.timer2 = setInterval(function () {
            render(canvas);
            updata(canvas);
            drawball(canvas);
          }, 60); //60毫秒代表60毫秒刷新一次动画，亦60毫秒为一帧
        }

        function render(canvas) {
          var myDate = new Date(); //获取系统当前时间
          var hours = myDate.getHours();
          var minutes = myDate.getMinutes();
          var seconds = myDate.getSeconds();
          //对一个矩形空间内绘制的图形进行刷新操作
          canvas.context.clearRect(0, 0, canvas.CWIDTH, canvas.CHIGHT);

          //创建小球
          //现在的时间和一起的时间对比，判断是否改变，时间的改变会生成新的小球
          if (parseInt(hours / 10) != hover1) {
            addballs(canvas.M_l, canvas.M_t, parseInt(hours / 10), canvas);
          }
          if (parseInt(hours % 10) != hover2) {
            addballs(
              canvas.M_l + 16 * (canvas.r + 1),
              canvas.M_t,
              parseInt(hours % 10),
              canvas
            );
          }
          if (parseInt(minutes / 10) != minutes1) {
            addballs(
              canvas.M_l + 40 * (canvas.r + 1),
              canvas.M_t,
              parseInt(minutes / 10),
              canvas
            );
          }
          if (parseInt(minutes % 10) != minutes2) {
            addballs(
              canvas.M_l + 56 * (canvas.r + 1),
              canvas.M_t,
              parseInt(minutes % 10),
              canvas
            );
          }
          if (parseInt(seconds / 10) != seconds1) {
            addballs(
              canvas.M_l + 80 * (canvas.r + 1),
              canvas.M_t,
              parseInt(seconds / 10),
              canvas
            );
          }
          if (parseInt(seconds % 10) != seconds2) {
            addballs(
              canvas.M_l + 96 * (canvas.r + 1),
              canvas.M_t,
              parseInt(seconds % 10),
              canvas
            );
          }

          //分开画每一个数字及符号
          //该数字开始的坐标X,Y,该数字，CTX
          renderDiget(canvas.M_l, canvas.M_t, parseInt(hours / 10), canvas);
          renderDiget(
            canvas.M_l + 16 * (canvas.r + 1),
            canvas.M_t,
            parseInt(hours % 10),
            canvas
          );
          renderDiget(
            canvas.M_l + 32 * (canvas.r + 1),
            canvas.M_t,
            10,
            canvas,
            false
          );
          renderDiget(
            canvas.M_l + 40 * (canvas.r + 1),
            canvas.M_t,
            parseInt(minutes / 10),
            canvas
          );
          renderDiget(
            canvas.M_l + 56 * (canvas.r + 1),
            canvas.M_t,
            parseInt(minutes % 10),
            canvas
          );
          renderDiget(
            canvas.M_l + 72 * (canvas.r + 1),
            canvas.M_t,
            10,
            canvas,
            false
          );
          renderDiget(
            canvas.M_l + 80 * (canvas.r + 1),
            canvas.M_t,
            parseInt(seconds / 10),
            canvas
          );
          renderDiget(
            canvas.M_l + 96 * (canvas.r + 1),
            canvas.M_t,
            parseInt(seconds % 10),
            canvas
          );

          //记录当前的时间,下次使用时作为过去的时间
          hover1 = parseInt(hours / 10);
          hover2 = parseInt(hours % 10);
          minutes1 = parseInt(minutes / 10);
          minutes2 = parseInt(minutes % 10);
          seconds1 = parseInt(seconds / 10);
          seconds2 = parseInt(seconds % 10);
        }
        //数字的具体绘制，根据che判断是否需要刷新颜色
        function renderDiget(x, y, num, canvas) {
          var ctx = canvas.context;
          for (var i = 0; i < digit[num].length; i++) {
            for (var j = 0; j < digit[num][i].length; j++) {
              if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(
                  x + j * 2 * (canvas.r + 1) + (canvas.r + 1),
                  y + i * 2 * (canvas.r + 1) + (canvas.r + 1),
                  canvas.r,
                  0,
                  2 * Math.PI
                );
                ctx.closePath();
                ctx.fillStyle = canvas.ballcolor;
                ctx.fill();
              }
            }
          }
        }
        //当时间发生变化时，生成小球数组，追加最新的小球
        function addballs(x, y, num, canvas) {
          for (var i = 0; i < digit[num].length; i++) {
            for (var j = 0; j < digit[num][i].length; j++) {
              if (digit[num][i][j] == 1) {
                var ball = {
                  x: x + j * 2 * (canvas.r + 1) + (canvas.r + 1),
                  y: y + i * 2 * (canvas.r + 1) + (canvas.r + 1),
                  color:
                    canvas.color[
                      Math.floor(Math.random() * canvas.color.length)
                    ],
                  g: 1.5 + Math.random(),
                  vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                  vy: -1,
                };
                balls.push(ball);
              }
            }
          }
        }
        //动画每一帧更新一次小球 计算 小球的速度，X速度,Y速度，以及XY坐标
        function updata(canvas) {
          for (var i = 0; i < balls.length; i++) {
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g;
            if (balls[i].y >= canvas.CHIGHT) {
              balls[i].y = canvas.CHIGHT;
              balls[i].vy = -balls[i].vy * canvas.rebound;
            }
          }
          //判断每个小球是否在绘制板内，对于超出的小球采取删除操作
          var cnt = 0;
          for (var j = 0; j < balls.length; j++) {
            if (
              balls[j].x + canvas.r > 0 &&
              balls[j].x - canvas.r < canvas.CWIDTH
            ) {
              //这种重组方法比较快捷，比如该数组有100个元素，从0-99中，有50个有用的，我们把有用的全部集中放在0-49，那么之前的0-49
              //被新的元素覆盖掉，50-99中依然存在有用的元素，不过被复制到了0-49中，所以50-99用不着了，采用下面的方法删除。
              balls[cnt++] = balls[j]; //用cnt重组数组，该数组内的小球都是有用的
            }
          }
          //这里可以放心，ball(cnt-1)前的元素皆为有效的
          while (balls.length > cnt) {
            balls.pop();
          }
        }
        //绘制小球   根据小球当前数组的最新只  循环输出已经生成的 小球的最新位置
        function drawball(canvas) {
          var ctx = canvas.context;
          for (var i = 0; i < balls.length; i++) {
            ctx.beginPath();
            ctx.arc(balls[i]["x"], balls[i]["y"], canvas.r, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = balls[i]["color"];
            ctx.fill();
          }
        }
        return ini;
      })();

      var time_config = {
        r: 7, //小球半径
        M_l: 110, //左边距
        M_t: 100, //顶部距离
        CWIDTH: 1200, //画布宽度
        CHIGHT: 600, //画布高度
        color: [
          "772e",
          "#3f4177",
          "#ffb6f6",
          "#3c97ff",
          "#ff226c",
          "#ff7a51",
          "#3c97ff",
          "#ff226c",
          "7bff",
          "#ff3ebf",
          "ff4b",
        ],
        ballcolor: "#161837", //时间小球颜色
        rebound: 0.2, //掉落底部反弹系数
      };
      showtime(time_config);
    },
  },
  mounted() {
    this.time();
    this.myChart = this.$echarts.init(
      document.querySelectorAll(".el-main .box-card")[0]
    );
    this.myChart.on("updateAxisPointer", event => {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        this.myChart.setOption({
          series: {
            id: "pie",
            label: {
              formatter: "{b}: {@[" + dimension + "]} ({d}%)",
            },
            encode: {
              value: dimension,
              tooltip: dimension,
            },
          },
        });
      }
    });
    this.myChart.setOption(this.options[0]);
    const categories = (function () {
      let now = new Date();
      let res = [];
      let len = 10;
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
        now = new Date(+now - 2000);
      }
      return res;
    })();
    const categories2 = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(10 - len - 1);
      }
      return res;
    })();
    const data = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(Math.round(Math.random() * 1000));
      }
      return res;
    })();
    const data2 = (function () {
      let res = [];
      let len = 0;
      while (len < 10) {
        res.push(+(Math.random() * 10 + 5).toFixed(1));
        len++;
      }
      return res;
    })();

    var op = {
      title: {
        text: "实时数据",
      },
      grid: {
        top: "13%",
        left: "2%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#283b56",
          },
        },
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          data: categories,
        },
        {
          type: "category",
          boundaryGap: true,
          data: categories2,
        },
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          name: "价格",
          max: 30,
          min: 0,
          nameLocation: "end",
          nameTextStyle: {
            align: "right",
          },
          boundaryGap: [0.2, 0.2],
        },
        {
          type: "value",
          scale: true,
          name: "订单",
          max: 1200,
          min: 0,
          nameTextStyle: {
            align: "left",
          },
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: "Dynamic Bar",
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data,
        },
        {
          name: "Dynamic Line",
          type: "line",
          data: data2,
        },
      ],
    };

    this.myChart = this.$echarts.init(
      document.querySelectorAll(".el-main .box-card")[1]
    );
    this.myChart.setOption(op);
    let app = {};
    app.count = 11;
    this.time1 = setInterval(() => {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
      data.shift();
      data.push(Math.round(Math.random() * 1000));
      data2.shift();
      data2.push(+(Math.random() * 10 + 5).toFixed(1));
      categories.shift();
      categories.push(axisData);
      categories2.shift();
      categories2.push(app.count++);
      this.myChart.setOption({
        xAxis: [
          {
            data: categories,
          },
          {
            data: categories2,
          },
        ],
        series: [
          {
            data: data,
          },
          {
            data: data2,
          },
        ],
      });
    }, 2100);

    this.getCount();
    this.timer = setInterval(() => {
      this.getCount();
    }, 20000);
  },
  // 执行清空定时器
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  },
  // 监听数据变化
  watch: {
    count: {
      deep: true,
      immediate: true,
      handler(val) {
        this.showNum();
      },
    },
    de: {
      handler(val) {
        this.flag = "0";

        setTimeout(() => {
          this.flag = "100%";
        }, 110);
      },
    },
  },
  computed: {
    de() {
      return this.$store.state.isCollapse;
    },
  },
};
</script>

<style scoped>
.box-card {
  width: 200px;
  height: 100px;
  text-align: center;
}
#app /deep/.el-header {
  height: auto !important;
}
.el-row--flex {
  width: 100%;
}
</style>
