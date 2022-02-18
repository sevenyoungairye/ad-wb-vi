<template>
  <div>
    <template v-for="(item, index) in menuList">
      <el-submenu
        :key="index"
        :index="item.path"
        v-if="item.children && item.children.length > 0"
        :class="getLevelCss(item.pid)"
      >
        <template slot="title">
          {{ item.label }}
        </template>

        <top-menu :menuList="item.children"></top-menu>
      </el-submenu>
      <el-menu-item
        :class="getLevelCss(item.pid)"
        v-else
        :key="item.id"
        :index="item.path"
      >
        {{ item.label }}
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import TopMenu from "@/components/menu/TopMenu.vue";
export default {
  name: "TopMenu",
  components: { TopMenu },
  props: {
    menuList: [],
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    getLevelCss(val) {
      if (val === 0) {
        return "flex-style";
      }
      return "";
    },
    handleSelect(path) {
      if (path) this.$router.push({ path });
    },
  },
};
</script>

<style>
/* sub菜单样式 */
.flex-style {
  float: left;
}

.el-submenu__icon-arrow {
  right: 5%;
}
</style>