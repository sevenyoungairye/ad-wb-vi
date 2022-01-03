<template>
  <div>
    <BasePlayer :videoUrl="videoUrl" />
  </div>
</template>

<script>
export default {
  name: "latest",
  data() {
    // https://www.nunuyy.top/dianying/14323.html
    // https://2.08bk.com/?url=
    return {
      videoUrl: "https://jb3.willaz.vip/video.php?id=3387287ca58ad6a4ad7f45c781dadc6f.m3u8",
    };
  },
  setup() {},
  watch: {},
  mounted() {},
};
</script>

<style scoped>
</style>