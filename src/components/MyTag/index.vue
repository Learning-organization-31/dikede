<template>
  <div class="tag" :style="{ backgroundColor: color }">
    <span class="text"><slot /></span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#ccc",
    },
  },
};
</script>

<style scoped>
.tag {
  border-radius: 10px;
  margin-right: 10px;
}
.text {
  margin: 0 10px;
  color: #fff;
}
</style>
