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
          <nuxt-link
            class="header-link"
            style="color: rgb(255, 255, 255)"
            to="/video"
            >番剧</nuxt-link
          >
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
      <div v-show="!isSearchPage">
        <search-input :q="q" />
      </div>
      <div>
        <el-popover
          placement="top"
          width="300"
          trigger="hover"
          v-model="popoverVisible"
        >
          <div>
            <p>请登录, 哒咩</p>
            <div>
              <el-button>登录</el-button>
            </div>
          </div>
          <template slot="reference">
            <el-image
              v-on:click="doLogin"
              class="avatar-img"
              :src="`https://vfiles.gtimg.cn/vupload/202005/07_common_avatar.png`"
            />
          </template>
        </el-popover>
      </div>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
import SearchInput from "@/components/base/SearchInput.vue";

export default {
  components: { SearchInput },
  data() {
    return {
      isSearchPage: false, // 隐藏检索框
      popoverVisible: false, // hover是否可见
      q: "", // 检索数据
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  watch: {
    "$route.path": {
      handler(path) {
        this.isSearchPage = path.includes("/search");
      },
      immediate: true,
    },
  },
  methods: {
    doLogin() {
      console.log("open login dialog...");
      this.popoverVisible = false;
    },
    handleSelect(key, keyPath) {
      console.debug(key, keyPath);
    },
  },
};
</script>

<style scoped>
.top-flex {
  margin-top: 1%;
  right: 1%;
  position: absolute;
}

.avatar-img {
  margin-top: 1%;
  right: 1%;
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #7f7f8c;
}

.header-link {
  text-decoration: none;
}

.head-pg {
  position: relative;
  background-color: #545c64;
}
</style>