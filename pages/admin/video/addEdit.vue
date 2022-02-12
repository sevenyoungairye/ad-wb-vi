<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="130px"
    >
      <el-form-item label="影视名称" prop="ftName">
        <el-input v-model="dataForm.ftName" placeholder="影视名称"></el-input>
      </el-form-item>
      <el-form-item label="季数" prop="seasons">
        <el-input v-model="dataForm.seasons" placeholder="季数"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="coverUrl">
        <el-input v-model="dataForm.coverUrl" placeholder="封面"></el-input>
      </el-form-item>
      <el-form-item label="播放路径" prop="dtlUrl">
        <el-input v-model="dataForm.dtlUrl" placeholder="播放路径"></el-input>
      </el-form-item>
      <el-form-item label="短路径" prop="shortDtlUrl">
        <el-input
          v-model="dataForm.shortDtlUrl"
          placeholder="短路径"
        ></el-input>
      </el-form-item>
      <el-form-item label="上映年份" prop="year">
        <el-input v-model="dataForm.year" placeholder="上映年份"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-input v-model="dataForm.category" placeholder="分类"></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="area">
        <el-input v-model="dataForm.area" placeholder="地区"></el-input>
      </el-form-item>
      <el-form-item label="集数状态" prop="episodeSts">
        <el-input
          v-model="dataForm.episodeSts"
          placeholder="集数状态"
        ></el-input>
      </el-form-item>
      <el-form-item label="集数" prop="episodes">
        <el-input v-model="dataForm.episodes" placeholder="集数"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <!-- 子组件监听 -->
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>


<script>
import { info, update, save } from "@/api/admin/movie/ftData.js";

export default {
  layout: "admin/default",
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        ftName: "",
        seasons: "",
        coverUrl: "",
        dtlUrl: "",
        shortDtlUrl: "",
        year: "",
        category: "",
        area: "",
        episodeSts: "",
        episodes: "",
      },
      dataRule: {
        ftName: [
          { required: true, message: "影视名称不能为空", trigger: "blur" },
        ],
        seasons: [
          { required: true, message: "第几部不能为空", trigger: "blur" },
        ],
        coverUrl: [
          { required: true, message: "封面url不能为空", trigger: "blur" },
        ],
        dtlUrl: [
          { required: true, message: "播放路径不能为空", trigger: "blur" },
        ],
        shortDtlUrl: [
          { required: true, message: "短路径不能为空", trigger: "blur" },
        ],
        year: [
          { required: true, message: "上映年份不能为空", trigger: "blur" },
        ],
        category: [
          { required: true, message: "分类不能为空", trigger: "blur" },
        ],
        area: [{ required: true, message: "地区不能为空", trigger: "blur" }],
        episodeSts: [
          { required: true, message: "集数状态不能为空", trigger: "blur" },
        ],
        episodes: [
          { required: true, message: "集数不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          info(this.dataForm.id)
            .then((resp) => resp.data)
            .then((resp) => (this.dataForm = resp));
        }
      });
    },
    refreshData() {
      // 触发父组件的方法
      this.$emit("refreshDataList");
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        console.log("submit..");
        if (valid) {
          console.log("valid..");
          if (this.dataForm.id) {
            // upd
            update(this.dataForm).then((resp) =>
              this.$message.success(resp.returnMsg)
            );
          } else {
            // add
            save(this.dataForm).then((resp) =>
              this.$message.success(resp.returnMsg)
            );
          }
          this.visible = false;
          this.refreshData();
        }
      });
    },
  },
};
</script>

<style scoped>
</style>