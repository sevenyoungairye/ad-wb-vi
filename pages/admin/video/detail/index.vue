<template>
  <div>
    <el-form :inline="true" :model="queryParams">
      <el-form-item>
        <el-input
          @change="getDataList"
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
        label="主键id"
      >
      </el-table-column>
      <el-table-column
        prop="ftId"
        header-align="center"
        align="center"
        label="主表id"
      >
      </el-table-column>
      <el-table-column
        prop="episodeSerialNo"
        header-align="center"
        align="center"
        label="集数"
      >
      </el-table-column>
      <el-table-column
        prop="episodePlayDesc"
        header-align="center"
        align="center"
        label="播放描述"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="dtlReqUrl"
        header-align="center"
        align="center"
        label="资源请求路径"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="playKey"
        header-align="center"
        align="center"
        label="播放密钥"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="m3u8Url"
        header-align="center"
        align="center"
        label="播放资源"
        width="400"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间"
        width="120"
      />
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="修改时间"
        width="120"
      />
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
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
      :page-sizes="[10, 20, 50, 100]"
      :current-page="queryParams.page"
      :page-size="queryParams.limit"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      ref="dialogOps"
      @refreshData="getDataList"
      v-if="dialogVisible"
    ></add-or-update>
  </div>
</template>

<script>
import { getDataList, deleteById } from "@/api/admin/movie/ftDataDtls.js";
import AddOrUpdate from "./addEdit.vue";

export default {
  layout: "admin/default",
  components: { AddOrUpdate },
  data() {
    return {
      queryParams: {
        page: 1,
        limit: 10,
        key: undefined, // 检索键
        ftId: null,
      },
      dataList: [],
      totalCount: 0,
      dataListLoading: false,
      ids: [],
      dialogVisible: false,
    };
  },
  created() {
    if (this.$route.query) {
      this.queryParams.ftId = this.$route.query.ftId;
    }

    this.getDataList();
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
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
      this.ids = val.map((item) => item.id);
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        // 渲染页面
        this.$refs.dialogOps.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      let ids = id ? [id] : this.ids;
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        console.log("delete by id... ", ids, deleteById);
        // deleteById(ids).then((resp) => this.$message.success(resp.returnMsg));
        // this.getDataList();
      });
    },
  },
};
</script>

<style scoped>
</style>