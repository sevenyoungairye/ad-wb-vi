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
      <top-menu :menuList="menuList" />
    </el-menu>

    <div class="right-div">
      <div class="search-txt" v-show="!isSearchPage">
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
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import SearchInput from "@/components/base/SearchInput.vue";
import TopMenu from "@/components/menu/TopMenu.vue";

export default {
  components: { TopMenu, SearchInput },
  data() {
    return {
      menuList: [],
      isSearchPage: false, // 隐藏检索框
      popoverVisible: false, // hover是否可见
      q: "", // 检索数据
    };
  },
  created() {
    this.$api
      .get("/v1/view/index/m")
      .then((resp) => resp.data)
      .then((resp) => {
        console.log(resp);
        this.menuList = resp.data;
      })
      .catch((e) => console.log(e));
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
      console.log(key, keyPath);
      this.$router.push({ path: key });
    },
  },
};
</script>

<style scoped>
.right-div {
  width: 35%;
  height: 100%;
  position: absolute;
  top: 0%;
  right: 1%;
}

.search-txt {
  position: absolute;
  top: 10%;
  right: 10%;
  width: 70%;
}

.avatar-img {
  top: 18%;
  right: 1%;
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #7f7f8c;
}

.head-pg {
  position: relative;
  background-color: #545c64;
}
</style>