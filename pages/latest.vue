<template>
  <div>
    <BasePlayer :videoUrl="videoUrl" />
  </div>
</template>

<script>
export default {
  name: "latest",
  data() {
    // https://2.08bk.com/?url=
    return {
      // https://aa.willaz.vip/cache/1638960286353.m3u8
      // videoUrl: "http://42.192.51.141/expose/topTwo/6.m3u8",
      // videoUrl: "https://aa.willaz.vip/cache/1638960286353.m3u8",
      // young sister https://video2.51daao.com/btt1/2021/11/20211122/fCP5ChLz/2000kb/hls/index.m3u8
      // videoUrl: "http://42.192.51.141/expose/topTwo/12.m3u8",
      videoUrl: "https://aa.willaz.vip/cache/1639509604617.m3u8",
    };
  },
  setup() {},
  watch: {},
  mounted() {},
};
</script>

<style scoped>
</style>