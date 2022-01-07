<template>
  <div>
    <BasePlayer :playObj="playObj" />
  </div>
</template>

<script>
export default {
  name: "latest",
  head() {
    return {
      title: "",
    };
  },
  data() {
    // https://www.nunuyy.top/dianying/14323.html
    // https://2.08bk.com/?url=
    return {
      playObj: {
        videoId: null,
        playUrl: "https://aa.willaz.vip/cache/1638889479577.m3u8",
        mode: "auto",
        title: "播放《小森林-夏秋篇》",
      },
    };
  },
  setup() {},
  watch: {},
  mounted() {},
};
</script>

<style scoped>
</style>