<template>
  <div>
    <h1>菜单管理</h1>
    <client-only placeholder="Loading...">
      <div>
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
      </div>

      <div class="block">
        <hr />
      </div>
      <el-button @click="getDataList">refresh</el-button>
      <el-button @click="addMenu(null)">新增菜单</el-button>

      <div class="block">
        <hr />
        <el-tree
          ref="tree"
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          :filter-node-method="filterNode"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">
                Append
              </el-button>
              <el-button type="text" size="mini" @click="() => edit(data)">
                Edit
              </el-button>
              <el-popconfirm
                style="margin-left: 5px"
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                title="这是一段内容确定删除吗？"
                @confirm="() => remove(node, data)"
              >
                <el-button type="text" size="mini" slot="reference">
                  Delete
                </el-button>
              </el-popconfirm>
            </span>
          </span>
        </el-tree>
      </div>

      <div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="路径" :label-width="formLabelWidth">
              <el-input v-model="form.path"></el-input>
            </el-form-item>
            <el-form-item label="图标" :label-width="formLabelWidth">
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
              >
                <IconSelect ref="iconSelect" @selected="selected" />
                <el-input
                  slot="reference"
                  v-model="form.icon"
                  placeholder="点击选择图标"
                  readonly
                >
                  <svg-icon
                    v-if="form.icon"
                    slot="prefix"
                    :icon-class="form.icon"
                    class="el-input__icon"
                    style="height: 32px; width: 16px"
                  />
                  <i
                    v-else
                    slot="prefix"
                    class="el-icon-search el-input__icon"
                  />
                </el-input>
              </el-popover>
            </el-form-item>
            <el-form-item label="父节点" :label-width="formLabelWidth">
              <div class="block">
                <el-cascader
                  @change="menuChange"
                  :options="allMenuList"
                  v-model="form.pid"
                  :props="{ checkStrictly: true }"
                  clearable
                ></el-cascader>
              </div>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input-number
                v-model="form.sort"
                :controls="false"
                :min="0"
                :max="100"
              ></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitData">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </client-only>
  </div>
</template>

<script>
import menuObj from "@/api/admin/menu/index.js";

export default {
  layout: "admin/default",
  data() {
    return {
      isEdit: false,
      title: "",
      dialogFormVisible: false,
      form: {
        children: null,
        icon: null,
        id: null,
        name: null,
        path: null,
        pid: null,
        sort: 0,
        createTime: null,
        creator: null,
        updateTime: null,
        updater: null,
      },
      formLabelWidth: "120px",
      filterText: "",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 级联菜单选择数据
      allMenuList: [
        {
          value: "",
          label: "",
          children: [
            {
              value: "",
              label: "",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.getDataList();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  components: {},
  // async asyncData({ query, $api }) {
  //   return await $api.get("v1/menu/list", query).then((resp) => {
  //     console.log("get data... ", resp);
  //     return { data: resp.data };
  //   });
  // },
  methods: {
    addMenu(pid) {
      this.isEdit = false;
      this.title = "新增主页菜单";
      this.dialogFormVisible = true;
      if (pid) {
        // there is a parent node
        this.reset();
        this.form.pid = pid;
      } else {
        this.reset();
        this.form.pid = 0;
      }
    },
    reset() {
      this.form = {
        children: null,
        createTime: null,
        creator: null,
        icon: null,
        id: null,
        name: null,
        path: null,
        pid: null,
        sort: null,
        updateTime: null,
        updater: null,
      };
    },
    submitData() {
      this.dialogFormVisible = false;
      // 修改/新增
      if (this.isEdit) {
        if (this.form.pid instanceof Array) {
          this.form.pid = this.form.pid[0] || 0;
        }
        console.log("edit...", this.form);
        menuObj.updateById(this.form).then(() => {
          this.$message.success("修改成功");
          this.getDataList();
        });
      } else {
        console.log("save... ", this.form);
        menuObj.save(this.form).then(() => {
          this.$message.success("新增成功");
          this.getDataList();
        });
      }
    },
    menuChange(arr) {
      console.log("级联菜单选择..", arr);
      if (arr && arr.length > 0) this.form.pid = arr[arr.length - 1];
    },
    selected(name) {
      this.form.icon = name;
      console.log("get icon", this.form.icon);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 获取数据列表
    getDataList() {
      // this.$api.get("v1/menu/list").then((resp) => (this.data = resp.data));
      menuObj.getMenuList().then((resp) => {
        this.data = resp.data;
        this.allMenuList = resp.data.map((item) => {
          return {
            value: item.id,
            label: item.label,
            children: this.getMenuChildren(item, item.children),
          };
        });
      });
    },
    getMenuChildren(menu, dataList) {
      if (!menu.children || menu.children.length <= 0) {
        return [];
      }
      return dataList.map((item) => {
        return {
          value: item.id,
          label: item.label,
          children: this.getMenuChildren(item, item.children),
        };
      });
    },
    async edit(data) {
      await menuObj.info(data.id).then((resp) => {
        this.form = resp.data;
      });
      this.title = "修改主页菜单";
      this.isEdit = true;
      this.dialogFormVisible = true;
    },
    append(data) {
      this.title = "新增主页菜单";
      this.isEdit = false;
      this.addMenu(data.id);
    },
    remove(node, data) {
      console.log("delete id...", data.id);
      menuObj.removeByIds([data.id]).then((resp) => {
        this.$message.success(resp.returnMsg);
        this.getDataList();
      });
    },
  },
};
</script>
<style lang="css" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

/**font-size: 34px; */

/* .el-input-number__decrease, .el-input-number__increase {
  font-size: 38px;
} */
</style>