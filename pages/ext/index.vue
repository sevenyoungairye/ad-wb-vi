<template>
  <div class="ext-bg">
    <div>
      <el-collapse accordion>
        <el-collapse-item title="一个好玩的播放插件">
          <div class="text-desc">
            <el-link u:underline="false" target="_blank" href="/parse/play">
              🎈链接直达
            </el-link>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div class="hide-div"></div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "extend page",
    };
  },
  data() {
    return {};
  },
  created() {},
};
</script>

<style>
.text-desc {
  margin-left: 5px;
}


.ext-bg {
  background: url("https://w.wallhaven.cc/full/y8/wallhaven-y8lkdd.jpg");
  opacity: 100%;
  margin-top: 1px;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

.hide-div {
  /* height: 64.6vh; */
  height: 100vh;
}

.el-collapse-item__header {
  opacity: 90%;
  color: #999;
  font-weight: bolder;
}

.el-collapse-item__wrap {
  opacity: 60%;
}
</style>