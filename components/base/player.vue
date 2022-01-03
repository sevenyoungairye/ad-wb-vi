<template>
  <div class="palyer-pg">
    <div ref="player"></div>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: {
    videoUrl: {
      vlaue: "",
      type: String,
    },
  },
  head() {
    return {
      title: "lelのplayer",
      // link: [
      //   {
      //     rel: "stylesheet",
      //     href:
      //       "https://cdn.bootcdn.net/ajax/libs/dplayer/1.5.0/DPlayer.min.css",
      //   },
      // ],
      // script: [
      //   {
      //     src: "https://cdn.bootcdn.net/ajax/libs/dplayer/1.5.0/DPlayer.min.js",
      //   },
      // ],
    };
  },
  data() {
    return {
      options: {
        dp: null, // Dplayer对象
        video: {
          url: this.videoUrl,
          type: "hls",
        },
        autoplay: true,
        screenshot: true,
      },
    };
  },
  watch: {
    videoUrl(val) {
      this.$nextTick(() => {
        this.options.video.url = val;
        new this.dp(this.options);
      });
    },
  },
  computed: {},
  mounted() {
    if (process.browser) {
      // 容器对象
      this.options.container = this.$refs.player;
      this.dp = require("dplayer");
      try {
        new this.dp(this.options);
      } catch (error) {
        console.log("error... ", error);
      }
    }
  },
  created() {},
  methods: {
    init() {},
  },
};
</script>

<style scoped>
.palyer-pg {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
</style>