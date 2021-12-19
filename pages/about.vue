<template>
  <div>
    this is a about page..

    <el-button @click="toIndex">点击我</el-button>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {};
  },
  methods: {
    toIndex() {
      window.location.href = "/";
    },
  },
};
</script>
<style scoped>
</style>