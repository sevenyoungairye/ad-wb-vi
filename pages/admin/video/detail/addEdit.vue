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
      label-width="80px"
    >
      <el-form-item label="主表id" prop="ftId">
        <el-input v-model="dataForm.ftId" placeholder="主表id"></el-input>
      </el-form-item>
      <el-form-item label="集数" prop="episodeSerialNo">
        <el-input
          v-model="dataForm.episodeSerialNo"
          placeholder="集数"
        ></el-input>
      </el-form-item>
      <el-form-item label="播放描述" prop="episodePlayDesc">
        <el-input
          v-model="dataForm.episodePlayDesc"
          placeholder="播放描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="资源url" prop="dtlReqUrl">
        <el-input v-model="dataForm.dtlReqUrl" placeholder="资源url"></el-input>
      </el-form-item>
      <el-form-item label="播放密钥" prop="playKey">
        <el-input v-model="dataForm.playKey" placeholder="密钥" />
      </el-form-item>
      <el-form-item label="资源" prop="m3u8Url">
        <el-input v-model="dataForm.m3u8Url" placeholder="资源"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { info, save, update } from "@/api/admin/movie/ftDataDtls.js";

export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: null,
        ftId: "",
        episodeSerialNo: "",
        episodePlayDesc: "",
        dtlReqUrl: "",
        playKey: null,
        m3u8Url: "",
      },
      dataRule: {
        ftId: [{ required: true, message: "主表id不能为空", trigger: "blur" }],
        episodeSerialNo: [
          { required: true, message: "第几集不能为空", trigger: "blur" },
        ],
        episodePlayDesc: [
          { required: true, message: "播放描述不能为空", trigger: "blur" },
        ],
        dtlReqUrl: [
          {
            required: true,
            message: "资源请求路径, 获取密钥用不能为空",
            trigger: "blur",
          },
        ],
        m3u8Url: [
          { required: true, message: "资源资源不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    let ftId = this.$route.query.ftId;
    if (ftId) {
      this.dataForm.ftId = ftId;
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          // 查询明细
          info(id)
            .then((resp) => resp.data)
            .then((resp) => (this.dataForm = resp));
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        console.log("submit..");
        if (valid) {
          console.log("valid..");
          if (this.dataForm.id) {
            // upd
            update(this.dataForm).then((resp) => {
              this.$message.success(resp.returnMsg);
            });
          } else {
            // add
            save(this.dataForm).then((resp) => {
              this.$message.success(resp.returnMsg);
            });
          }
          this.visible = false;
          // 子组件刷新
          this.$emit("refreshData");
        }
      });
    },
  },
};
</script>

<style scoped>
</style>>
