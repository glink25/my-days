<template>
  <div class="progress-wrpper">
    <canvas id="canvas" ref="canvas" style="zoom:0.5" class="canvas"></canvas>
  </div>
</template>
<script>
const width = 400;
const height = 400;
const padding = 10;
const weight = 30;
const center = [width / 2, height / 2];
const P = Math.PI;
const R = 100;
function getStart(index) {
  return [width / 2, height / 2 - R - padding * index];
}
function getEnd(index) {
  const r = center[1] - getStart(index)[1];
  return [...center, r, ...getAngle(180)];
}
function getAngle(angle) {
  return [-0.5 * P, (angle / 180 - 0.5) * P];
}

export default {
  name: "Progress",
  data() {
    return {};
  },
  mounted() {
    const canvas = this.$refs.canvas;
    canvas.width = width;
    canvas.height = height;
    this.draw();
  },
  methods: {
    draw() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      context.strokeStyle = "red";
      context.lineCap = "round";
      context.lineWidth = weight;
      context.beginPath();
      context.moveTo(...getStart(0));
      context.arc(...getEnd(0));
      context.stroke();
    },
  },
};
</script>
<style scoped>
.progress-wrapper {
  width: 100%;
  height: 100%;
  z-index: 1;
}
.canvas {
  z-index: 10;
}
</style>
