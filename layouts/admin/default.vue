<!-- 后台管理页面布局 -->
<template>
  <div>
    <el-container>
      <el-header>
        <AdminTheHeader />
      </el-header>
      <el-container>
        <div class="left-side">
          <el-aside style="width: auto;">
            <AdminTheAside />
          </el-aside>
        </div>
        <el-main>
          <nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.left-side {
  width: auto;
  display: inline-block !important;
  display: inline;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #b3c0d1;
}

.el-aside,
.el-container {
  width: 100%;
  height: 100%;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0px;
}

.el-aside {
  /* width: 300px; */
  background-color: #fff;
  color: #333;
}

.el-main {
  background-color: #fff;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>