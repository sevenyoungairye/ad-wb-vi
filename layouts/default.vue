<template>
  <div class="all-bg">
    <el-container>
      <el-header class="le-rg">
        <TheHeader />
      </el-header>
      <el-main class="m-pg">
        <Nuxt />
      </el-main>
      <el-footer class="le-rg">
        <TheFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.all-bg {
  background-color: rgb(255, 255, 255);
}

/* .m-pg {
  padding: 2px;
} */

.le-rg {
  padding-left: 0px;
  padding-right: 0px;
}
</style>