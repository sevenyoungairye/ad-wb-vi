<template>
  <div>
    <el-input class="lel-search-input" v-model="q" placeholder="检索影视...">
      <template slot="append">
        <el-button @click="search" icon="el-icon-search"></el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {},
  watch: {},
  data() {
    return {
      q: "",
    };
  },
  methods: {
    search() {
      this.$router.push({
        path: "/search",
        query: {
          keyword: this.q,
        },
      });
    },
  },
};
</script>

<style>
.lel-search-input {
  width: 300px;
  position: absolute;
  right: 5%;
  margin-top: 0.8%;
}
</style>