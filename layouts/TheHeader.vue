<template>
  <div class="head-pg">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <el-link type="info" href="/">首页</el-link>
      </el-menu-item>

      <el-menu-item index="3">
        <el-link type="info" href="/latest">最新电影</el-link>
      </el-menu-item>

      <el-menu-item index="98">
        <el-link type="info" href="/about">关于</el-link>
      </el-menu-item>
      <el-submenu index="99">
        <template slot="title">影视</template>
        <el-menu-item index="2-1">番剧</el-menu-item>
        <el-menu-item index="2-2">电影</el-menu-item>
        <el-menu-item index="2-3">电视剧</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">综艺</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.head-pg {
  position: relative;
  background-color: #545c64;
}
</style>