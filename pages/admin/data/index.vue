<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="同步数据" name="1">
        <div>
          <el-select v-model="form.catalog" clearable>
            <el-option label="电影" :value="1">电影</el-option>
            <el-option label="连续剧" :value="2">连续剧</el-option>
            <el-option label="综艺" :value="3">综艺</el-option>
            <el-option label="动漫" :value="4">动漫</el-option>
          </el-select>
          <el-button type="primary" @click="crawlData">get data</el-button>
          <el-button type="primary" @click="getPlayKey">play key</el-button>
          <el-button type="primary" @click="chromeOps">chrome ops</el-button>
          <el-button type="primary" @click="redisAsync">redis async</el-button>
          <el-button type="primary" @click="downloadData">
            download data
          </el-button>
        </div>
        <div>
          <h2>Drawer</h2>
          <el-button @click="drawer = true" type="success">click</el-button>

          <div>
            <el-drawer
              title="哦嘿嘿"
              :visible.sync="drawer"
              :direction="direction"
            >
              <label style="margin-left: 10px">我来啦!</label>
            </el-drawer>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="todo list" name="2">
        <div>hello</div>
        <div>hello world!</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {
  crawlData,
  getPlayKey,
  chromeOps,
  redisAsync,
  downloadData,
} from "@/api/admin/movie/syncData.js";

export default {
  layout: "admin/default",
  head() {
    return {
      title: "数据中心",
    };
  },
  data() {
    return {
      form: {
        catalog: null,
      },
      drawer: false,
      direction: "rtl",
      activeName: "1",
    };
  },
  methods: {
    crawlData() {
      crawlData(this.form.catalog || "")
        .then((result) => {
          this.$message.success(result);
        })
        .catch((err) => {
          console.log("get data err...", err);
        });
    },
    getPlayKey() {
      getPlayKey()
        .then((result) => {
          this.$message.success(result);
        })
        .catch((err) => {
          console.log("get data err...", err);
        });
    },
    chromeOps() {
      chromeOps()
        .then((result) => {
          this.$message.success(result);
        })
        .catch((err) => {
          console.log("get data err...", err);
        });
    },
    redisAsync() {
      redisAsync()
        .then((result) => {
          this.$message.success(result);
        })
        .catch((err) => {
          console.log("get data err...", err);
        });
    },
    downloadData() {
      downloadData()
        .then((result) => {
          this.$message.success(result);
        })
        .catch((err) => {
          console.log("get data err...", err);
        });
    },
  },
};
</script>

<style>
</style>