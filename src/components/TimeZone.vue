<template>
  <div class="time-zone">
    <Progress class="progress-zone" />
    <Digital ref="digital" class="digital-zone" />
  </div>
</template>
<script>
import Progress from "./modules/Progress";
import Digital from "./modules/Digital";
export default {
  name: "TimeZone",
  components: { Progress, Digital },
};
</script>
<style scoped>
.time-zone {
  height: 100%;
}
.progress-zone {
  height: 100%;
}
.digital-zone {
  position: relative;
  height: 100%;
  top: -100%;
}
</style>
