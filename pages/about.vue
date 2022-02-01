<template>
  <div>
    <div>
      <el-collapse>
        <el-collapse-item title="lel の player">
          <ul>
            <li>ft 又名film tv, 基于hls流开发的全栈式影视项目。</li>
            <li>一个刷剧项目。</li>
            <li>由lel酱开发并运营。</li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div box-shadow="0 2px 12px 0 rgba(0, 0, 0, 0.1)">
      <br />
      <hr />
      <br />
    </div>
    <div>
      <el-timeline>
        <el-timeline-item timestamp="2022/1/22" placement="top">
          <el-card>
            <h4>检索、登录功能。</h4>
            <p>lel 提交于 2022/1/22</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/12/26" placement="top">
          <el-card>
            <h4>影视资源收集, 播放功能。</h4>
            <p>lel 提交于 2021/12/26</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2021/12/19" placement="top">
          <el-card>
            <h4>lel film tv 项目开始搭建, 初始页面。</h4>
            <p>lel 提交于 2021/12/19</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  head() {
    return {
      title: "关于",
    };
  },
  data() {
    return {};
  },
  methods: {
    toIndex() {
      window.location.href = "/";
    },
  },
};
</script>
<style scoped>
</style>