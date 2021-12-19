<template>
  <div>
    <h1>Hello world!</h1>
    <!-- 项目路由 -->
    <NuxtLink to="/">Home page</NuxtLink>

    <el-button @click="toAbout">点击我</el-button>

    <h1>Hello world!</h1>

    <h1>Hello world!</h1>

    <h1>Hello world!</h1>

    <h1>Hello world!</h1>

    <h1>Hello world!</h1>

    <h1>Hello world!</h1>

    <h1>Hello world!</h1>

    <h1>Hello world!</h1>
  </div>
</template>

<script>
import req from "@/api/req.js";

export default {
  data() {
    return {
      allData: {},
    };
  },
  created() {
    req.getCaptchaImg().then((resp) => {
      this.allData = resp;
    });
  },
  methods: {
    toAbout: () => {
      window.location.href = "/about";
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}
</style>
