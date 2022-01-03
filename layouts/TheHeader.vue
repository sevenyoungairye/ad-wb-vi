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
        <nuxt-link class="header-link" to="/">首页</nuxt-link>
      </el-menu-item>

      <el-menu-item index="3">
        <nuxt-link class="header-link" to="/latest">最新电影</nuxt-link>
      </el-menu-item>

      <el-menu-item index="98">
        <nuxt-link class="header-link" to="/about">关于</nuxt-link>
      </el-menu-item>
      <el-submenu index="99">
        <template slot="title">影视</template>
        <el-menu-item index="2-1">
          <nuxt-link class="header-link" style="color: rgb(255, 255, 255);" to="/video">番剧</nuxt-link>
        </el-menu-item>
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
.header-link {
  text-decoration: none;
}

.head-pg {
  position: relative;
  background-color: #545c64;
}
</style>