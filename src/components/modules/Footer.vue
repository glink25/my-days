<template>
  <div class="footer">
    <div class="buttons">
      <MButton @click="showAddDay = true" />
    </div>
    <span>版权</span>
    <AddDay :visible.sync="showAddDay" />
  </div>
</template>
<script>
import MButton from "../ui/MButton";
import AddDay from "./AddDay";
export default {
  name: "Footer",
  components: { MButton, AddDay },
  data() {
    return {
      showAddDay: false,
    };
  },
};
</script>
<style scoped>
.footer span {
  font-size: 10px;
}
</style>
