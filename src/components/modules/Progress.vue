<template>
  <div class="progress-wrapper">
    <div class="canvas-wrap">
      <canvas
        id="canvas"
        ref="canvas"
        width="400"
        height="400"
        style="zoom:0.5"
        class="canvas"
      ></canvas>
    </div>
    <div class="year-bar" :style="{ backgroundColor: yearBgColor }">
      <div
        class="year-bar-inside"
        :style="{ width: yearWidth, backgroundColor: yearColor }"
      ></div>
    </div>
  </div>
</template>
<script>
const width = 400;
const height = width;
const padding = 53;
const weight = 45;
const center = [width / 2, height / 2];
const P = Math.PI;
const R = 60;
const COLORS = ["#1eeaef", "#92e82a", "#fa114f"];
const BG_COLORS = ["#0c5d5f", "#3a5d11", "#64071f"];
const YEAR_COLORS = ["#388e3c", "#1e88e5", "#f4511e", "#dd2c00"];
const YEAR_BG_COLORS = ["#398e3d4d", "#1f89e54d", "#f4511f4d", "#db2c004d"];

let YEAR_COLOR = YEAR_COLORS[0];
let YEAR_BG_COLOR = YEAR_BG_COLORS[0];

function getStart(index) {
  return [width / 2, height / 2 - R - padding * index];
}
function getEnd(index, angle) {
  const r = center[1] - getStart(index)[1];
  return [...center, r, ...getAngle(angle)];
}
function getAngle(angle) {
  let a = angle ?? 360;
  return [-0.5 * P, (a / 180 - 0.5) * P];
}

export default {
  name: "Progress",
  props: {
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    week: { type: Number, required: true },
    day: { type: Number, required: true },
  },
  data() {
    return {
      yearWidth: "8%",
      yearColor: YEAR_COLORS[0],
      yearBgColor: YEAR_BG_COLORS[0],
    };
  },
  mounted() {
    // const canvas = this.$refs.canvas;
    // canvas.width = width;
    // canvas.height = height;
    for (let i = 0; i < 3; i++) {
      this.draw(i);
    }
    this.yearWidth = `${(this.year < 0.1 ? 0.1 : this.year) * 100}%`;
    this.yearColor = YEAR_COLOR;
    this.yearBgColor = YEAR_BG_COLOR;
    this.animatedDraw();
  },
  methods: {
    draw(index, value) {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      context.strokeStyle = value ? COLORS[index] : BG_COLORS[index];
      context.lineCap = "round";
      context.lineWidth = weight;
      // context.shadowOffsetX = 15; // 阴影Y轴偏移
      // context.shadowOffsetY = 15; // 阴影X轴偏移
      // context.shadowBlur = 14; // 模糊尺寸
      // context.shadowColor = "rgba(0, 0, 0, 0.5)"; // 颜色
      context.beginPath();
      context.moveTo(...getStart(index));
      context.arc(...getEnd(index, value));
      context.stroke();
    },
    animatedDraw() {
      let starts = [0, 0, 0];
      const targets = [this.month * 360, this.week * 360, this.day * 360];
      const that = this;
      let ani = null;
      const offset = 0.01;
      function step() {
        if (
          starts[0] + offset >= targets[0] &&
          starts[1] + offset >= targets[1] &&
          starts[2] + offset >= targets[2]
        ) {
          window.cancelAnimationFrame(ani);
          return;
        }
        targets.forEach((target, index) => {
          let angle = starts[index];
          if (angle >= target) return;
          that.draw(index, angle);
          if (angle < target / 2) starts[index] += angle / 5 + 0.1;
          else starts[index] += (target - angle) * 0.1;
        });
        ani = window.requestAnimationFrame(step);
      }
      step();
    },
  },
};
</script>
<style scoped>
.progress-wrapper {
  z-index: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}
.canvas-wrap {
  width: 200px;
  height: 200px;
}
.canvas {
  z-index: 10;
  width: 400px;
  padding: 30px;
}
.year-bar {
  width: 88%;
  height: 25px;
  margin-left: 30px;
  border-radius: 30px;
  transition: background-color 1.3s ease;
  -webkit-transition: background-color 1.3s ease;
}
.year-bar-inside {
  width: 10%;
  height: 100%;
  border-radius: 30px;
  transition: width 1.3s ease, background-color 1.3s ease;
  -webkit-transition: width 1.3s ease, background-color 1.3s ease;
}
</style>
