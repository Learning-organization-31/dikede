<template>
  <div>
    <div class="top">
      <div class="task">
        <Task />
        <Sales />
      </div>
      <List />
    </div>
    <div class="bottom">
      <Partner />
      <Vm />
    </div>
  </div>
</template>

<script>
import Task from "./components/Task";
import Sales from "./components/Sales";
import List from "./components/List";
import Partner from "./components/Partner";
import Vm from "./components/Vm";
export default {
  name: "Home",
  components: {
    Task,
    Sales,
    List,
    Partner,
    Vm,
  },
};
</script>

<style lang="scss" scoped>
//上方样式
.top {
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  height: 538px;
  // 上方工单样式
  .task {
    width: 1280px;
  }
}
//下方样式
.bottom {
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  height: 353px;
  margin-top: 20px;
}
</style>
