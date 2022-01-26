<template>
  <div class="container">
    <el-form :inline="true" :model="queryParams">
      <el-form-item>
        <el-input
          @change="getDataList()"
          v-model="queryParams.key"
          placeholder="参数名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button
          type="danger"
          @click="deleteHandle()"
          :disabled="ids.length <= 0"
          >批量删除</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="主键"
      >
      </el-table-column>
      <el-table-column
        prop="ftName"
        header-align="center"
        align="center"
        label="影视名称"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="seasons"
        header-align="center"
        align="center"
        label="第几部"
      >
      </el-table-column>
      <el-table-column
        prop="coverUrl"
        header-align="center"
        align="center"
        label="封面"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.coverUrl">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="dtlUrl"
        header-align="center"
        align="center"
        label="播放路径"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="year"
        header-align="center"
        align="center"
        label="上映年份"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="category"
        header-align="center"
        align="center"
        label="分类"
      >
      </el-table-column>
      <el-table-column
        prop="area"
        header-align="center"
        align="center"
        label="地区"
      >
      </el-table-column>
      <el-table-column
        prop="episodeSts"
        header-align="center"
        align="center"
        label="集数状态"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="episodes"
        header-align="center"
        align="center"
        label="集数"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <!-- <nuxt-link :to="`/admin/video/detail?ftId=${scope.row.id}`">
            <el-button type="text" size="small"> 剧集 </el-button>
          </nuxt-link> -->

          <el-button @click="toEpisodes(scope.row.id)" type="text" size="small">
            剧集
          </el-button>

          <el-button
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row.id)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="deleteHandle(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="queryParams.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="queryParams.limit"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>

    <!-- 弹窗, 新增 / 修改, refreshDataList为自定义的方法， 用于子组件刷新父组件 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList"
    ></add-or-update>
  </div>
</template>

<script>
import { getDataList, deleteByIds } from "@/api/admin/movie/ftData.js";

import AddOrUpdate from "./addEdit";

export default {
  layout: "admin/default",
  components: {
    AddOrUpdate,
  },
  data() {
    return {
      // 检索参数..
      queryParams: {
        page: 1,
        limit: 10,
        key: null,
      },
      dataList: [],
      totalCount: 0, // 总页数
      dataListLoading: false,
      ids: [],
      addOrUpdateVisible: false,
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    toEpisodes(id) {
      let routeData = this.$router.resolve({
        path: `/admin/video/detail?ftId=${id}`,
      });
      window.open(routeData.href, "_blank");
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      if (this.queryParams.key) {
        this.queryParams.page = 1;
      }
      getDataList(this.queryParams)
        .then((resp) => resp.data)
        .then((resp) => {
          this.dataList = resp.list;
          this.totalCount = resp.totalCount;
          this.dataListLoading = false;
        });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.queryParams.limit = val;
      this.queryParams.page = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.queryParams.page = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.ids = val.map((item) => {
        return item.id;
      });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.ids;

      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        console.log("删除了...", ids);
        deleteByIds(ids).then((resp) => {
          this.$message.success(resp.returnCode);
          this.getDataList();
        });
      });
    },
  },
};
</script>

<style lang="css" scoped>
</style>>
