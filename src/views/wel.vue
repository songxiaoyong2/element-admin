<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
    "
  >
    <ParticleEffectButton
      :visible.sync="btnOps.visible"
      :animating.sync="btnOps.animating"
      :options="btnOps"
      cls="btn-cls"
    >
      <h1 style="width: 820px; height: 180px"></h1>
    </ParticleEffectButton>
  </div>
</template>

<script>
import ParticleEffectButton from "vue-particle-effect-buttons";

export default {
  data() {
    return {
      btnOps: {
        easing: "easeInQuart",
        size: 3,
        speed: 1,
        duration: 1300,
        particlesAmountCoefficient: 10,
        oscillationCoefficient: 1,
        color: function () {
          return "#F56C6C";
        },
        onComplete: () => {
          this.$router.push({ name: "login" });
        },
        onBegin: () => {
          console.log("begin");
        },
        visible: true,
        animating: false,
      },
    };
  },
  components: {
    ParticleEffectButton,
  },
  mounted() {
    var chartDom = document.querySelector("h1");
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
              text: "欢迎来到六彩星管理系统",
              fontSize: 60,
              fontWeight: "bold",
              lineDash: [0, 200],
              lineDashOffset: 0,
              fill: "transparent",
              stroke: "#000",
              lineWidth: 1,
            },
            keyframeAnimation: {
              duration: 3000,
              loop: false,
              keyframes: [
                {
                  percent: 0.7,
                  style: {
                    fill: "transparent",
                    lineDashOffset: 200,
                    lineDash: [200, 0],
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

    option && myChart.setOption(option);
  },
};
</script>
<style scoped>
.theme-5 {
  background: linear-gradient(120deg, #baedff, #07a2da);
  /* --color-action: #003ff1; */
}
/deep/.btn-cls {
  background-color: #6cc3f5;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 5px;
  border: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  /* pointer-events: none; */
}
body,
#app > div > div:nth-child(1) > div > div,
#app > div > div:nth-child(1) > div,
.vue-particle-effect-button /deep/.particles {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/deep/div {
  width: 100%;
  height: 100%;
}
</style>
